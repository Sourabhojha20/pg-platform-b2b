const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logActivity = require('../utils/logger');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role
    });

    sendTokenResponse(user, 201, res);
    
    // Log registration
    logActivity({
      action: 'USER_REGISTER',
      performedBy: user._id,
      targetModel: 'User',
      targetId: user._id,
      details: `New user registered: ${email}`
    }, req);

  } catch (err) {
    let message = err.message;
    
    // Mongoose duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists. Please use a different one.`;
    }

    res.status(400).json({ success: false, message });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body; // email field here is used as a general 'identifier'

    // Validate identifier & password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email/phone and password' });
    }

    // Check if identifier is email or phone
    const isEmail = email.includes('@');
    const query = isEmail ? { email } : { phone: email };

    // Check for user
    const user = await User.findOne(query).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
    
    // Log login
    logActivity({
      action: 'USER_LOGIN',
      performedBy: user._id,
      targetModel: 'User',
      targetId: user._id,
      details: `User logged in: ${email}`
    }, req);

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};
