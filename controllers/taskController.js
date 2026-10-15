const Task = require('../models/Task');
const Category = require('../models/Category');
const Reminder = require('../models/Reminder');
const ErrorResponse = require('../utils/errorResponse');

// Helper to update scheduled reminders for a task
const syncReminder = async (task) => {
  try {
    // Remove any existing pending reminders for this task
    await Reminder.deleteMany({ task: task._id, status: 'pending' });

    if (task.remindMe && !task.isCompleted) {
      // Schedule reminder 1 hour before due date
      const triggerTime = new Date(task.dueDate.getTime() - 60 * 60 * 1000);
      
      // If trigger time is in the past, schedule it immediately (e.g. 10 seconds from now)
      const scheduledAt = triggerTime > new Date() ? triggerTime : new Date(Date.now() + 10 * 1000);

      await Reminder.create({
        task: task._id,
        user: task.user,
        scheduledAt,
        status: 'pending',
      });

      task.reminderStatus = 'scheduled';
      await Task.updateOne({ _id: task._id }, { reminderStatus: 'scheduled' });
    } else {
      task.reminderStatus = 'none';
      await Task.updateOne({ _id: task._id }, { reminderStatus: 'none' });
    }
  } catch (err) {
    console.error(`Failed to sync reminder: ${err.message}`);
  }
};

// @desc    Get all user tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res, next) => {
  try {
    const { search, category, priority, status, sortBy, page = 1, limit = 10 } = req.query;
    
    // Build query object
    const query = { user: req.user._id };

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Priority filter
    if (priority) {
      query.priority = priority;
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Sort configurations
    let sortOptions = { dueDate: 1 }; // Default: Due Date Ascending
    if (sortBy) {
      const parts = sortBy.split(':');
      sortOptions = {};
      sortOptions[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const tasks = await Task.find(query)
      .populate('category')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasks.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id }).populate('category');

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, category, course, dueDate, priority, remindMe } = req.body;

    if (!title || !category || !dueDate) {
      return next(new ErrorResponse('Please provide a title, category, and due date', 400));
    }

    // Validate category existence & ownership
    const cat = await Category.findOne({
      _id: category,
      $or: [{ user: req.user._id }, { user: null }],
    });

    if (!cat) {
      return next(new ErrorResponse('Invalid category assigned', 400));
    }

    const task = await Task.create({
      title,
      description,
      category,
      course: course || '',
      dueDate: new Date(dueDate),
      priority,
      remindMe: remindMe === true || remindMe === 'true',
      user: req.user._id,
    });

    // Populate category info before response
    await task.populate('category');

    // Sync reminders
    await syncReminder(task);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, category, course, dueDate, priority, remindMe, status } = req.body;
    let task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    if (category) {
      const cat = await Category.findOne({
        _id: category,
        $or: [{ user: req.user._id }, { user: null }],
      });
      if (!cat) {
        return next(new ErrorResponse('Invalid category assigned', 400));
      }
      task.category = category;
    }

    if (title) task.title = title;
    if (course !== undefined) task.course = course;
    if (description !== undefined) task.description = description;
    if (dueDate) task.dueDate = new Date(dueDate);
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (remindMe !== undefined) task.remindMe = remindMe === true || remindMe === 'true';

    await task.save();
    await task.populate('category');

    // Sync reminders
    await syncReminder(task);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    // Delete associated reminders
    await Reminder.deleteMany({ task: task._id });

    // Remove task
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task and reminders deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle Task Complete state
// @route   PATCH /api/tasks/:id/complete
// @access  Private
exports.toggleComplete = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return next(new ErrorResponse(`Task not found with id of ${req.params.id}`, 404));
    }

    task.status = task.status === 'completed' ? 'pending' : 'completed';
    await task.save();
    await task.populate('category');

    // Sync reminders
    await syncReminder(task);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Bulk Complete tasks
// @route   POST /api/tasks/bulk/complete
// @access  Private
exports.bulkComplete = async (req, res, next) => {
  const { ids, completed } = req.body;

  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return next(new ErrorResponse('Please provide an array of task IDs', 400));
    }

    const status = completed ? 'completed' : 'pending';
    const isCompleted = completed;

    // Update statuses
    await Task.updateMany(
      { _id: { $in: ids }, user: req.user._id },
      { status, isCompleted }
    );

    // Sync reminders for all updated tasks
    const tasks = await Task.find({ _id: { $in: ids }, user: req.user._id });
    for (const t of tasks) {
      await syncReminder(t);
    }

    res.status(200).json({
      success: true,
      message: `Successfully updated ${ids.length} tasks`,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Bulk Delete tasks
// @route   POST /api/tasks/bulk/delete
// @access  Private
exports.bulkDelete = async (req, res, next) => {
  const { ids } = req.body;

  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return next(new ErrorResponse('Please provide an array of task IDs', 400));
    }

    // Delete associated reminders first
    await Reminder.deleteMany({ task: { $in: ids } });

    // Delete tasks
    const result = await Task.deleteMany({ _id: { $in: ids }, user: req.user._id });

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} tasks`,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Bulk Update Category for tasks
// @route   POST /api/tasks/bulk/category
// @access  Private
exports.bulkCategory = async (req, res, next) => {
  const { ids, categoryId } = req.body;

  try {
    if (!Array.isArray(ids) || ids.length === 0 || !categoryId) {
      return next(new ErrorResponse('Please provide task IDs and categoryId', 400));
    }

    // Validate category existence & ownership
    const cat = await Category.findOne({
      _id: categoryId,
      $or: [{ user: req.user._id }, { user: null }],
    });

    if (!cat) {
      return next(new ErrorResponse('Invalid category assigned', 400));
    }

    // Update tasks
    await Task.updateMany(
      { _id: { $in: ids }, user: req.user._id },
      { category: categoryId }
    );

    res.status(200).json({
      success: true,
      message: `Successfully updated categories for ${ids.length} tasks`,
    });
  } catch (err) {
    next(err);
  }
};
