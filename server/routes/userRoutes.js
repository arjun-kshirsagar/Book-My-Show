const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.send({
        success: false,
        message: "User already exists. Please login",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    console.log(newUser)
    await newUser.save();
    res.json("User Created");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.send({
            success: false,
            message: "User not found. Please register",
        });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.send({
            success: false,
            message: "Invalid password",
        });
    }
    try {
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
