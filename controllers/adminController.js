const User = require('../models/User');
const Task = require('../models/Task');
const Category = require('../models/Category');
const AuditLog = require('../models/AuditLog');
const ErrorResponse = require('../utils/errorResponse');
const { auditLog } = require('../middleware/auditLogger');

// @desc    Get all users list
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password -refreshTokens').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user role
// @route   PATCH /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res, next) => {
  const { role } = req.body;

  try {
    if (!role || !['student', 'admin'].includes(role)) {
      return next(new ErrorResponse('Please provide a valid role (student or admin)', 400));
    }

    // Prevent self-role demotion
    if (req.user._id.toString() === req.params.id) {
      return next(new ErrorResponse('You cannot demote yourself from admin role', 400));
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    await auditLog(
      req.user._id,
      'ADMIN_UPDATE_USER_ROLE',
      { targetUserId: user._id, targetEmail: user.email, oldRole, newRole: role },
      req
    );

    res.status(200).json({
      success: true,
      message: `User role updated to ${role}`,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get system-wide audit logs
// @route   GET /api/admin/audit-logs
// @access  Private/Admin
exports.getAuditLogs = async (req, res, next) => {
  try {
    const { action, userId, page = 1, limit = 50 } = req.query;
    const query = {};

    if (action) {
      query.action = action;
    }

    if (userId) {
      query.user = userId;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const logs = await AuditLog.find(query)
      .populate('user', 'username email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await AuditLog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: logs.length,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get master system metrics
// @route   GET /api/admin/system-stats
// @access  Private/Admin
exports.getSystemStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments({});
    const taskCount = await Task.countDocuments({});
    const categoryCount = await Category.countDocuments({});
    const logCount = await AuditLog.countDocuments({});

    const roleStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    const taskStatusStats = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          users: userCount,
          tasks: taskCount,
          categories: categoryCount,
          auditLogs: logCount,
        },
        distribution: {
          roles: roleStats,
          tasks: taskStatusStats,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
