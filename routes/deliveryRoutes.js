const express = require('express');
const router = express.Router();
const {
  requestDelivery,
  confirmDeliveryToRetailSeller
} = require('../controllers/deliveryRequestController');

// Route for requesting delivery
router.get('/:orderId', requestDelivery);

// Route for confirming delivery and responding to retail seller
router.post('/confirm/:orderId', confirmDeliveryToRetailSeller);

module.exports = router;
