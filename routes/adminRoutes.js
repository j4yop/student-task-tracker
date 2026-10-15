const express = require('express');
const router = express.Router();
const {
  getUsers,
  updateUserRole,
  getAuditLogs,
  getSystemStats,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Lock down all routes to Admins only
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.patch('/users/:id/role', updateUserRole);
router.get('/audit-logs', getAuditLogs);
router.get('/system-stats', getSystemStats);

module.exports = router;
