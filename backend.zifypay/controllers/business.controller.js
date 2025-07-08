const businessService = require("../services/business.service");
const logger = require("../utils/logger.util");
const multer = require('multer');
const s3Service = require('../services/s3.service');

const upload = multer({ storage: multer.memoryStorage() });
const Review = require("../models/review.model");
const Business = require("../models/business.model");

module.exports = {
  registerNewBusiness: async (req, res) => {
    try {
      const business = await businessService.registerNewBusiness(req.body);
      // Send signup email (non-blocking)
      const { email, name } = req.body;
      if (email) {
        const { sendSignupMail } = require("../services/mail.service");
        sendSignupMail(email, name || email.split('@')[0]).catch(err => console.error('Business signup email error:', err));
      }
      return res.status(201).json({ data: business, success: true });
    } catch (error) {
      logger.error("Error signing up business:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  getAllBusinesses: async (req, res) => {
    try {
      const businesses = await businessService.getAllBusinesses();
      return res.status(200).json({
        data: businesses,
        success: true,
        message: "Businesses retrieved successfully",
      });
    } catch (error) {
      logger.error("Error fetching businesses:", error);
      return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
  },
  getBusinessByOwnerId: async (req, res) => {
    try {
      const { ownerId } = req.params;
      
      // Get the business without owner verification first
      const business = await businessService.getBusinessByOwnerId(ownerId);
      
      if (!business) {
        return res.status(404).json({
          success: false,
          message: "No business found for this owner"
        });
      }

      return res.status(200).json({
        success: true,
        data: business,
        message: "Business retrieved successfully"
      });
    } catch (error) {
      logger.error("Error fetching business by owner:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error"
      });
    }
  },
  getBusinessById: async (req, res) => {
    try {
      const { id } = req.params;
      const business = await businessService.getBusinessById(id);
      
      if (!business) {
        return res.status(404).json({
          success: false,
          message: "Business not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: business,
        message: "Business retrieved successfully"
      });
    } catch (error) {
      logger.error("Error fetching business by ID:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error"
      });
    }
  },
  addReviewToBusiness: async (req, res) => {
    try {
      const { id } = req.params; // business id
      const { text, stars } = req.body;
      const userId = req.user?._id || req.body.userId; // support for both auth and manual userId
      if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated." });
      }
      if (!stars || stars < 1 || stars > 5) {
        return res.status(400).json({ success: false, message: "Stars must be between 1 and 5." });
      }
      const review = await Review.create({
        addedBy: userId,
        forBusiness: id,
        text: text || "",
        stars,
      });
      // Add review to business
      await Business.findByIdAndUpdate(id, {
        $push: { reviews: review._id },
        $inc: { reviewCount: 1 },
        $set: { updatedAt: new Date() },
      });
      // Optionally update avgReview
      const business = await Business.findById(id).populate('reviews');
      if (business) {
        const totalStars = business.reviews.reduce((sum, r) => sum + (r.stars || 0), 0);
        const avg = totalStars / (business.reviews.length || 1);
        business.avgReview = avg;
        await business.save();
      }
      return res.status(201).json({ success: true, data: review });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  getBusinessReviews: async (req, res) => {
    try {
      const { id } = req.params;
      const reviews = await Review.find({ forBusiness: id })
        .populate('addedBy', 'name email')
        .sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: reviews });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  uploadThumbnail: [
    upload.single('file'),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        const result = await s3Service.uploadFile(req.file);
        if (!result || !result.Location) {
          return res.status(500).json({ success: false, message: 'Failed to upload image' });
        }
        return res.status(200).json({ success: true, url: result.Location });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }
  ]
};
