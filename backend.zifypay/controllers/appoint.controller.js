// const Appointment = require("../models/appoint.model");
const Appoint = require("../models/appoint.model");

const Business = require("../models/business.model");
const Service = require("../models/services.model");
const Employee = require("../models/employee.model");
const { log } = require("console");
const { sendAppointmentMail } = require("../services/mail.service");
const customerService = require("../services/customer.service");
const { scheduleAppointmentReminders } = require("../services/appointment.service");

const createAppointment = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { service, staff, date, time, customer, user } = req.body;

    // Basic checks
    if (!service || !staff || !date || !time || !customer?.name || !customer?.email || !customer?.phone || !user) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const trimmedTime = time.trim(); // Trim the time field to remove any extra spaces
    console.log("Raw time received:", time);
    console.log("Trimmed time:", trimmedTime);

    if (!timeRegex.test(trimmedTime)) {
      console.error("Invalid time format:", trimmedTime);
      return res.status(400).json({ success: false, message: "Invalid time value" });
    }

    // Normalize date and time
    const normalizedDate = date.trim(); // Trim the date field
    const normalizedTime = trimmedTime.padStart(5, '0'); // Ensure proper format (e.g., '09:00')

    // Logging for debugging
    console.log("Normalized date:", normalizedDate);
    console.log("Normalized time:", normalizedTime);

    // Double booking check
    const existing = await Appoint.findOne({
      staff,
      date: normalizedDate,
      time: normalizedTime,
      status: { $ne: "cancelled" },
    });
    console.log("Existing appointment found:", existing);
    if (existing) {
      return res.status(409).json({ success: false, message: "This slot is booked" });
    }

    const appointment = await Appoint.create({
      business: businessId,
      service,
      staff,
      user,
      date,
      time: normalizedTime,
      customer,
    });

    // Fetch business, service, staff details for email
    let business, serviceObj, staffObj;
    try {
      business = await require("../models/business.model").findById(businessId);
      serviceObj = await require("../models/services.model").findById(service);
      staffObj = await require("../models/employee.model").findById(staff);
    } catch (e) {
      console.error("Error fetching business/service/staff details:", e);
    }

    // Compose details for email
    const businessName = business?.brandName || business?.name || "Business";
    const serviceName = serviceObj?.name || "Service";
    const staffName = staffObj?.name || "Staff";
    const location = business?.address?.addressLine1
      ? `${business.address.addressLine1}, ${business.address.city}`
      : "";

    // Send appointment confirmation email (non-blocking)
    sendAppointmentMail(
      customer.email,
      customer.name,
      businessName,
      serviceName,
      staffName,
      normalizedDate,
      normalizedTime,
      location
    ).catch((err) => console.error("Appointment email error:", err));

    // Schedule appointment reminders
    scheduleAppointmentReminders({
      customer,
      businessName,
      serviceName,
      staffName,
      normalizedDate,
      normalizedTime,
      location,
    });

    res.status(201).json({ success: true, message: "Appointment booked", data: appointment });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "This slot is booked" });
    }
    console.error("Create appointment error:", err);
    next(err);
  }
};
const createAppointmentByBusiness = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { service, staff, date, time, customer, user } = req.body;

    // Basic checks
    if (!service || !staff || !date || !time || !customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({ success: false, message: "Invalid time value" });
    }

    // Check if user already exists with the same email or phone
    let existingUser;
    try {
      const User = require("../models/user.model");
      existingUser = await User.findOne({
        $or: [
          { email: customer.email },
          { phone: customer.phone }
        ]
      });
    } catch (e) {
      console.error('Error finding user:', e);
    }

    let userIdToUse = user;
    
    // If user doesn't exist, create a new one
    if (!existingUser) {
      try {
        const User = require("../models/user.model");
        const newUser = await User.create({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          // Add any other relevant fields from customer or user
        });
        userIdToUse = newUser._id;
      } catch (e) {
        console.error('Error creating user:', e);
        // Continue with the original user ID if creation fails
      }
    } else {
      userIdToUse = existingUser._id;
    }

    const appointment = await Appoint.create({
      business: businessId,
      service,
      staff,
      user: userIdToUse,
      date,
      time,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      },
    });

    // Fetch business, service, staff details for email
    let business, serviceObj, staffObj;
    try {
      business = await require("../models/business.model").findById(businessId);
      serviceObj = await require("../models/services.model").findById(service);
      staffObj = await require("../models/employee.model").findById(staff);
    } catch (e) {}

    // Compose details for email
    const businessName = business?.brandName || business?.name || "Business";
    const serviceName = serviceObj?.name || "Service";
    const staffName = staffObj?.name || "Staff";
    const location = business?.address?.addressLine1 ? `${business.address.addressLine1}, ${business.address.city}` : "";

    // Send appointment confirmation email (non-blocking)
    sendAppointmentMail(
      customer.email,
      customer.name,
      businessName,
      serviceName,
      staffName,
      date,
      time,
      location
    ).catch((err) => console.error('Appointment email error:', err));

    // Schedule appointment reminders
    scheduleAppointmentReminders({
      customer,
      businessName,
      serviceName,
      staffName,
      date,
      time,
      location
    });

    res.status(201).json({ success: true, message: "Appointment booked", data: appointment });
  } catch (err) {
    // Handle duplicate key error from unique index
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "This slot is booked" });
    }
    console.error("Create appointment error:", err);
    next(err);
  }
};

const getAppointmentsForBusiness = async (req, res, next) => {
  try {
    const { businessId } = req.params;

    console.log(`[INFO] Fetching business ${businessId}`);
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    console.log(`[INFO] Found ${business.serviceCategories.length} services (stored as categories)`);
    business.serviceCategories.forEach((s, i) => {
      console.log(` - [${i + 1}] ${s.title} (${s._id})`);
    });

    const appointments = await Appoint.find({ business: businessId })
      .populate("staff", "name")
      .sort({ createdAt: -1 });

    console.log(`[INFO] Fetched ${appointments.length} appointments`);

    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      const rawService = appointment.service;
      const appointmentServiceId = rawService?._id?.toString() || rawService?.toString();

      console.log(`\n[DEBUG] Processing Appointment ID: ${appointment._id}`);
      console.log(` - Customer: ${appointment.customer?.name}`);
      console.log(` - Service ID: ${appointmentServiceId}`);

      const matchedService = business.serviceCategories.find(
        s => s._id?.toString() === appointmentServiceId
      );

      if (!matchedService && appointmentServiceId) {
        console.warn(` ❌ No matching service for ${appointmentServiceId}`);
        console.log(' 🔍 Available service IDs:', business.serviceCategories.map(s => s._id?.toString()));
      } else {
        console.log(` ✅ Matched service: ${matchedService?.title}`);
      }

      appointmentObj.service = matchedService
        ? {
            _id: matchedService._id,
            title: matchedService.title,
            price: matchedService.price,
            duration: matchedService.duration
          }
        : null;

      return appointmentObj;
    });

    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });

  } catch (err) {
    console.error("[FATAL] Error fetching appointments:", err);
    next(err);
  }
};


// Get total bookings for a business
const getTotalBookings = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const total = await Appoint.countDocuments({ business: businessId });
    res.status(200).json({ success: true, totalBookings: total });
  } catch (err) {
    console.error("Error fetching total bookings:", err);
    next(err);
  }
};

// Get monthly revenue for a business
const getMonthlyRevenue = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // Fetch business to get serviceCategories (for price lookup)
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    // Find all appointments for this business in the current month with status 'completed'
    const appointments = await Appoint.find({
      business: businessId,
      createdAt: { $gte: firstDay, $lte: lastDay },
      status: "completed",
    });

    // Calculate revenue by summing the price of each appointment's service
    let revenue = 0;
    appointments.forEach((appointment) => {
      // Find the service in business.serviceCategories
      let price = 0;
      if (appointment.service) {
        // Try to match by index (if stored as index)
        if (typeof appointment.service === 'number' && business.serviceCategories[appointment.service]) {
          price = business.serviceCategories[appointment.service].price || 0;
        } else {
          // Try to match by ObjectId string (if stored as ObjectId)
          const serviceObj = business.serviceCategories.find((cat, idx) => {
            return idx.toString() === appointment.service.toString();
          });
          if (serviceObj) price = serviceObj.price || 0;
        }
      }
      revenue += price;
    });

    res.status(200).json({ success: true, monthlyRevenue: revenue });
  } catch (err) {
    console.error("Error calculating monthly revenue:", err);
    next(err);
  }
};


const getTodaysAppointments = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    console.log(`[INFO] Fetching business ${businessId}`);
    const business = await Business.findById(businessId);
    if (!business) {
      console.error(`[ERROR] Business ${businessId} not found`);
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    // Log available service categories (which are services in your case)
    console.log(`[INFO] Service Categories (acting as services): ${business.serviceCategories.length}`);
    business.serviceCategories.forEach((s, i) => {
      console.log(` - [${i + 1}] ${s.title} (${s._id})`);
    });

    const appointments = await Appoint.find({ business: businessId, date: todayStr })
      .populate("staff", "name")
      .sort({ time: 1 });

    console.log(`[INFO] Found ${appointments.length} appointments on ${todayStr}`);

    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      const rawService = appointment.service;
      const appointmentServiceId = rawService?._id?.toString() || rawService?.toString();

      console.log(`\n[DEBUG] Processing Appointment ID: ${appointment._id}`);
      console.log(` - Customer: ${appointment.customer?.name}`);
      console.log(` - Service ID in appointment: ${appointmentServiceId}`);

      let matchedService = business.serviceCategories.find(
        s => s._id?.toString() === appointmentServiceId
      );

      if (!matchedService && appointmentServiceId) {
        console.warn(` ❌ No matching service found for ID: ${appointmentServiceId}`);
        console.log(' 🔍 All available service IDs:', business.serviceCategories.map(s => s._id?.toString()));
      } else {
        console.log(` ✅ Matched service: ${matchedService?.title}`);
      }

      appointmentObj.service = matchedService
        ? {
            _id: matchedService._id,
            title: matchedService.title,
            price: matchedService.price,
            duration: matchedService.duration
          }
        : null;

      return appointmentObj;
    });

    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });

  } catch (err) {
    console.error("[FATAL] Error in getTodaysAppointments:", err);
    next(err);
  }
};


// Get recent bookings for a business (last 5)
// Get recent bookings for a business (last 5)
const getRecentBookings = async (req, res, next) => {
  try {
    const { businessId } = req.params;

    console.log(`[INFO] Fetching business ${businessId}`);
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    console.log(`[INFO] Found ${business.serviceCategories.length} service categories`);
    business.serviceCategories.forEach((s, i) => {
      console.log(` - [${i + 1}] ${s.title} (${s._id})`);
    });

    const appointments = await Appoint.find({ business: businessId })
      .populate("staff", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    console.log(`[INFO] Fetched ${appointments.length} recent appointments`);

    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      const rawService = appointment.service;
      const appointmentServiceId = rawService?._id?.toString() || rawService?.toString();

      console.log(`\n[DEBUG] Processing Appointment ID: ${appointment._id}`);
      console.log(` - Customer: ${appointment.customer?.name}`);
      console.log(` - Service ID: ${appointmentServiceId}`);

      const matchedService = business.serviceCategories.find(
        s => s._id?.toString() === appointmentServiceId
      );

      if (!matchedService && appointmentServiceId) {
        console.warn(` ❌ No matching service for ${appointmentServiceId}`);
        console.log(' 🔍 Available service IDs:', business.serviceCategories.map(s => s._id?.toString()));
      } else {
        console.log(` ✅ Matched service: ${matchedService?.title}`);
      }

      appointmentObj.service = matchedService
        ? {
            _id: matchedService._id,
            title: matchedService.title,
            price: matchedService.price,
            duration: matchedService.duration
          }
        : null;

      return appointmentObj;
    });

    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });

  } catch (err) {
    console.error("[FATAL] Error fetching recent bookings:", err);
    next(err);
  }
};


// Get appointments for a customer by email
const getAppointmentsForCustomer = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const appointments = await Appoint.find({ "customer.email": email })
      .populate("business", "name")
      .populate("service", "title")
      .populate("staff", "name")
      .sort({ date: -1, time: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    console.error("Error fetching customer appointments:", err);
    next(err);
  }
};

// Get appointments for a user by userId
const getAppointmentsForUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const appointments = await Appoint.find({ user: userId })
      .populate("business", "brandName thumbnail avgReview address")
      .populate("service", "name serviceType duration")
      .populate("staff", "name profilePicUrl")
      .sort({ date: -1, time: -1 });

    // Map to frontend expected format
    const mapped = appointments.map((apt) => {
      return {
        id: apt._id,
        businessName: apt.business?.brandName || "",
        serviceName: apt.service?.name || "",
        staffName: apt.staff?.name || "",
        date: apt.date,
        time: apt.time,
        status: apt.status,
        logo: apt.business?.thumbnail || "",
        category: apt.service?.serviceType || "",
        businessRating: apt.business?.avgReview || 0,
        duration: apt.service?.duration || 0,
        location: apt.business?.address ? `${apt.business.address.addressLine1}, ${apt.business.address.city}` : "",
        paymentAmount: apt.paymentAmount || 0,
        paymentStatus: apt.paymentStatus || "pending",
        userRating: apt.userRating || 0,
        userReview: apt.userReview || "",
      };
    });
    res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    console.error("Error fetching user appointments:", err);
    next(err);
  }
};

// Update appointment status by ID
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }
    const updated = await Appoint.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, message: "Status updated", data: updated });
  } catch (err) {
    console.error("Error updating appointment status:", err);
    next(err);
  }
};

// Get today's revenue for a business
const getTodaysRevenue = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }
    // Find all non-cancelled appointments for today
    const appointments = await Appoint.find({
      business: businessId,
      date: todayStr,
      status: { $ne: "cancelled" },
    });
    let revenue = 0;
    appointments.forEach((appointment) => {
      let price = 0;
      if (appointment.service) {
        // Try to match by index (if stored as index)
        if (typeof appointment.service === 'number' && business.serviceCategories[appointment.service]) {
          price = business.serviceCategories[appointment.service].price || 0;
        } else {
          // Try to match by ObjectId string (if stored as ObjectId)
          const serviceObj = business.serviceCategories.find((cat, idx) => {
            return idx.toString() === appointment.service.toString();
          });
          if (serviceObj) price = serviceObj.price || 0;
        }
      }
      revenue += price;
    });
    res.status(200).json({ success: true, todaysRevenue: revenue });
  } catch (err) {
    console.error("Error calculating today's revenue:", err);
    next(err);
  }
};

// Get today's bookings count for a business
const getTodaysBookingsCount = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const count = await Appoint.countDocuments({
      business: businessId,
      date: todayStr,
      status: { $ne: "cancelled" },
    });
    res.status(200).json({ success: true, bookingsToday: count });
  } catch (err) {
    console.error("Error calculating today's bookings count:", err);
    next(err);
  }
};

// Get total unique customers for a business
const getTotalCustomers = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    // Find all appointments for this business
    const appointments = await Appoint.find({ business: businessId });
    // Use a Set to collect unique customer emails
    const uniqueEmails = new Set();
    appointments.forEach(app => {
      if (app.customer && app.customer.email) {
        uniqueEmails.add(app.customer.email);
      }
    });
    res.status(200).json({ success: true, totalCustomers: uniqueEmails.size });
  } catch (err) {
    console.error("Error calculating total customers:", err);
    next(err);
  }
};

// Get completed appointments for a user by userId
const getCompletedAppointmentsForUser = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const appointments = await Appoint.find({ user: userId, status: "completed" })
      .populate("business", "brandName thumbnail avgReview address")
      .populate("service", "name serviceType duration")
      .populate("staff", "name profilePicUrl")
      .sort({ date: -1, time: -1 });

    // Map to frontend expected format
    const mapped = appointments.map((apt) => {
      return {
        id: apt._id,
        businessId: apt.business?._id?.toString() || "",
        businessName: apt.business?.brandName || "",
        service: apt.service?.name || "",
        staffName: apt.staff?.name || "",
        date: apt.date,
        time: apt.time,
        status: apt.status,
        logo: apt.business?.thumbnail || "",
        category: apt.service?.serviceType || "",
        businessRating: apt.business?.avgReview || 0,
        duration: apt.service?.duration || 0,
        location: apt.business?.address ? `${apt.business.address.addressLine1}, ${apt.business.address.city}` : "",
        paymentAmount: apt.paymentAmount || 0,
        paymentStatus: apt.paymentStatus || "pending",
        userRating: apt.userRating || 0,
        userReview: apt.userReview || "",
      };
    });
    res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    console.error("Error fetching completed user appointments:", err);
    next(err);
  }
};

// Get completed appointments for a customer by email
const getCompletedAppointmentsForCustomerByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    const appointments = await Appoint.find({ "customer.email": email, status: "completed" })
      .populate("business", "brandName thumbnail avgReview address")
      .populate("service", "name serviceType duration")
      .populate("staff", "name profilePicUrl")
      .sort({ date: -1, time: -1 });

    // Map to frontend expected format
    const mapped = appointments.map((apt) => {
      return {
        id: apt._id,
        businessId: apt.business?._id?.toString() || "",
        businessName: apt.business?.brandName || "",
        service: apt.service?.name || "",
        staffName: apt.staff?.name || "",
        date: apt.date,
        time: apt.time,
        status: apt.status,
        logo: apt.business?.thumbnail || "",
        category: apt.service?.serviceType || "",
        businessRating: apt.business?.avgReview || 0,
        duration: apt.service?.duration || 0,
        location: apt.business?.address ? `${apt.business.address.addressLine1}, ${apt.business.address.city}` : "",
        paymentAmount: apt.paymentAmount || 0,
        paymentStatus: apt.paymentStatus || "pending",
        userRating: apt.userRating || 0,
        userReview: apt.userReview || "",
      };
    });
    res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    console.error("Error fetching completed customer appointments:", err);
    next(err);
  }
};

// Get average rating for a business
const getAverageRating = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const reviews = await require('../models/review.model').find({ forBusiness: businessId });
    if (!reviews.length) {
      return res.status(200).json({ success: true, averageRating: 0 });
    }
    const totalStars = reviews.reduce((sum, r) => sum + (r.stars || 0), 0);
    const avg = totalStars / reviews.length;
    res.status(200).json({ success: true, averageRating: avg });
  } catch (err) {
    next(err);
  }
};

// Get customer satisfaction (percentage of 4 or 5 star reviews) for a business
const getCustomerSatisfaction = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const reviews = await require('../models/review.model').find({ forBusiness: businessId });
    if (!reviews.length) {
      return res.status(200).json({ success: true, customerSatisfaction: 0 });
    }
    const satisfiedCount = reviews.filter(r => r.stars >= 4).length;
    const percentage = (satisfiedCount / reviews.length) * 100;
    res.status(200).json({ success: true, customerSatisfaction: percentage });
  } catch (err) {
    next(err);
  }
};


const getCustomerVisitHistory = async (req, res, next) => {
    try {
      const { businessId } = req.params;
      const { page = 1, limit = 10, sortBy = "recent" } = req.query;

      const result = await customerService.getCustomerVisitHistory(
        businessId,
        parseInt(page),
        parseInt(limit),
        sortBy
      );

      res.json({
        success: true,
        data: result.customers,
        pagination: result.pagination
      });
    } catch (err) {
      next(new ApiError(500, "Failed to fetch customer visit history", err));
    }
  }

const getTopCustomers = async (req, res, next) => {
    try {
      const { businessId } = req.params;
      const { limit = 5 } = req.query;

      const topCustomers = await customerService.getTopCustomers(
        businessId,
        parseInt(limit)
      );

      res.json({
        success: true,
        data: topCustomers
      });
    } catch (err) {
      next(new ApiError(500, "Failed to fetch top customers", err));
    }
  }

// Get all booked times for a staff member on a given date
const getBookedTimesForEmployee = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const { date } = req.query;
    if (!staffId || !date) {
      return res.status(400).json({ success: false, message: "Missing staffId or date" });
    }
    const appointments = await Appoint.find({
      staff: staffId,
      date,
      status: { $ne: "cancelled" }
    }).select("time");
    const bookedTimes = appointments.map(a => a.time);
    res.json({ success: true, data: bookedTimes });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAppointment,
  getAppointmentsForBusiness,
  getTotalBookings,
  getMonthlyRevenue,
  getTodaysAppointments,
  getRecentBookings,
  getAppointmentsForCustomer,
  getAppointmentsForUser,
  updateAppointmentStatus,
  getTodaysRevenue,
  getTodaysBookingsCount,
  getTotalCustomers,
  getCompletedAppointmentsForUser,
  getCompletedAppointmentsForCustomerByEmail,
  getAverageRating,
  getCustomerSatisfaction,
  getCustomerVisitHistory,
  getTopCustomers,
  createAppointmentByBusiness,
  getBookedTimesForEmployee
};
