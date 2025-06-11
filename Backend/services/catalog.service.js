const { ServiceCategory, Resource, Service } = require("../models/index");
const ApiError = require("../utils/apiError.util");

module.exports = {
  getAllCategories: async () => {
    try {
      const categories = await ServiceCategory.find().select("_id name").lean();
      return categories;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  createCategory: async (data) => {
    try {
      const category = await ServiceCategory.create(data);

      const response = {
        _id: category._id,
        name: category.name,
        description: category.description,
        appointmentColor: category.appointmentColor,
      };

      return response;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  getMyServices: async (businessId) => {
    try {
      const categories = await Service.find({ company: businessId })
        .select("name category price duration")
        .populate({
          path: "category",
          select: "name appointmentColor",
        });

      return categories;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  getServiceById: async (srviceId) => {
    try {
      const categories = await Service.findById(srviceId)
        .select("-__v -createdAt -updatedAt -company")
        .populate({
          path: "category",
          select: "-__v -createdAt -updatedAt",
        })
        .populate({
          path: "teamMembers",
          select: "name",
          populate: {
            path: "jobProfile",
            select: "jobTitle",
          },
        })
        .populate({
          path: "resources",
          select: "-__v -createdAt -updatedAt -company",
        });

      return categories;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  createResource: async (data) => {
    try {
      const resource = await Resource.create(data);

      const response = {
        _id: resource._id,
        name: resource.name,
        description: resource.description,
      };

      return response;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  createService: async (serviceData) => {
    try {
      const service = await Service.create(serviceData);

      delete service._doc.createdAt;
      delete service._doc.updatedAt;
      delete service._doc.__v;

      return service;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },
};
