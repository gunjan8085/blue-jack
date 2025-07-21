const Service = require("../models/services.model");
const mongoose = require("mongoose");

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Create a new service
exports.createService = async (req, res) => {
    try {
      const serviceData = req.body;
  
      // Validate required fields
      if (!serviceData.name || !serviceData.serviceType || !serviceData.category || !serviceData.duration) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: name, serviceType, category, and duration are required"
        });
      }
  
      // Validate ObjectId fields (only company needs validation now)
      if (serviceData.company && !isValidObjectId(serviceData.company)) {
        return res.status(400).json({
          success: false,
          message: "Invalid company ID"
        });
      }
  
      const service = new Service(serviceData);
      const savedService = await service.save();
  
      res.status(201).json({
        success: true,
        message: "Service created successfully",
        data: savedService
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: Object.values(error.errors).map(err => err.message)
        });
      }
  
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  };
  

// Get all services with filtering and pagination
exports.getAllServices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      company,
      category,
      serviceType,
      status = 'active',
      isOnline,
      availableFor,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (company && isValidObjectId(company)) {
      filter.company = company;
    }
    
    if (category && isValidObjectId(category)) {
      filter.category = category;
    }
    
    if (serviceType) {
      filter.serviceType = serviceType;
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (isOnline !== undefined) {
      filter.isOnline = isOnline === 'true';
    }
    
    if (availableFor) {
      filter.availableFor = availableFor;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with population
    const services = await Service.find(filter)
      .populate('company', 'name email')
      .populate('category', 'name description')
      .populate('teamMembers', 'name email position')
      .populate('resources', 'name type')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalServices = await Service.countDocuments(filter);
    const totalPages = Math.ceil(totalServices / parseInt(limit));

    res.status(200).json({
      success: true,
      data: services,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: totalServices,
        itemsPerPage: parseInt(limit),
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    const service = await Service.findById(id)
      .populate('company', 'name email phone address')
      .populate('category', 'name description')
      .populate('teamMembers', 'name email position skills')
      .populate('resources', 'name type description');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    // Handle file upload if exists
    if (req.file) {
      // Here you would typically upload the file to a storage service
      // For now, we'll just store the file path or URL
      updateData.imageUrl = `/uploads/services/${req.file.filename}`;
    }

    // Convert string values to appropriate types
    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.duration) updateData.duration = Number(updateData.duration);
    if (updateData.costOfService) updateData.costOfService = Number(updateData.costOfService);

    // Handle price object if needed
    if (updateData.price && typeof updateData.price === 'object') {
      if (updateData.price.amount) {
        updateData.price = {
          ...updateData.price,
          amount: Number(updateData.price.amount)
        };
      }
    }

    const service = await Service.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    )
    .populate('company', 'name email')
    .populate('category', 'name description')
    .populate('teamMembers', 'name email position')
    .populate('resources', 'name type');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Soft delete a service (set status to 'deleted')
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Hard delete a service (permanently remove from database)
exports.hardDeleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service permanently deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Archive a service
exports.archiveService = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { status: 'archived' },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service archived successfully",
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Restore a service (set status back to 'active')
exports.restoreService = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Service restored successfully",
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get services by company
exports.getServicesByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { status = 'active', page = 1, limit = 10 } = req.query;
    
    if (!isValidObjectId(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID"
      });
    }

    const filter = { company: companyId };
    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const services = await Service.find(filter)
      .populate('category', 'name description')
      .populate('teamMembers', 'name email position')
      .populate('resources', 'name type')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalServices = await Service.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: services,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalServices / parseInt(limit)),
        totalItems: totalServices,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get services by category
exports.getServicesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { status = 'active', page = 1, limit = 10 } = req.query;
    
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    const filter = { category: categoryId };
    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const services = await Service.find(filter)
      .populate('company', 'name email')
      .populate('category', 'name description')
      .populate('teamMembers', 'name email position')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalServices = await Service.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: services,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalServices / parseInt(limit)),
        totalItems: totalServices,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Search services
exports.searchServices = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const searchFilter = {
      status: 'active',
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { serviceType: { $regex: query, $options: 'i' } }
      ]
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const services = await Service.find(searchFilter)
      .populate('company', 'name email')
      .populate('category', 'name description')
      .populate('teamMembers', 'name email position')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalServices = await Service.countDocuments(searchFilter);

    res.status(200).json({
      success: true,
      data: services,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalServices / parseInt(limit)),
        totalItems: totalServices,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get service statistics
exports.getServiceStats = async (req, res) => {
  try {
    const { companyId } = req.query;
    
    let matchStage = {};
    if (companyId && isValidObjectId(companyId)) {
      matchStage.company = new mongoose.Types.ObjectId(companyId);
    }

    const stats = await Service.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalServices: { $sum: 1 },
          activeServices: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] }
          },
          archivedServices: {
            $sum: { $cond: [{ $eq: ["$status", "archived"] }, 1, 0] }
          },
          deletedServices: {
            $sum: { $cond: [{ $eq: ["$status", "deleted"] }, 1, 0] }
          },
          onlineServices: {
            $sum: { $cond: ["$isOnline", 1, 0] }
          },
          offlineServices: {
            $sum: { $cond: [{ $not: "$isOnline" }, 1, 0] }
          },
          freeServices: {
            $sum: { $cond: [{ $eq: ["$price.priceType", "free"] }, 1, 0] }
          },
          paidServices: {
            $sum: { $cond: [{ $ne: ["$price.priceType", "free"] }, 1, 0] }
          },
          averageDuration: { $avg: "$duration" },
          averagePrice: { $avg: "$price.amount" }
        }
      }
    ]);

    const servicesByCategory = await Service.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "servicecategories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      {
        $project: {
          categoryName: { $arrayElemAt: ["$categoryInfo.name", 0] },
          count: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalServices: 0,
          activeServices: 0,
          archivedServices: 0,
          deletedServices: 0,
          onlineServices: 0,
          offlineServices: 0,
          freeServices: 0,
          paidServices: 0,
          averageDuration: 0,
          averagePrice: 0
        },
        servicesByCategory
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Bulk update services
exports.bulkUpdateServices = async (req, res) => {
  try {
    const { serviceIds, updateData } = req.body;
    
    if (!Array.isArray(serviceIds) || serviceIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Service IDs array is required and cannot be empty"
      });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Update data is required"
      });
    }

    // Validate all service IDs
    const invalidIds = serviceIds.filter(id => !isValidObjectId(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid service IDs found",
        invalidIds
      });
    }

    const result = await Service.updateMany(
      { _id: { $in: serviceIds } },
      updateData,
      { runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Services updated successfully",
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};