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
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.send({ Err: err });
  }
};

exports.getPlaces = async (req, res) => {
  try {
    const places = await Places.find();
    res.status(200).json({
      places,
    });
  } catch (err) {
    res.send({ Err: err });
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
    if (userId === place.owner.toString()) {
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
      res.status(200).json({
        message: 'Place details updated!',
      });
    }
  } catch (err) {
    res.send({ Err: err });
  }
};

exports.singlePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Places.findById(id);
    if (!place) {
      return res.status(400).json({
        message: 'Place not found',
      });
    }
    res.status(200).json({
      place,
    });
  } catch (err) {
    res.send({ Err: err });
  }
};

exports.userPlaces = async (req, res) => {
  try {
    const userData = userToken(req);
    //console.log("USERDATA===>",userData)
    const id = userData.id;
    // const temp = await Places.find({ owner: id })
    res.status(200).json(await Places.find({ owner: id }));
  } catch (err) {
    res.send({ Err: err });
  }
};

exports.searchPlaces = async (req, res) => {
  try {
    const searchword = req.params.key;

    if (searchword === '') return res.status(200).json(await Places.find())

    const searchMatches = await Places.find({ address: { $regex: searchword, $options: "i" } })

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err)
    res.send({ Err: err });
  }
}

exports.searchHotels = async (req, res) => {
  try {
    const searchword = req.params.key;

    if (searchword === '') return res.status(200).json(await Places.find())

    const searchMatches = await Places.find({ title: { $regex: searchword, $options: "i" } })

    res.status(200).json(searchMatches);
  } catch (err) {
    console.log(err)
    res.send({ Err: err });
  }
}