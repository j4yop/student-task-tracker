const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide a category'],
  },
  course: {
    type: String,
    trim: true,
    default: '',
    maxlength: [50, 'Course cannot exceed 50 characters'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please assign a user to this task'],
    index: true,
  },
  remindMe: {
    type: Boolean,
    default: false,
  },
  reminderStatus: {
    type: String,
    enum: ['none', 'scheduled', 'sent'],
    default: 'none',
  },
}, {
  timestamps: true,
});

// Composite and single indexes for optimization
TaskSchema.index({ user: 1, status: 1 });
TaskSchema.index({ user: 1, dueDate: 1 });

// Ensure status & isCompleted stay in sync on save
TaskSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    this.isCompleted = this.status === 'completed';
  } else if (this.isModified('isCompleted')) {
    this.status = this.isCompleted ? 'completed' : 'pending';
  }
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
