
// ============= BACKEND: user.controller.js =============
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendSignupMail, sendLoginMail } = require("../services/mail.service");
const { OAuth2Client } = require("google-auth-library");
const { signUserJWT } = require("../utils/jwt");
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      // Store OTP in node-cache with 10min TTL
      const otpCache = require('../services/otpCache');
      otpCache.set(`otp:${email}`, otp);
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
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      const otpCache = require('../services/otpCache');
      const storedOtp = otpCache.get(`otp:${email}`);
      if (!storedOtp) return res.status(400).json({ success: false, message: 'No OTP request found for this user' });
      if (storedOtp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });
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
      const otpCache = require('../services/otpCache');
      const storedOtp = otpCache.get(`otp:${email}`);
      if (!storedOtp) return res.status(400).json({ success: false, message: 'No OTP request found for this user' });
      if (storedOtp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });
      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await require('bcryptjs').hash(newPassword, saltRounds);
      let updatedModels = [];
      let matchCount = 0;
      // Try User
      let user = await User.findOne({ email });
      if (user) {
        matchCount++;
        console.log('[RESET PASSWORD] Matched User model for email:', email);
        user.password = hashedPassword;
        try {
          await user.save();
          updatedModels.push('User');
          const updatedUser = await User.findOne({ email });
          console.log('[RESET PASSWORD] User password updated:', updatedUser.password);
        } catch (err) {
          console.error('[RESET PASSWORD] Error saving User password:', err);
        }
      }
      // Try Employee
      const Employee = require('../models/employee.model');
      let employee = await Employee.findOne({ email });
      if (employee) {
        matchCount++;
        console.log('[RESET PASSWORD] Matched Employee model for email:', email);
        employee.password = hashedPassword;
        try {
          await employee.save();
          updatedModels.push('Employee');
          const updatedEmp = await Employee.findOne({ email });
          console.log('[RESET PASSWORD] Employee password updated:', updatedEmp.password);
        } catch (err) {
          console.error('[RESET PASSWORD] Error saving Employee password:', err);
        }
      }
      // Try Business (if business login uses email/password)
      const Business = require('../models/business.model');
      let business = await Business.findOne({ contactEmail: email });
      if (business && business.password !== undefined) {
        matchCount++;
        console.log('[RESET PASSWORD] Matched Business model for email:', email);
        business.password = hashedPassword;
        try {
          await business.save();
          updatedModels.push('Business');
          const updatedBiz = await Business.findOne({ contactEmail: email });
          console.log('[RESET PASSWORD] Business password updated:', updatedBiz.password);
        } catch (err) {
          console.error('[RESET PASSWORD] Error saving Business password:', err);
        }
      }
      // Remove OTP from node-cache after successful reset
      otpCache.del(`otp:${email}`);
      if (matchCount > 1) {
        console.warn('[RESET PASSWORD] WARNING: Multiple accounts found with the same email in different models:', email);
      }
      if (updatedModels.length > 0) {
        return res.status(200).json({ success: true, message: `Password reset successful for: ${updatedModels.join(', ')}` });
      } else {
        return res.status(404).json({ success: false, message: 'User/Employee/Business not found with this email' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  },

  // make a api that handles google login and signup
  verifyGoogleIdToken: async (idToken) => {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  },
  
  /**
   * POST /auth/google
   * Body: { idToken: string }
   */
  googleAuth: async (req, res) => {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        return res.status(400).json({ success: false, message: "idToken is required" });
      }
  
      const payload = await userController.verifyGoogleIdToken(idToken);
      // Payload properties: sub, email, email_verified, name, given_name, family_name, picture
      const {
        sub: googleId,
        email,
        email_verified: emailVerified,
        name,
        given_name,
        family_name,
        picture,
      } = payload || {};
  
      if (!email) return res.status(400).json({ success: false, message: "Email not present in Google token" });
      if (!emailVerified) return res.status(401).json({ success: false, message: "Google email not verified" });
  
      // Find existing by email
      let user = await User.findOne({ email });
  
      if (!user) {
        // Create a new user (no password) for Google auth
        user = await User.create({
          email,
          firstName: given_name || (name ? name.split(" ")[0] : undefined),
          lastName: family_name || (name ? name.split(" ").slice(1).join(" ") : undefined),
          profilePicUrl: picture || null,
          authProvider: "google",
          googleId,
          emailVerified: !!emailVerified,
          lastLoginAt: new Date(),
        });
      } else {
        // Update provider info if needed (don’t overwrite local account unless you want to)
        const updates = {};
        if (!user.googleId) updates.googleId = googleId;
        if (user.authProvider !== "google") updates.authProvider = "google";
        if (picture && !user.profilePicUrl) updates.profilePicUrl = picture;
        updates.lastLoginAt = new Date();
  
        if (Object.keys(updates).length) {
          user.set(updates);
          await user.save();
        }
      }
  
      const token = signUserJWT({ userId: user._id, email: user.email });
  
      const userResponse = user.toObject();
      delete userResponse.password;
  
      // (Optional) sendLoginMail(email, user.firstName || email.split("@")[0]).catch(console.error);
  
      return res.status(200).json({
        success: true,
        message: "Google sign-in successful",
        data: { user: userResponse, token },
      });
    } catch (err) {
      console.error("Google auth error:", err);
      return res.status(401).json({ success: false, message: "Invalid Google token", error: err.message });
    }
  },
   
};

module.exports = userController;

