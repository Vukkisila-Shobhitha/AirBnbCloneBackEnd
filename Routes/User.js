const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  userprofile,
  signout,
} = require('../Controller/UserController');
const auth = require('../Middleware/auth');

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/userprofile').get(auth, userprofile); // Ensure authentication for user profile
router.route('/signout').post(signout);

module.exports = router;