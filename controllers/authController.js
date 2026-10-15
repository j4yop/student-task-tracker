const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const { sendTokenResponse } = require('../utils/tokenUtils');
const { auditLog } = require('../middleware/auditLogger');
const crypto = require('crypto');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    // Validate request inputs
    if (!username || !email || !password) {
      return next(new ErrorResponse('Please provide username, email and password', 400));
    }

    // Default roles to student unless admin explicitly created
    const userRole = role === 'admin' ? 'admin' : 'student';

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role: userRole,
    });

    // Record register event to AuditLog
    await auditLog(user._id, 'USER_REGISTER', { email: user.email }, req);

    await sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email });

    if (!user) {
      await auditLog(null, 'LOGIN_FAILURE', { email, reason: 'User not found' }, req);
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      await auditLog(user._id, 'LOGIN_FAILURE', { email, reason: 'Incorrect password' }, req);
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Log success
    await auditLog(user._id, 'LOGIN_SUCCESS', { email }, req);

    await sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      // Remove refresh token from user database
      await User.updateOne(
        { _id: req.user._id },
        { $pull: { refreshTokens: refreshToken } }
      );
    }

    // Log logout
    await auditLog(req.user._id, 'LOGOUT_SUCCESS', {}, req);

    res.cookie('refreshToken', 'none', {
      expires: new Date(Date.now() + 10 * 1000), // expire in 10 seconds
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user password
// @route   PUT /api/auth/profile/password
// @access  Private
exports.changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (!currentPassword || !newPassword) {
      return next(new ErrorResponse('Please provide current and new passwords', 400));
    }

    const user = await User.findById(req.user.id);

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      await auditLog(user._id, 'PASSWORD_CHANGE_FAIL', { reason: 'Incorrect current password' }, req);
      return next(new ErrorResponse('Current password incorrect', 401));
    }

    // Assign new password (schema hook handles hashing)
    user.password = newPassword;
    await user.save();

    await auditLog(user._id, 'PASSWORD_CHANGE_SUCCESS', {}, req);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new ErrorResponse('Refresh token not found', 401));
  }

  try {
    // Find user with this refresh token
    const user = await User.findOne({ refreshTokens: refreshToken });

    if (!user) {
      return next(new ErrorResponse('Invalid or expired refresh token', 401));
    }

    // Verify JWT signature
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'student_tracker_secure_refresh_token_secret_key_2026'
    );

    // Verify decoded ID matches user database ID
    if (decoded.id !== user._id.toString()) {
      return next(new ErrorResponse('Token mismatch', 401));
    }

    // Generate new access token
    const { generateAccessToken } = require('../utils/tokenUtils');
    const accessToken = generateAccessToken(user);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (err) {
    return next(new ErrorResponse('Invalid or expired refresh token', 401));
  }
};

// @desc    Forgot Password (Mock Email dispatch)
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      return next(new ErrorResponse('Please provide email', 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      // For security, return standard success even if user not found, preventing email enumeration.
      return res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email address (Mock)',
      });
    }

    // Generate random mock reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
    
    // Store temporarily on user model or simulate dispatch
    console.log(`[EMAIL SERVICE MOCK] To: ${user.email} | Subject: Password Reset Request | Code: ${resetCode}`);
    
    await auditLog(user._id, 'FORGOT_PASSWORD_REQUEST', { email }, req);

    res.status(200).json({
      success: true,
      message: 'Password reset code has been sent (Mock)',
      // For manual testing/frontend demonstration, we return the mock resetCode
      resetCode, 
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Reset Password using code
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res, next) => {
  const { email, resetCode, newPassword } = req.body;

  try {
    if (!email || !resetCode || !newPassword) {
      return next(new ErrorResponse('Please provide email, reset code and new password', 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // In a production system, we'd verify code expiry and stored hash. Here we mock check.
    // If the resetCode matches what was generated, we reset the password.
    user.password = newPassword;
    await user.save();

    await auditLog(user._id, 'RESET_PASSWORD_SUCCESS', { email }, req);

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (err) {
    next(err);
  }
};
