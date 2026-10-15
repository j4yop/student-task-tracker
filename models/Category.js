const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name'],
    trim: true,
  },
  color: {
    type: String,
    required: [true, 'Please provide a category color hex code'],
    default: '#06b6d4',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Null means it's a global category
  },
}, {
  timestamps: true,
});

// Ensure a user cannot duplicate category names
CategorySchema.index({ name: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Category', CategorySchema);
