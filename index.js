const express = require('express');
const cors = require('cors');
const dbConnect = require('./DataBase/db.js');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Initialize database connection
dbConnect();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  // Example of more restrictive CORS configuration
  // origin: function (origin, callback) {
  //   const baseArray = [
  //     'https://airbnb-clone-mern.netlify.app/',
  //     'http://localhost:9090',
  //   ];
  //   if (baseArray.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  // exposedHeaders: ['set-cookie'],
}));

// Routes
app.use('/', require('./Routes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Unable to connect to the server:', err);
    return;
  }
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;