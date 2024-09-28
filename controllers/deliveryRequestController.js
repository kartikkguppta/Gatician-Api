const LogisticsSeller = require('../models/logisticsSellerModel');
const RetailSeller = require('../models/retailSellerModel');

// Helper function to calculate distance between two coordinates
const calculateDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  
  const lat1 = coords1[1];
  const lon1 = coords1[0];
  const lat2 = coords2[1];
  const lon2 = coords2[0];

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c; // Distance in kilometers
};

// Request delivery based on order ID
exports.requestDelivery = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await RetailSeller.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { weight, volume, pickupLocation, deliveryLocation, preparationTime, priority } = order;

    // Fetch all logistics sellers
    const logisticsSellers = await LogisticsSeller.find();
    
    // Filter and sort based on priority
    const deliveryPersons = logisticsSellers.flatMap(seller => seller.delivery_persons)
      .filter(person => person.availability)
      .map(person => ({
        ...person._doc,
        distance: calculateDistance(pickupLocation, person.current_location) // Add distance calculation
      }));

    let sortedDeliveryPersons;
    if (priority === 'Cost') {
      sortedDeliveryPersons = deliveryPersons.sort((a, b) => a.estimate_cost - b.estimate_cost);
    } else if (priority === 'Time') {
      sortedDeliveryPersons = deliveryPersons.sort((a, b) => a.eta - b.eta);
    } else if (priority === 'Rating') {
      sortedDeliveryPersons = deliveryPersons.sort((a, b) => b.rating - a.rating);
    }

    res.status(200).json(sortedDeliveryPersons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm delivery and respond to retail seller
exports.confirmDeliveryToRetailSeller = async (req, res) => {
  const { orderId } = req.params;
  const { deliveryPersonId } = req.body;

  try {
    // Find the retail seller order
    const order = await RetailSeller.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Find the delivery person
    const logisticsSellers = await LogisticsSeller.find();
    const deliveryPerson = logisticsSellers.flatMap(seller => seller.delivery_persons)
      .find(person => person._id.toString() === deliveryPersonId);

    if (!deliveryPerson) {
      return res.status(404).json({ message: 'Delivery person not found' });
    }

    // Respond with delivery person details
    res.status(200).json({
      firstName: deliveryPerson.first_name,
      lastName: deliveryPerson.last_name,
      vehicleNo: deliveryPerson.vehicle_no,
      currentLocation: deliveryPerson.current_location,
      contactNumber: deliveryPerson.contact_number,
      profilePicture: deliveryPerson.profile_picture,
      estimateCost: deliveryPerson.estimate_cost,
      rating: deliveryPerson.rating,
      eta: deliveryPerson.eta,
      id: deliveryPerson._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
