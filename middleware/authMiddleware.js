const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// Protect routes - verify access token
const protect = async (req, res, next) => {
  let token;

  // Check headers for Authorization Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // Alternately check cookies
  else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'student_tracker_secure_access_token_secret_key_2026'
    );

    // Find user by id and assign to req.user
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return next(new ErrorResponse('User no longer exists', 401));
    }

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new ErrorResponse('Token expired', 401));
    }
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse('User context not found', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role '${req.user.role}' is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
