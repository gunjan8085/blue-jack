
// ============= BACKEND: user.controller.js =============
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendSignupMail, sendLoginMail } = require("../services/mail.service");

const userController = {
  // POST /users/signup
  createNewUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phoneNumber, country , profilePicUrl } = req.body;

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
        profilePicUrl: profilePicUrl,
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
      let userId = req.body.userId; // From auth middleware
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
  },
  // Forgot Password - Step 1: Send OTP
  requestPasswordReset: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      user.resetPasswordOTP = otp;
      user.resetPasswordOTPExpires = expires;
      await user.save();
      // Send OTP email (non-blocking)
      const { sendPasswordResetOTP } = require('../services/mail.service');
      sendPasswordResetOTP(user.email, user.firstName || user.email.split('@')[0], otp)
        .catch((err) => console.error('Password reset OTP email error:', err));
      return res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  },

  // Forgot Password - Step 2: Verify OTP
  verifyPasswordResetOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });
      const user = await User.findOne({ email });
      if (!user || !user.resetPasswordOTP || !user.resetPasswordOTPExpires)
        return res.status(400).json({ success: false, message: 'No OTP request found for this user' });
      if (user.resetPasswordOTP !== otp)
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      if (user.resetPasswordOTPExpires < new Date())
        return res.status(400).json({ success: false, message: 'OTP expired' });
      return res.status(200).json({ success: true, message: 'OTP verified' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  },

  // Forgot Password - Step 3: Reset Password
  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword)
        return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
      const user = await User.findOne({ email });
      if (!user || !user.resetPasswordOTP || !user.resetPasswordOTPExpires)
        return res.status(400).json({ success: false, message: 'No OTP request found for this user' });
      if (user.resetPasswordOTP !== otp)
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      if (user.resetPasswordOTPExpires < new Date())
        return res.status(400).json({ success: false, message: 'OTP expired' });
      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await require('bcryptjs').hash(newPassword, saltRounds);
      user.password = hashedPassword;
      user.resetPasswordOTP = null;
      user.resetPasswordOTPExpires = null;
      await user.save();
      return res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  },

  // make a api that handles google login and signup
  
   
};

module.exports = userController;
