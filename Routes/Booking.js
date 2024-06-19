const express = require('express');
const router = express.Router();

const {
  createBookings,
  getBookings,
} = require('../Controller/BookingController');

router.route('/').get(getBookings);
router.route('/').post(createBookings);

module.exports = router;