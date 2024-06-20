const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  userprofile,
  signout,
} = require('../Controller/UserController');

// Define routes and connect them to respective controller functions
router.route('/signup')
  .post(signup);

router.route('/signin')
  .post(signin);

router.route('/userprofile')
  .get(userprofile);

router.route('/signout')
  .post(signout);

module.exports = router;