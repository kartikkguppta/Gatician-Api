const express = require('express');
const router = express.Router();
const {
  createRetailSellerOrder,
  getAllRetailSellerOrders,
  getRetailSellerOrderById,
  updateRetailSellerOrder,
  deleteRetailSellerOrder
} = require('../controllers/retailSellerController');

// Route for creating a new retail seller order
router.post('/', createRetailSellerOrder);

// Route for getting all retail seller orders
router.get('/', getAllRetailSellerOrders);

// Route for getting a retail seller order by ID
router.get('/:id', getRetailSellerOrderById);

// Route for updating a retail seller order by ID
router.put('/:id', updateRetailSellerOrder);

// Route for deleting a retail seller order by ID
router.delete('/:id', deleteRetailSellerOrder);

module.exports = router;
