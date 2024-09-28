const LogisticsSeller = require('../models/logisticsSellerModel');
const RetailSeller = require('../models/retailSellerModel');

// Confirm delivery
exports.confirmDelivery = async (req, res) => {
  const { orderId } = req.params;
  const { deliveryPersonId, status } = req.body;

  if (status === 'success') {
    // Mark the delivery person as unavailable
    await LogisticsSeller.updateOne(
      { 'delivery_persons._id': deliveryPersonId },
      { $set: { 'delivery_persons.$.availability': false } }
    );
    return res.status(200).json({ message: 'Delivery confirmed' });
  }

  try {
    // Fetch the order and find the next available delivery person based on priority
    const order = await RetailSeller.findById(orderId);
    const { weight, volume, pickupLocation, deliveryLocation, preparationTime, priority } = order;

    const logisticsSellers = await LogisticsSeller.find();
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

    // Find the next available delivery person
    const nextPerson = sortedDeliveryPersons.find(person => person._id.toString() !== deliveryPersonId);

    if (!nextPerson) {
      return res.status(404).json({ message: 'No available delivery person found' });
    }

    res.status(200).json({ message: 'Delivery request sent to next person', nextPerson });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  

  
