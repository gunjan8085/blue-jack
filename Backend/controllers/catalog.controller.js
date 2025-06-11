const catalogService = require("../services/catalog.service");
const { SERVICE_TYPES } = require("../configs/constants.config");

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await catalogService.getAllCategories();

      res.json({
        data: categories,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching all categories:", error);
      next(error);
    }
  },

  getMyServices: async (req, res, next) => {
    try {
      const businessId = req.owner.jobProfile.company;
      console.log(businessId);

      const categories = await catalogService.getMyServices(businessId);

      res.json({
        data: categories,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching business categories:", error);
      next(error);
    }
  },

  getServiceById: async (req, res, next) => {
    try {
      const serviceId = req.params.serviceId;

      const service = await catalogService.getServiceById(serviceId);

      res.json({
        data: service,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching service details:", error);
      next(error);
    }
  },

  getServiceTypes: async (req, res, next) => {
    try {
      res.json({
        data: SERVICE_TYPES,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching business categories:", error);
      next(error);
    }
  },

  createCategory: async (req, res, next) => {
    try {
      const response = await catalogService.createCategory(req.body);

      res.status(201).json({
        data: response,
        success: true,
      });
    } catch (error) {
      console.error("Error creating category:", error);
      next(error);
    }
  },

  createResource: async (req, res, next) => {
    try {
      const businessId = req.owner.jobProfile.company;
      req.body["company"] = businessId;

      const response = await catalogService.createResource(req.body);

      res.status(201).json({
        data: response,
        success: true,
      });
    } catch (error) {
      console.error("Error creating resource:", error);
      next(error);
    }
  },

  createService: async (req, res, next) => {
    try {
      const businessId = req.owner.jobProfile.company;
      req.body["company"] = businessId;

      const service = await catalogService.createService(req.body);

      res.status(201).json({
        data: service,
        success: true,
      });
    } catch (error) {
      console.error("Error creating service:", error);
      next(error);
    }
  },
};
