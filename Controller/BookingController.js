const Bookings = require('../Schema/Bookings');
const userToken = require('../Token/userToken');

exports.createBookings = async (req, res) => {
  try {
    const userData = userToken(req);
    const { place, checkIn, checkOut, numOfGuests, username, phone, price } =
      req.body;

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
    res.send({ Err: err });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const userData = userToken(req);
    console.log("UD", userToken);
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const booking = await Bookings.find({ user: userData.id }).populate(userData.place)

    res
      .status(200).json({ booking, success: true })


  } catch (err) {
    console.log(err);
    res.send({ Errornow: err });
  }
};