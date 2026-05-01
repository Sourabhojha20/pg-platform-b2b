const express = require('express');
const router = express.Router();
const { 
  getProperties, 
  getProperty, 
  createProperty, 
  updateProperty, 
  deleteProperty 
} = require('../controllers/properties');
const { protect, authorize } = require('../middleware/auth');

router.use(protect); // All property routes are protected

router.route('/')
  .get(getProperties)
  .post(authorize('b2b', 'admin'), createProperty);

router.route('/:id')
  .get(getProperty)
  .put(updateProperty)
  .delete(deleteProperty);

module.exports = router;
