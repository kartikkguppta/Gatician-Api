const RetailSeller = require('../models/retailSellerModel');

// Create a new retail seller order
exports.createRetailSellerOrder = async (req, res) => {
  try {
    const retailSeller = await RetailSeller.create(req.body);
    res.status(201).json(retailSeller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all retail seller orders
exports.getAllRetailSellerOrders = async (req, res) => {
  try {
    const retailSellers = await RetailSeller.find();
    res.status(200).json(retailSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a retail seller order by ID
exports.getRetailSellerOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const retailSeller = await RetailSeller.findById(id);
    if (!retailSeller) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(retailSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a retail seller order by ID
exports.updateRetailSellerOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const retailSeller = await RetailSeller.findByIdAndUpdate(id, req.body, { new: true });
    if (!retailSeller) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(retailSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a retail seller order by ID
exports.deleteRetailSellerOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const retailSeller = await RetailSeller.findByIdAndDelete(id);
    if (!retailSeller) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
