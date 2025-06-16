const Business = require("../models/business.model");
const { uploadFile } = require("../services/s3.service");
const logger = require("../utils/logger.util");

module.exports = {
  addServiceCategories: async (req, res) => {
    try {
      const { businessId } = req.params;
      let {
        title,
        description,
        hashtags,
        tags,
        price,
        duration
      } = req.body;

      // Parse arrays safely
      hashtags = typeof hashtags === "string" ? hashtags.split(',') : hashtags;
      tags = typeof tags === "string" ? tags.split(',') : tags;

      // Upload image if exists
      let imageUrl = "";
      if (req.file) {
        console.log("File received:", req.file);
        
        const uploaded = await uploadFile(req.file);
        imageUrl = uploaded?.Location || "";
      }

      const newService = {
        title,
        description,
        hashtags,
        tags,
        price,
        duration,
        imageUrl,
      };

      const updatedBusiness = await Business.findByIdAndUpdate(
        businessId,
        { $push: { serviceCategories: newService } },
        { new: true }
      );

      if (!updatedBusiness) {
        return res.status(404).json({
          success: false,
          message: "Business not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedBusiness,
        message: "Service category added successfully"
      });
    } catch (error) {
      logger.error("Error adding service category:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error"
      });
    }
  },

  updateServiceCategory: async (req, res) => {
    try {
      const { businessId, serviceId } = req.params;
      let {
        title,
        description,
        hashtags,
        tags,
        price,
        duration
      } = req.body;

      hashtags = typeof hashtags === "string" ? hashtags.split(',') : hashtags;
      tags = typeof tags === "string" ? tags.split(',') : tags;

      let imageUrl;
      if (req.file) {
        const uploaded = await uploadFile(req.file);
        imageUrl = uploaded?.Location;
      }

      const business = await Business.findById(businessId);
      if (!business) {
        return res.status(404).json({
          success: false,
          message: "Business not found"
        });
      }

      const service = business.serviceCategories.id(serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found"
        });
      }

      // Update fields
      if (title) service.title = title;
      if (description) service.description = description;
      if (hashtags) service.hashtags = hashtags;
      if (tags) service.tags = tags;
      if (price) service.price = price;
      if (duration) service.duration = duration;
      if (imageUrl) service.imageUrl = imageUrl;

      await business.save();

      return res.status(200).json({
        success: true,
        data: business,
        message: "Service category updated successfully"
      });
    } catch (error) {
      logger.error("Error updating service category:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error"
      });
    }
  },

  getAllServiceCategories: async (req, res) => {
    try {
      const { businessId } = req.params;

      const business = await Business.findById(businessId);
      if (!business) {
        return res.status(404).json({
          success: false,
          message: "Business not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: business.serviceCategories,
        message: "Service categories retrieved successfully"
      });
    } catch (error) {
      logger.error("Error retrieving service categories:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error"
      });
    }
  }
};
