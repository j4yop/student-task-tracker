const Reminder = require('../models/Reminder');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const User = require('../models/User');
const logger = require('../utils/logger');

let schedulerInterval = null;

const checkReminders = async () => {
  try {
    const now = new Date();

    // Find all pending reminders that are scheduled to trigger now or in the past
    const reminders = await Reminder.find({
      status: 'pending',
      scheduledAt: { $lte: now },
    }).populate('task');

    if (reminders.length === 0) {
      return;
    }

    logger.info(`Found ${reminders.length} pending reminders to process.`);

    for (const reminder of reminders) {
      const task = reminder.task;

      if (!task) {
        // If task was deleted, dismiss reminder
        reminder.status = 'dismissed';
        await reminder.save();
        continue;
      }

      // If task is already completed, dismiss
      if (task.status === 'completed') {
        reminder.status = 'triggered';
        await reminder.save();
        
        task.reminderStatus = 'sent';
        await task.save();
        continue;
      }

      // Fetch user profile for notification channels
      const user = await User.findById(reminder.user);
      if (!user) {
        reminder.status = 'dismissed';
        await reminder.save();
        continue;
      }

      const alertMessage = `Task Reminder: "${task.title}" is due on ${task.dueDate.toLocaleString()}`;

      // 1. Browser Notification
      if (user.preferences.notifications.browser) {
        await Notification.create({
          user: user._id,
          message: alertMessage,
          type: 'browser',
          status: 'unread',
          sentAt: new Date(),
        });
        logger.info(`Browser notification created for User ${user.email}: ${task.title}`);
      }

      // 2. Email Notification (Mock)
      if (user.preferences.notifications.email) {
        logger.info(`[EMAIL SERVICE MOCK] Dispatching notification to ${user.email} -> "${alertMessage}"`);
        
        await Notification.create({
          user: user._id,
          message: `Email Sent: ${alertMessage}`,
          type: 'email',
          status: 'read',
          sentAt: new Date(),
        });
      }

      // Mark reminder as triggered
      reminder.status = 'triggered';
      await reminder.save();

      // Update Task reminderStatus
      task.reminderStatus = 'sent';
      await task.save();
    }
  } catch (err) {
    logger.error('Error occurred in Reminder Scheduler:', err);
  }
};

const startReminderScheduler = () => {
  if (schedulerInterval) {
    logger.warn('Reminder scheduler is already running.');
    return;
  }

  logger.info('Initializing Reminder Scheduler (Interval: 30 seconds)...');
  
  // Run check immediately on start
  checkReminders();

  // Schedule to run every 30 seconds
  schedulerInterval = setInterval(checkReminders, 30 * 1000);
};

const stopReminderScheduler = () => {
  if (schedulerInterval) {
    clearInterval(schedulerInterval);
    schedulerInterval = null;
    logger.info('Reminder Scheduler stopped.');
  }
};

module.exports = {
  startReminderScheduler,
  stopReminderScheduler,
  checkReminders, // Exported for testing/verification purposes
};
