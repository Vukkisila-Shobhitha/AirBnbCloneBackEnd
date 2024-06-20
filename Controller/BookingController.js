const Bookings = require('../Schema/Bookings');
const userToken = require('../Token/userToken');

exports.createBookings = async (req, res) => {
  try {
    const userData = userToken(req);
    const { place, checkIn, checkOut, numOfGuests, username, phone, price } = req.body;

    const booking = await Bookings.create({
      user: userData.id,
      place,
      checkIn,
      checkOut,
      numOfGuests,
      username,
      phone,
      price,
    });

    res.status(200).json({
      booking,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const userData = userToken(req);
    if (!userData) {
      return res.status(401).json({ error: 'You are not authorized to access this page!' });
    }

    const bookings = await Bookings.find({ user: userData.id }).populate('place');

    res.status(200).json({ bookings, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};