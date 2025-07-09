const { Appointment, Business, PricingPlan } = require("../models/index");
const ApiError = require("../utils/apiError.util");
const mongoose = require("mongoose");
const cron = require('node-cron');
const { sendAppointmentReminderMail24h, sendAppointmentReminderMail1h } = require('./mail.service');

module.exports = {
  createAppointmentByUser: async (userId, data) => {
    try {
      // Check if business is active
      const business = await Business.findById(data.businessId);
      if (!business || !business.isActive) {
        throw new ApiError(403, "Business is not active or does not exist.");
      }
      // Create appointment
      const appointment = await Appointment.create({
        bookedBy: new mongoose.Types.ObjectId(String(userId)),
        bookedByType: "User",
        clientId: new mongoose.Types.ObjectId(String(userId)),
        bookedService: new mongoose.Types.ObjectId(String(data.serviceId)),
        businessId: new mongoose.Types.ObjectId(String(data.businessId)),
        startAt: new Date(data.startAt),
        endAt: data.endAt ? new Date(data.endAt) : new Date(),
        isFirstVisit: data.isFirstVisit,
        discountCode: data.discountCode,
        amount: data.amount,
        notes: data.notes,
        status: data.status ?? "booked",
      });
      // Increment appointmentCount and check quota
      business.appointmentCount = (business.appointmentCount || 0) + 1;
      // If no subscription and count >= 100, deactivate
      if (!business.subscriptionPlan && business.appointmentCount >= 100) {
        business.isActive = false;
      }
      await business.save();
      return appointment;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  createAppointmentByBusiness: async (userId, data) => {
    try {
      // Check if business is active
      const business = await Business.findById(data.businessId);
      if (!business || !business.isActive) {
        throw new ApiError(403, "Business is not active or does not exist.");
      }
      // Create appointment
      const appointment = await Appointment.create({
        bookedBy: new mongoose.Types.ObjectId(String(userId)),
        bookedByType: "Employee",
        clientId: new mongoose.Types.ObjectId(String(userId)),
        bookedService: new mongoose.Types.ObjectId(String(data.serviceId)),
        businessId: new mongoose.Types.ObjectId(String(data.businessId)),
        startAt: new Date(data.startAt),
        endAt: data.endAt ? new Date(data.endAt) : new Date(),
        isFirstVisit: data.isFirstVisit,
        discountCode: data.discountCode,
        amount: data.amount,
        notes: data.notes,
        status: data.status ?? "booked",
      });
      // Increment appointmentCount and check quota
      business.appointmentCount = (business.appointmentCount || 0) + 1;
      // If no subscription and count >= 100, deactivate
      if (!business.subscriptionPlan && business.appointmentCount >= 100) {
        business.isActive = false;
      }
      await business.save();
      return appointment;
    } catch (error) {
      throw new ApiError(500, error.message, error);
    }
  },

  getAppointmentsByClientId: async (clientId, page = 1, limit = 10) => {
    try {
      const skip = (page - 1) * limit;

      const appointments = await Appointment.find({
        clientId: new mongoose.Types.ObjectId(String(clientId)),
      })
        .populate("bookedService", "name serviceType duration price")
        .populate("businessId", "brandName thumbnail")
        .populate("bookedWith", "name profilePicUrl")
        .sort({ startAt: -1 }) // Sort by start time, newest first
        .skip(skip)
        .limit(limit);

      const total = await Appointment.countDocuments({
        clientId: new mongoose.Types.ObjectId(String(clientId)),
      });

      return {
        appointments,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new ApiError(
        500,
        "Error fetching client appointments: " + error.message,
        error
      );
    }
  },

  getAppointmentsByBusinessId: async (
    businessId,
    page = 1,
    limit = 10,
    filters = {}
  ) => {
    try {
      const skip = (page - 1) * limit;

      // Build filter object
      const filterQuery = {
        businessId: new mongoose.Types.ObjectId(String(businessId)),
      };

      // Add optional filters
      if (filters.status) {
        filterQuery.status = filters.status;
      }
      if (filters.startDate && filters.endDate) {
        filterQuery.startAt = {
          $gte: new Date(filters.startDate),
          $lte: new Date(filters.endDate),
        };
      }
      if (filters.bookedWith) {
        filterQuery.bookedWith = new mongoose.Types.ObjectId(
          String(filters.bookedWith)
        );
      }

      const appointments = await Appointment.find(filterQuery)
        .populate("bookedService", "name serviceType duration price")
        .populate("clientId", "name email phoneNumber")
        .populate("bookedWith", "name profilePicUrl")
        .sort({ startAt: -1 }) // Sort by start time, newest first
        .skip(skip)
        .limit(limit);

      const total = await Appointment.countDocuments(filterQuery);

      return {
        appointments,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new ApiError(
        500,
        "Error fetching business appointments: " + error.message,
        error
      );
    }
  },

  getAllAppointmentsByClientId: async (clientId) => {
    try {
      const appointments = await Appointment.find({
        clientId: new mongoose.Types.ObjectId(String(clientId)),
      })
        .populate("bookedService", "name serviceType duration price")
        .populate("businessId", "brandName thumbnail")
        .populate("bookedWith", "name profilePicUrl")
        .sort({ startAt: -1 }); // Sort by start time, newest first

      return appointments;
    } catch (error) {
      throw new ApiError(
        500,
        "Error fetching client appointments: " + error.message,
        error
      );
    }
  },

  getAllAppointmentsByBusinessId: async (businessId, filters = {}) => {
    try {
      // Build filter object
      const filterQuery = {
        businessId: new mongoose.Types.ObjectId(String(businessId)),
      };

      // Add optional filters
      if (filters.status) {
        filterQuery.status = filters.status;
      }
      if (filters.startDate && filters.endDate) {
        filterQuery.startAt = {
          $gte: new Date(filters.startDate),
          $lte: new Date(filters.endDate),
        };
      }
      if (filters.bookedWith) {
        filterQuery.bookedWith = new mongoose.Types.ObjectId(
          String(filters.bookedWith)
        );
      }

      const appointments = await Appointment.find(filterQuery)
        .populate("bookedService", "name serviceType duration price")
        .populate("clientId", "name email phoneNumber")
        .populate("bookedWith", "name profilePicUrl")
        .sort({ startAt: -1 }); // Sort by start time, newest first

      return appointments;
    } catch (error) {
      throw new ApiError(
        500,
        "Error fetching business appointments: " + error.message,
        error
      );
    }
  },
};

// Helper to schedule reminders
function scheduleAppointmentReminders(appointment) {
  const {
    customer,
    businessName,
    serviceName,
    staffName,
    date, // expected to be a string or Date
    time, // expected to be a string
    location,
  } = appointment;

  // Parse appointment datetime
  const appointmentDateTime = new Date(`${date} ${time}`);
  const now = new Date();

  // 24h reminder
  const reminder24h = new Date(appointmentDateTime.getTime() - 24 * 60 * 60 * 1000);
  if (reminder24h > now) {
    cron.schedule(reminder24h, () => {
      sendAppointmentReminderMail24h(
        customer.email,
        customer.name,
        businessName,
        serviceName,
        staffName,
        date,
        time,
        location
      ).catch((err) => console.error('24h reminder email error:', err));
    });
  }

  // 1h reminder
  const reminder1h = new Date(appointmentDateTime.getTime() - 1 * 60 * 60 * 1000);
  if (reminder1h > now) {
    cron.schedule(reminder1h, () => {
      sendAppointmentReminderMail1h(
        customer.email,
        customer.name,
        businessName,
        serviceName,
        staffName,
        date,
        time,
        location
      ).catch((err) => console.error('1h reminder email error:', err));
    });
  }
}

// Export the helper for use in controller or wherever appointment is created
module.exports.scheduleAppointmentReminders = scheduleAppointmentReminders;
