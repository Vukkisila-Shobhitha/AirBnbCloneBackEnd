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

        // Do not send sensitive information like password in response
        user.password = undefined;

        res.status(200).json({
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
          },
          token,
        });
      } else {
        res.status(401).json({
          message: "Email or password is incorrect",
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
      error: err.message,
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