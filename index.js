const express = require('express');
const cors = require('cors');
const dbConnect = require('./DataBase/db.js');
const cloudinary = require('cloudinary').v2;


require('dotenv').config();

// DB Connect
dbConnect();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});


const app = express();

// middleware to handle json
app.use(express.json());

const base_array = [
  'https://airbnb-clone-mern.netlify.app/',
  'http://localhost:9090',
];

// CORS 
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (base_array.indexOf(origin !== -1)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by cors'));
      }
    },
    exposedHeaders: ['set-cookie'],
  })
);

// use express router
// app.use('/uploads', express.static(__dirname+'/uploads'));
app.use('/', require("./Routes"));




app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Unable to connect the server: ', err);
  }
  console.log(`Server is running on port no: ${process.env.PORT}`);
});

module.exports = app;