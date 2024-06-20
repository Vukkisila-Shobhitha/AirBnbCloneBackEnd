const express = require('express');
const router = express.Router();
const { createBookings, getBookings } = require('../Controller/BookingController');

// GET bookings for the authenticated user
router.get('/', getBookings);

// POST create a new booking
router.post('/', createBookings);

module.exports = router;