const express = require('express');
const router = express.Router();
const {
  getNotifications,
  markRead,
  markAllRead,
  deleteNotification,
  clearAllNotifications,
} = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

// Authenticated access only
router.use(protect);

router.route('/')
  .get(getNotifications);

router.put('/read-all', markAllRead);
router.delete('/clear-all', clearAllNotifications);

router.route('/:id')
  .delete(deleteNotification);

router.put('/:id/read', markRead);

module.exports = router;
