const businessService = require("../services/business.service");
const logger = require("../utils/logger.util");

module.exports = {
  registerNewBusiness: async (req, res) => {
    try {
      const business = await businessService.registerNewBusiness(req.body);
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
  }
};
