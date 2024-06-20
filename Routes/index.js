const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// multer configuration
const upload = multer({ dest: '/tmp' });

// Welcome route
router.get('/', (req, res) => {
  res.status(200).json({
    greeting: 'Welcome to Airbnb_Clone',
  });
});

// Upload photo using image URL
router.post('/upload-by-link', async (req, res) => {
  try {
    const { link } = req.body;
    let result = await cloudinary.uploader.upload(link, {
      folder: 'Airbnb/Places',
    });
    res.json(result.secure_url);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).send({ Err: error });
  }
});

// Upload images from local device
router.post('/upload', upload.array('photos', 100), async (req, res) => {
  try {
    let imageArray = [];

    for (let index = 0; index < req.files.length; index++) {
      let { path } = req.files[index];
      let result = await cloudinary.uploader.upload(path, {
        folder: 'Airbnb/Places',
      });
      imageArray.push(result.secure_url);
    }

    res.status(200).json(imageArray);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).send({ Err: error });
  }
});

// Base Routers
router.use('/user', require('./User'));
router.use('/places', require('./Place'));
router.use('/bookings', require('./Booking'));

module.exports = router;