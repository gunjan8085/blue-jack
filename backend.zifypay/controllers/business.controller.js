const businessService = require("../services/business.service");
const logger = require("../utils/logger.util");
const multer = require("multer");
const s3Service = require("../services/s3.service");

const upload = multer({ storage: multer.memoryStorage() });
const Review = require("../models/review.model");
const Business = require("../models/business.model");
const PricingPlan = require("../models/pricingPlan.model");

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
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
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
          message: "No business found for this owner",
        });
      }

      return res.status(200).json({
        success: true,
        data: business,
        message: "Business retrieved successfully",
      });
    } catch (error) {
      logger.error("Error fetching business by owner:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
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
          message: "Business not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: business,
        message: "Business retrieved successfully",
      });
    } catch (error) {
      logger.error("Error fetching business by ID:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },

  addReviewToBusiness: async (req, res) => {
    try {
      const { id } = req.params; // business id
      const { text, stars, appointment } = req.body; // now includes appointment
      const userId = req.user?._id || req.body.userId;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "User not authenticated." });
      }
      if (!stars || stars < 1 || stars > 5) {
        return res
          .status(400)
          .json({ success: false, message: "Stars must be between 1 and 5." });
      }

      const existingReview = await Review.findOne({
        appointment: appointment,
        addedBy: userId
      });
      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: "You've already submitted a review for this appointment."
        });
      }

      const review = await Review.create({
        addedBy: userId,
        forBusiness: id,
        appointment: appointment, // store appointment reference
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
      const business = await Business.findById(id).populate("reviews");
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
        .populate('addedBy', 'firstName lastName email')
        .populate('appointment', 'service staff date time') // populate appointment details
        .sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: reviews });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  checkExistingReview: async (req, res) => {
  try {
    const { businessId } = req.params;
    const { userId, appointmentId } = req.query;

    if (!userId || !appointmentId) {
      return res.status(400).json({ 
        success: false, 
        message: "userId and appointmentId are required" 
      });
    }

    const review = await Review.findOne({
      forBusiness: businessId,
      addedBy: userId,
      appointment: appointmentId
    });

    return res.status(200).json({ 
      success: true, 
      exists: !!review,
      data: review || null
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
},
  uploadThumbnail: [
    upload.single("file"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res
            .status(400)
            .json({ success: false, message: "No file uploaded" });
        }
        const result = await s3Service.uploadFile(req.file);
        if (!result || !result.Location) {
          return res
            .status(500)
            .json({ success: false, message: "Failed to upload image" });
        }
        return res.status(200).json({ success: true, url: result.Location });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    },
  ],
  updateBusiness: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const business = await Business.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!business) {
        return res
          .status(404)
          .json({ success: false, message: "Business not found" });
      }
      return res
        .status(200)
        .json({
          success: true,
          data: business,
          message: "Business updated successfully",
        });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  purchaseSubscription: async (req, res) => {
    try {
      const { businessId, pricingPlanId } = req.body;
      // Validate business and plan
      const business = await Business.findById(businessId);
      const plan = await PricingPlan.findById(pricingPlanId);
      if (!business || !plan) {
        return res.status(404).json({ success: false, message: "Business or plan not found" });
      }
      // Simulate successful payment and subscription
      business.subscriptionPlan = plan._id;
      business.isActive = true;
      await business.save();
      return res.status(200).json({ success: true, message: "Subscription purchased and business activated.", data: business });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};
