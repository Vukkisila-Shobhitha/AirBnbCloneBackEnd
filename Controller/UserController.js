const User = require("../Schema/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, Email and Password are required",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server Error",
      error: err.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Signin request body:', req.body); // Log request body

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const validatedPassword = await bcrypt.compare(password, user.password);
    if (!validatedPassword) {
      return res.status(401).json({
        message: "Email or password is incorrect",
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    user.password = undefined; // Do not send sensitive information like password in response

    console.log('Generated token:', token); // Log generated token

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error('Signin error:', err); // Log detailed error
    res.status(500).json({
      message: "Internal server Error",
      error: err.message,
    });
  }
};
exports.userprofile = async (req, res) => {
  try {
    const userData = req.user;
    const user = await User.findById(userData.id).select('-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error('User profile error:', err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server Error",
      error: err.message,
    });
  }
};

exports.signout = async (req, res) => {
  // Clear token cookie upon signout
  res.clearCookie("token").json({
    message: "Signed out successfully!",
  });
};