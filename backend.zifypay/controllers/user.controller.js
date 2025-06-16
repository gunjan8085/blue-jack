const userService = require("../services/user.service");
const { generateToken } = require("../utils/token.util");
const { securePassword } = require("../utils/bcrypt.util");

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 const  JWT_SECRET = "your secret key"; // Replace with your actual secret key
module.exports = {
  createNewUser: async (req, res) => {
    try {
      console.log(req.body);
      
      const {
        firstName,
        lastName,
        email,
        password,
        profilePicUrl,
        phoneNumber,
        country,
        favourites,
        recentlyViewed,
      } = req.body;


      // Basic validations
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profilePicUrl,
        phoneNumber,
        country,
        // favourites,
        // recentlyViewed,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign(
        { id: savedUser._id, role: "User" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: { user: savedUser, token },
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

      const token = jwt.sign(
        { id: user._id, role: "User" },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: { user, token },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};