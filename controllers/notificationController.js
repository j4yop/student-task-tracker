const Notification = require('../models/Notification');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { user: req.user._id };

    if (status) {
      query.status = status;
    }

    const notifications = await Notification.find(query).sort({ sentAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark single notification read
// @route   PUT /api/notifications/:id/read
// @access  Private
exports.markRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.id, user: req.user._id });

    if (!notification) {
      return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
    }

    notification.status = 'read';
    await notification.save();

    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark all user notifications read
// @route   PUT /api/notifications/read-all
// @access  Private
exports.markAllRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, status: 'unread' },
      { status: 'read' }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete single notification
// @route   DELETE /api/notifications/:id
// @access  Private
exports.deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({ _id: req.params.id, user: req.user._id });

    if (!notification) {
      return next(new ErrorResponse(`Notification not found with id of ${req.params.id}`, 404));
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Clear all notification logs
// @route   DELETE /api/notifications/clear-all
// @access  Private
exports.clearAllNotifications = async (req, res, next) => {
  try {
    await Notification.deleteMany({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: 'All notifications cleared successfully',
    });
  } catch (err) {
    next(err);
  }
};
