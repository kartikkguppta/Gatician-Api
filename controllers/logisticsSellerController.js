const LogisticsSeller = require('../models/logisticsSellerModel');

// Create a new logistics seller
exports.createLogisticsSeller = async (req, res) => {
  try {
    const logisticsSeller = await LogisticsSeller.create(req.body);
    res.status(201).json(logisticsSeller);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all logistics sellers
exports.getAllLogisticsSellers = async (req, res) => {
  try {
    const logisticsSellers = await LogisticsSeller.find();
    res.status(200).json(logisticsSellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logistics seller by ID
exports.getLogisticsSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const logisticsSeller = await LogisticsSeller.findById(id);
    if (!logisticsSeller) {
      return res.status(404).json({ message: 'Logistics seller not found' });
    }
    res.status(200).json(logisticsSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update logistics seller by ID
exports.updateLogisticsSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const logisticsSeller = await LogisticsSeller.findByIdAndUpdate(id, req.body, { new: true });
    if (!logisticsSeller) {
      return res.status(404).json({ message: 'Logistics seller not found' });
    }
    res.status(200).json(logisticsSeller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete logistics seller by ID
exports.deleteLogisticsSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const logisticsSeller = await LogisticsSeller.findByIdAndDelete(id);
    if (!logisticsSeller) {
      return res.status(404).json({ message: 'Logistics seller not found' });
    }
    res.status(200).json({ message: 'Logistics seller deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
