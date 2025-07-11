const Appointment = require("../models/appoint.model");
const Business = require("../models/business.model");
const { ApiError } = require("../utils/apiError.util");
const mongoose = require("mongoose");

module.exports = {
  getCustomerVisitHistory: async (businessId, page = 1, limit = 10, sortBy = "recent") => {
    try {
      const skip = (page - 1) * limit;

      // Define sort options
      let sortOption = {};
      switch (sortBy) {
        case "name":
          sortOption = { "customer.name": 1 };
          break;
        case "visits":
          sortOption = { visitCount: -1 };
          break;
        case "spent":
          sortOption = { totalSpent: -1 };
          break;
        case "recent":
        default:
          sortOption = { lastVisit: -1 };
      }

      // Aggregate to get customer visit history
      const customers = await Appointment.aggregate([
        { $match: { business: new mongoose.Types.ObjectId(businessId) } },

        // Group by customer email
        {
          $group: {
            _id: "$customer.email",
            customer: { $first: "$customer" },
            lastVisit: { $max: "$createdAt" },
            firstVisit: { $min: "$createdAt" },
            visitCount: { $sum: 1 },
            totalSpent: { $sum: "$service.price" },
          }
        },

        // Join with User collection using customer email
        {
          $lookup: {
            from: "users", // collection name in MongoDB
            localField: "_id", // _id is customer email
            foreignField: "email",
            as: "userInfo"
          }
        },
        { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } },

        { $sort: sortOption },
        { $skip: skip },
        { $limit: limit },

        // Final projection
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: "$customer.name",
            email: "$customer.email",
            phone: "$customer.phone",
            profilePicUrl: "$userInfo.profilePicUrl", // 💡 from User model
            lastVisit: 1,
            firstVisit: 1,
            visitCount: 1,
            totalSpent: 1,
            favoriteService: 1,
            notes: "$customer.notes"
          }
        }
      ]);

      // Get total count for pagination
      const total = await Appointment.aggregate([
        { $match: { business: new mongoose.Types.ObjectId(businessId) } },
        { $group: { _id: "$customer.email" } },
        { $count: "total" }
      ]);

      return {
        customers,
        pagination: {
          total: total[0]?.total || 0,
          page,
          limit,
          totalPages: Math.ceil((total[0]?.total || 0) / limit)
        }
      };
    } catch (error) {
      throw new ApiError(500, "Error fetching customer visit history: " + error.message, error);
    }
  },

  getTopCustomers: async (businessId, limit = 5) => {
    try {
      return await Appointment.aggregate([
        { $match: { business: new mongoose.Types.ObjectId(businessId) } },
        {
          $group: {
            _id: "$customer.email",
            name: { $first: "$customer.name" },
            email: { $first: "$customer.email" },
            phone: { $first: "$customer.phone" },
            visitCount: { $sum: 1 },
            totalSpent: { $sum: "$service.price" },
            lastVisit: { $max: "$createdAt" }
          }
        },
        { $sort: { totalSpent: -1 } },
        { $limit: limit },
        {
          $project: {
            _id: 0,
            email: "$_id",
            name: 1,
            phone: 1,
            visitCount: 1,
            totalSpent: 1,
            lastVisit: 1
          }
        }
      ]);
    } catch (error) {
      throw new ApiError(500, "Error fetching top customers: " + error.message, error);
    }
  }
};