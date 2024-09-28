const express = require('express');
const router = express.Router();
const {
  createLogisticsSeller,
  getAllLogisticsSellers,
  getLogisticsSellerById,
  updateLogisticsSeller,
  deleteLogisticsSeller
} = require('../controllers/logisticsSellerController');

// Route for creating a new logistics seller
router.post('/', createLogisticsSeller);

// Route for getting all logistics sellers
router.get('/', getAllLogisticsSellers);

// Route for getting a logistics seller by ID
router.get('/:id', getLogisticsSellerById);

// Route for updating a logistics seller by ID
router.put('/:id', updateLogisticsSeller);

// Route for deleting a logistics seller by ID
router.delete('/:id', deleteLogisticsSeller);

module.exports = router;
