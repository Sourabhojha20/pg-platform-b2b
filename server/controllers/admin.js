const Property = require('../models/Property');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const logActivity = require('../utils/logger');

// @desc    Update property status (Approve/Reject)
// @route   PUT /api/v1/admin/properties/:id/status
// @access  Private/Admin
exports.updatePropertyStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const before = property.toObject();

    const updateFields = { status };
    if (status === 'approved') {
      updateFields.isReapproval = false;
      updateFields.changedFields = [];
      updateFields.previousValues = {};
    }

    property = await Property.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: property });
    
    // Log status change
    logActivity({
      action: status === 'approved' ? 'APPROVE_PROPERTY' : 'REJECT_PROPERTY',
      performedBy: req.user.id,
      targetModel: 'Property',
      targetId: property._id,
      before,
      after: property.toObject(),
      details: `Property ${status}: ${property.pgName}`
    }, req);

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all activity logs
// @route   GET /api/v1/admin/logs
// @access  Private/Admin
exports.getActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find()
      .populate('performedBy', 'name email role')
      .sort('-timestamp')
      .limit(100); // Limit to last 100 logs for performance

    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update user status (Active/Inactive)
// @route   PUT /api/v1/admin/users/:id/status
// @access  Private/Admin
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { active } = req.body;
    
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const before = user.toObject();

    user = await User.findByIdAndUpdate(req.params.id, { active }, {
      new: true
    });

    res.status(200).json({ success: true, data: user });
    
    // Log status change
    logActivity({
      action: 'UPDATE_USER_STATUS',
      performedBy: req.user.id,
      targetModel: 'User',
      targetId: user._id,
      before,
      after: user.toObject(),
      details: `User ${active ? 'activated' : 'deactivated'}: ${user.email}`
    }, req);

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
