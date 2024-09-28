require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Hello World
app.get('/', (req, res) => {
  res.send('Hello World');
});

// App Checker
app.get('/check', (req, res) => {
  res.send('Hey there, I am working fine');
});

// Routes
const retailSellerRoutes = require('./routes/retailSellerRoutes');
app.use('/retail-sellers', retailSellerRoutes);

const logisticsSellerRoutes = require('./routes/logisticsSellerRoutes');
app.use('/logistics-sellers', logisticsSellerRoutes);

const deliveryRoutes = require('./routes/deliveryRoutes');
app.use('/deliveries', deliveryRoutes);

// Connection to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
