const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['email', 'browser'],
    default: 'browser',
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread',
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Notification', NotificationSchema);
