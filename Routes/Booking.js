const express = require('express');
const router = express.Router();
const { createBookings, getBookings } = require('../Controller/BookingController');
const auth = require('../Middleware/auth');

// GET bookings for the authenticated user
router.get('/', auth, getBookings);

// POST create a new booking
router.post('/', createBookings);

module.exports = router;