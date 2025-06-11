const { Appointment } = require("../models/index");
const ApiError = require("../utils/apiError.util");

module.exports = {
  getAllUpcomingAppointments: async (fromDate, toDate) => {
    try {
      const appointments = await Appointment.find({
        startAt: {
          $gte: fromDate,
          $lte: toDate,
        },
      }).populate([
        { path: "clientId", select: "name email phoneNumber" },
        { path: "bookedService", select: "name duration price" },
        { path: "bookedBy", select: "name" },
        { path: "bookedWith", select: "name" },
        { path: "businessId", select: "brandName" },
      ]);

      return appointments;
    } catch (error) {
      throw new ApiError(
        500,
        "Error fetching client appointments: " + error.message,
        error
      );
    }
  },

  getTopServicesOverPeriod: async (fromDate, toDate) => {
    try {
      const topServices = await Appointment.aggregate([
        // Match appointments within the date range
        {
          $match: {
            startAt: {
              $gte: fromDate,
              $lte: toDate,
            },
          },
        },
        // Group by service and count occurrences
        {
          $group: {
            _id: "$bookedService",
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
        // Sort by count in descending order
        {
          $sort: { count: -1 },
        },
        // Lookup service details
        {
          $lookup: {
            from: "services",
            localField: "_id",
            foreignField: "_id",
            as: "serviceDetails",
          },
        },
        // Unwind the service details array
        {
          $unwind: "$serviceDetails",
        },
        // Project the final result
        {
          $project: {
            _id: 0,
            serviceId: "$_id",
            serviceName: "$serviceDetails.name",
            serviceDuration: "$serviceDetails.duration",
            servicePrice: "$serviceDetails.price.amount",
            bookingCount: "$count",
            totalRevenue: "$totalAmount",
          },
        },
      ]);

      return topServices;
    } catch (error) {
      throw new ApiError(
        500,
        "Error fetching top services: " + error.message,
        error
      );
    }
  },
};
