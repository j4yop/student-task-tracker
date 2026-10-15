const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/securityMiddleware');

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);
router.put('/profile/password', protect, changePassword);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);

module.exports = router;
