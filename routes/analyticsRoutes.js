const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getWeeklyReport,
  getMonthlyReport,
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

// Protect all endpoints
router.use(protect);

router.get('/dashboard-stats', getDashboardStats);
router.get('/reports/weekly', getWeeklyReport);
router.get('/reports/monthly', getMonthlyReport);

module.exports = router;
