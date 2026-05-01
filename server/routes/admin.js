const express = require('express');
const router = express.Router();
const { 
  updatePropertyStatus, 
  getActivityLogs, 
  getUsers,
  updateUserStatus
} = require('../controllers/admin');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin')); // Only admins can access these routes

router.put('/properties/:id/status', updatePropertyStatus);
router.get('/logs', getActivityLogs);
router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);

module.exports = router;
