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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Use express router
app.use('/', require("./Routes"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Unable to connect the server: ', err);
  }
  console.log(`Server is running on port no: ${process.env.PORT}`);
});

module.exports = app;