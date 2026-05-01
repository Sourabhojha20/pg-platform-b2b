const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    // e.g., 'CREATE_PROPERTY', 'UPDATE_PROPERTY', 'APPROVE_PROPERTY', 'REJECT_PROPERTY', 'USER_LOGIN'
  },
  performedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  targetModel: {
    type: String,
    required: true,
    enum: ['Property', 'User', 'System']
  },
  targetId: {
    type: mongoose.Schema.ObjectId
  },
  changes: {
    before: mongoose.Schema.Types.Mixed,
    after: mongoose.Schema.Types.Mixed
  },
  details: {
    type: String
  },
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
