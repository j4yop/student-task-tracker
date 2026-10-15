const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['pending', 'triggered', 'dismissed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reminder', ReminderSchema);
