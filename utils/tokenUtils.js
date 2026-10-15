const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'student_tracker_secure_access_token_secret_key_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET || 'student_tracker_secure_refresh_token_secret_key_2026',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};

const sendTokenResponse = async (user, statusCode, res) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save refresh token to user document
  user.refreshTokens = user.refreshTokens || [];
  user.refreshTokens.push(refreshToken);
  
  // Keep only the last 5 refresh tokens to prevent infinite array growth
  if (user.refreshTokens.length > 5) {
    user.refreshTokens.shift();
  }
  await user.save();

  // Create cookie options
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // Match 7d duration
    ),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  res
    .status(statusCode)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
      },
    });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendTokenResponse,
};
