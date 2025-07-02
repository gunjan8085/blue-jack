
// ============= BACKEND: user.controller.js =============
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendSignupMail, sendLoginMail } = require("../services/mail.service");

const userController = {
  // POST /users/signup
  createNewUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phoneNumber, country } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists"
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        country
      });

      await newUser.save();

      // Send signup email (don't block response)
      sendSignupMail(email, firstName || email.split('@')[0])
        .catch((err) => console.error('Signup email error:', err));

      const userResponse = newUser.toObject();
      delete userResponse.password;

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: { user: userResponse }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // POST /users/login
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      const userResponse = user.toObject();
      delete userResponse.password;

      // Send login email (don't block response)
      sendLoginMail(email, user.firstName || email.split('@')[0])
        .catch((err) => console.error('Login email error:', err));

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: userResponse,
          token: token
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // GET /users/profile
  getUserProfile: async (req, res) => {
    try {
      // Extract user ID from token or query params
      let userId = req.userId; // From auth middleware
      if (!userId && req.query.userId) {
        userId = req.query.userId;
      }

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required"
        });
      }

      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        data: { user }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // PATCH /users/update-profile
  updateUserProfile: async (req, res) => {
    try {
      let userId = req.userId; // From auth middleware
      if (!userId && req.query.userId) {
        userId = req.query.userId;
      }

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required"
        });
      }

      const { firstName, lastName, phoneNumber, country, profilePicUrl } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
          phoneNumber,
          country,
          profilePicUrl
        },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: { user: updatedUser }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  },

  // DELETE /users/delete-profile
  deleteUserProfile: async (req, res) => {
    try {
      let userId = req.userId; // From auth middleware
      if (!userId && req.query.userId) {
        userId = req.query.userId;
      }

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required"
        });
      }

      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Profile deleted successfully"
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message
      });
    }
  }
};

module.exports = userController;
