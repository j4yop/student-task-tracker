const connectDB = require('../config/db');
const app = require('../server');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected && process.env.MONGODB_URI) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.warn('MongoDB connection in serverless function failed:', err.message);
    }
  }
  return app(req, res);
};
