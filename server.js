const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const { setupSecurity, apiLimiter } = require('./middleware/securityMiddleware');
const { auditLoggerMiddleware } = require('./middleware/auditLogger');
const { startReminderScheduler, stopReminderScheduler } = require('./services/reminderScheduler');
const logger = require('./utils/logger');

// Initialize express app
const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable HTTP request logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Setup security constraints (Helmet, CORS, Mongo Sanitizers, XSS cleaner)
setupSecurity(app);

// Apply Global API rate limiting
app.use('/api', apiLimiter);

// Register Audit Logger middleware for modifying actions
app.use(auditLoggerMiddleware);

// Define API Route Path Mappings
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Serve Frontend client and public directories statically
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

// Fallback all routes to SPA client index.html
app.get('*', (req, res) => {
  const publicIndex = path.join(__dirname, 'public', 'index.html');
  const clientIndex = path.join(__dirname, 'client', 'index.html');
  const fs = require('fs');
  if (fs.existsSync(publicIndex)) {
    res.sendFile(publicIndex);
  } else {
    res.sendFile(clientIndex);
  }
});

// Centralized error handler middleware
app.use(errorHandler);

// Establish database connection and start listening
const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
  try {
    await connectDB();
    
    server = app.listen(PORT, () => {
      logger.info(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
      
      // Start background alerts scheduler
      startReminderScheduler();
    });
  } catch (err) {
    logger.error(`App startup execution failed: ${err.message}`);
    process.exit(1);
  }
};

// Start the application if executed directly
if (require.main === module) {
  startServer();
}

// Handle Graceful Shutdown signals
const gracefulShutdown = async (signal) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  
  // Stop reminder loop
  stopReminderScheduler();

  if (server) {
    server.close(() => {
      logger.info('Express server closed.');
      const mongoose = require('mongoose');
      mongoose.connection.close().then(() => {
        logger.info('MongoDB connection closed.');
        process.exit(0);
      });
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = app; // Exported for supertest integration
