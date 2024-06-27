const express = require('express');
const cors = require('cors');
const dbConnect = require('./DataBase/db.js');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

// DB Connect
dbConnect();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const app = express();

// Middleware to handle JSON
app.use(express.json());

// CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://magenta-alpaca-432d58.netlify.app'
];
app.use(cors({ origin: function(origin, callback) {
  // Allow requests with no origin (like mobile apps or curl requests)
  if (!origin) return callback(null, true);
  if (allowedOrigins.indexOf(origin) === -1) {
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  }
  return callback(null, true);
}, credentials: true }));

// Use express router
app.use('/', require("./Routes"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Unable to connect the server: ', err);
  }
  console.log(`Server is running on port no: ${process.env.PORT}`);
});

module.exports = app;