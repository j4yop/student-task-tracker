const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.NODE_ENV === 'test' 
    ? process.env.MONGODB_URI_TEST || 'mongodb://127.0.0.1:27017/student_tracker_test'
    : process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/student_tracker';

  try {
    const conn = await mongoose.connect(uri, {
      autoIndex: true, // Build indexes on startup
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    } else {
      throw error;
    }
  }
};

module.exports = connectDB;
