const ActivityLog = require('../models/ActivityLog');

/**
 * Log an activity to the database
 * @param {Object} params - Logging parameters
 * @param {string} params.action - Action performed (e.g. 'UPDATE_PROPERTY')
 * @param {string} params.performedBy - User ID who performed the action
 * @param {string} params.targetModel - Model being changed ('Property', 'User', etc)
 * @param {string} params.targetId - ID of the target document
 * @param {Object} [params.before] - State before changes
 * @param {Object} [params.after] - State after changes
 * @param {string} [params.details] - Additional human-readable details
 * @param {Object} [req] - Express request object for IP/User-Agent
 */
const logActivity = async ({ action, performedBy, targetModel, targetId, before, after, details }, req = null) => {
  try {
    const logData = {
      action,
      performedBy,
      targetModel,
      targetId,
      details,
      changes: { before, after }
    };

    if (req) {
      logData.ipAddress = req.ip;
      logData.userAgent = req.headers['user-agent'];
    }

    await ActivityLog.create(logData);
  } catch (err) {
    console.error('Error recording activity log:', err);
  }
};

module.exports = logActivity;
