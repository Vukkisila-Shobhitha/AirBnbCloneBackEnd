const Places = require('../Schema/Places');
const userToken = require('../Token/userToken');

exports.addPlace = async (req, res) => {
  try {
    const userData = userToken(req);
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const place = await Places.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    res.status(200).json({ place });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Places.find();
    res.status(200).json({ places });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePlace = async (req, res) => {
  try {
    const userData = userToken(req);
    const userId = userData.id;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    const place = await Places.findById(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    if (userId !== place.owner.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    place.set({
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    await place.save();
    res.status(200).json({ message: 'Place details updated!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Places.findById(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json({ place });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.userPlaces = async (req, res) => {
  try {
    const userData = userToken(req);
    const id = userData.id;
    const userPlaces = await Places.find({ owner: id });
    res.status(200).json({ userPlaces });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchPlaces = async (req, res) => {
  try {
    const { key } = req.params;

    if (key === '') {
      return res.status(400).json({ message: 'Search key cannot be empty' });
    }

    const searchMatches = await Places.find({
      address: { $regex: key, $options: 'i' },
    });

    res.status(200).json({ searchMatches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchHotels = async (req, res) => {
  try {
    const { key } = req.params;

    if (key === '') {
      return res.status(400).json({ message: 'Search key cannot be empty' });
    }

    const searchMatches = await Places.find({
      title: { $regex: key, $options: 'i' },
    });

    res.status(200).json({ searchMatches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};