const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Rate limiting configurations
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit login/register attempts
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Recursive XSS input sanitization function
const sanitizeXSS = (data) => {
  if (typeof data === 'string') {
    return data
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeXSS(item));
  }
  if (data !== null && typeof data === 'object') {
    const clean = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        clean[key] = sanitizeXSS(data[key]);
      }
    }
    return clean;
  }
  return data;
};

// Middleware wrapper for XSS sanitization
const xssSanitizer = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeXSS(req.body);
  }
  if (req.query) {
    req.query = sanitizeXSS(req.query);
  }
  if (req.params) {
    req.params = sanitizeXSS(req.params);
  }
  next();
};

const setupSecurity = (app) => {
  // Set security HTTP headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://picsum.photos"],
      },
    },
  }));

  // Prevent CORS issues
  app.use(cors({
    origin: true, // Allow all origins for testing or customize in production
    credentials: true,
  }));

  // Sanitize data against NoSQL query injection
  app.use(mongoSanitize());

  // Custom XSS Sanitizer middleware
  app.use(xssSanitizer);
};

module.exports = {
  setupSecurity,
  apiLimiter,
  authLimiter,
  sanitizeXSS
};
