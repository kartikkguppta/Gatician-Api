const mongoose = require('mongoose');

const logisticsSellerSchema = mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true
    },
    company_id: {
      type: String,
      required: true
    },
    delivery_persons: [
      {
        first_name: {
          type: String,
          required: true
        },
        last_name: {
          type: String,
          required: true
        },
        vehicle_type: {
          type: String,
          required: true
        },
        vehicle_no: {
          type: String,
          required: true
        },
        current_location: {
          type: [Number], // [longitude, latitude]
          required: true
        },
        availability: {
          type: Boolean,
          default: true
        },
        contact_number: {
          type: String,
          required: true
        },
        profile_picture: {
          type: String,
          required: true
        },
        estimate_cost: {
          type: Number,
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        eta: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const LogisticsSeller = mongoose.model('LogisticsSeller', logisticsSellerSchema);

module.exports = LogisticsSeller;

