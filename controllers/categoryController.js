const Category = require('../models/Category');
const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all categories (system defaults + user-specific)
// @route   GET /api/categories
// @access  Private
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({
      $or: [{ user: req.user._id }, { user: null }],
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create category
// @route   POST /api/categories
// @access  Private
exports.createCategory = async (req, res, next) => {
  const { name, color } = req.body;

  try {
    if (!name) {
      return next(new ErrorResponse('Please provide a category name', 400));
    }

    // Check if category already exists for this user (or is system default)
    const existing = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      $or: [{ user: req.user._id }, { user: null }],
    });

    if (existing) {
      return next(new ErrorResponse('Category with this name already exists', 400));
    }

    const category = await Category.create({
      name,
      color: color || '#06b6d4',
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
exports.updateCategory = async (req, res, next) => {
  const { name, color } = req.body;

  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns this category
    if (!category.user || category.user.toString() !== req.user._id.toString()) {
      return next(new ErrorResponse('Not authorized to modify system categories', 403));
    }

    // Check name duplication if name is being changed
    if (name && name.toLowerCase() !== category.name.toLowerCase()) {
      const duplicate = await Category.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        $or: [{ user: req.user._id }, { user: null }],
      });
      if (duplicate) {
        return next(new ErrorResponse('Category with this name already exists', 400));
      }
    }

    category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, color },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404));
    }

    // Make sure user owns this category
    if (!category.user || category.user.toString() !== req.user._id.toString()) {
      return next(new ErrorResponse('Not authorized to delete system categories', 403));
    }

    // Cascade delete: delete all user tasks belonging to this category
    await Task.deleteMany({ category: category._id, user: req.user._id });

    // Remove the category
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Category and associated tasks deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
