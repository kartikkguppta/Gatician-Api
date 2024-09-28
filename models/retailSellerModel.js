const mongoose = require('mongoose');

const retailSellerSchema = mongoose.Schema(
  {
    weight: {
      type: Number,
      required: true
    },
    volume: {
      type: Number,
      required: true
    },
    pickupLocation: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    deliveryLocation: {
      type: [Number], // [longitude, latitude]
      required: true
    },
    preparationTime: {
      type: Number, // Time in minutes
      required: true
    },
    priority: {
      type: String,
      enum: ['Cost', 'Time', 'Rating'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const RetailSeller = mongoose.model('RetailSeller', retailSellerSchema);

module.exports = RetailSeller;
