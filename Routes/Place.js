const express = require('express');
const router = express.Router();
const {
  addPlace,
  getPlaces,
  updatePlace,
  singlePlace,
  userPlaces,
  searchPlaces,
  searchHotels,
} = require('../Controller/PlaceController');

// Define routes and connect them to respective controller functions
router.route('/')
  .get(getPlaces);

router.route('/add-places')
  .post(addPlace);

router.route('/update-place')
  .put(updatePlace);

router.route('/user-places')
  .get(userPlaces);

router.route('/:id')
  .get(singlePlace);

router.route('/search/:key')
  .get(searchPlaces);

router.route('/searchhotel/:key')
  .get(searchHotels);

module.exports = router;