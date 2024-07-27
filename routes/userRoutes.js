const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../auth.js");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    console.log(name, email, password, phone);

    // Check if all fields are provided
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill full form" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({ name, email, password: hashedpassword, phone });
    const savedUser = await user.save();

    return res.json({
      success: true,
      message: "SignUp successfully",
      savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
});

// Adding routes for user login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ success: false, message: "Please provide all details" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Inavlid email address" });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Inavlid email address or password" });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
      })
      .json({
        success: true,
        message: "User Logged in",
        user,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
});

router.get("/getUser", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
});

// Logout request

router.get("/logout", isAuthenticated,(req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expiresIn: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out",
    });
});

module.exports = router;
