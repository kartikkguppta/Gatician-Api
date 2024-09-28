/*const mongoose = require('mongoose');

const deliveryPersonSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  vehicle_type: String,
  vehicle_no: String,
  current_location: [Number], // [longitude, latitude]
  logistics_company_name: String,
  company_id: String,
  availability: Boolean,
  contact_number: String,
  profile_picture: String,
  estimate_cost: Number,
  rating: Number,
  eta: Number // Estimated time of arrival in minutes
});

const logisticsSellerSchema = mongoose.Schema({
  name: String,
  delivery_persons: [deliveryPersonSchema]
});

const LogisticsSeller = mongoose.model('LogisticsSeller', logisticsSellerSchema);

module.exports = LogisticsSeller;*/


/*const mongoose = require('mongoose');

const deliveryPersonSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  vehicle_type: { type: String, required: true },
  vehicle_no: { type: String, required: true },
  current_location: { type: [Number], required: true }, // [longitude, latitude]
  availability: { type: Boolean, required: true },
  contact_number: { type: String, required: true },
  profile_picture: { type: String },
  estimate_cost: { type: Number, required: true },
  rating: { type: Number, required: true },
  eta: { type: Number, required: true } // in minutes
});

const logisticsSellerSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_id: { type: String, required: true },
  delivery_persons: [deliveryPersonSchema]
});

const LogisticsSeller = mongoose.model('LogisticsSeller', logisticsSellerSchema);

module.exports = LogisticsSeller;*/

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

