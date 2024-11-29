const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { sequelize } = require('./config/db'); 
const memberRoutes = require('./routes/memberRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust if using different frontend URL
}));
app.use(express.json());  // To parse incoming JSON requests

// Routes
app.use('/api/members', memberRoutes);  // Add member routes under '/api/members'

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Gym Management API');
});

// Sync Sequelize models and start the server
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
