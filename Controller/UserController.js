const User = require("../Schema/User");
const bcrypt = require("bcryptjs");
const userToken = require("../Token/userToken");

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
        message: "User registered already",
      });
    }

    user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server Error",
      error: err,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const validatedPassword = await bcrypt.compare(password, user.password);
      if (validatedPassword) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWTPRIVATEKEY,
          {
            expiresIn: "2h",
          }
        );

        user.password = undefined;

        res.status(200).json({
          user,
          token,
        });
      } else {
        res.status(401).json({
          message: "email or password is incorrect",
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server Error",
      error: err,
    });
  }
};

exports.userprofile = async (req, res) => {
  try {
    const userData = userToken(req);
    if (userData) {
      const { username, email, _id } = await User.findById(userData.id);
      res.status(200).json({ username, email, _id });
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server Error",
      error: err,
    });
  }
};

exports.signout = async (req, res) => {
  res.cookie("token", "").json({
    message: "Signed out successfully!",
  });
};