// const Appointment = require("../models/appoint.model");
const Appoint = require("../models/appoint.model");

const Business = require("../models/business.model");
const Service = require("../models/services.model");
const Employee = require("../models/employee.model");

const createAppointment = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { service, staff, date, time, customer, user } = req.body;

    // Basic checks
    if (!service || !staff || !date || !time || !customer?.name || !customer?.email || !customer?.phone || !user) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const appointment = await Appoint.create({
      business: businessId,
      service,
      staff,
      user,
      date,
      time,
      customer,
    });

    res.status(201).json({ success: true, message: "Appointment booked", data: appointment });
  } catch (err) {
    console.error("Create appointment error:", err);
    next(err);
  }
};

const getAppointmentsForBusiness = async (req, res, next) => {
  try {
    const { businessId } = req.params;

    // First, get the business to access serviceCategories
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    // Create a map of service ObjectIds to service titles
    const serviceMap = {};
    business.serviceCategories.forEach((service, index) => {
      // Use the index as the ObjectId since serviceCategories is an embedded array
      serviceMap[index] = service.title;
    });

    const appointments = await Appoint.find({ business: businessId })
      .populate("staff", "name")
      .sort({ createdAt: -1 });

    // Map the appointments to include service titles
    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      
      // If service is a number (index), get the title from serviceMap
      if (typeof appointment.service === 'number' && serviceMap[appointment.service]) {
        appointmentObj.service = {
          _id: appointment.service,
          title: serviceMap[appointment.service]
        };
      } else if (appointment.service) {
        // If service is an ObjectId string, try to find it in serviceCategories
        const serviceIndex = business.serviceCategories.findIndex(
          (_, index) => index.toString() === appointment.service.toString()
        );
        if (serviceIndex !== -1) {
          appointmentObj.service = {
            _id: appointment.service,
            title: business.serviceCategories[serviceIndex].title
          };
        } else {
          appointmentObj.service = null;
        }
      } else {
        appointmentObj.service = null;
      }

      return appointmentObj;
    });

    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });
  } catch (err) {
    console.error("Error fetching appointments:", err);
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

    // Find all appointments for this business in the current month
    const appointments = await Appoint.find({
      business: businessId,
      createdAt: { $gte: firstDay, $lte: lastDay },
      status: { $ne: "cancelled" },
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

// Get today's appointments for a business
const getTodaysAppointments = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    const serviceMap = {};
    business.serviceCategories.forEach((service, index) => {
      serviceMap[index] = service.title;
    });

    const appointments = await Appoint.find({ business: businessId, date: todayStr })
      .populate("staff", "name")
      .sort({ time: 1 });

    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      if (typeof appointment.service === 'number' && serviceMap[appointment.service]) {
        appointmentObj.service = {
          _id: appointment.service,
          title: serviceMap[appointment.service]
        };
      } else if (appointment.service) {
        const serviceIndex = business.serviceCategories.findIndex(
          (_, index) => index.toString() === appointment.service.toString()
        );
        if (serviceIndex !== -1) {
          appointmentObj.service = {
            _id: appointment.service,
            title: business.serviceCategories[serviceIndex].title
          };
        } else {
          appointmentObj.service = null;
        }
      } else {
        appointmentObj.service = null;
      }
      return appointmentObj;
    });

    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });
  } catch (err) {
    console.error("Error fetching today's appointments:", err);
    next(err);
  }
};

// Get recent bookings for a business (last 5)
const getRecentBookings = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }
    const serviceMap = {};
    business.serviceCategories.forEach((service, index) => {
      serviceMap[index] = service.title;
    });
    const appointments = await Appoint.find({ business: businessId })
      .populate("staff", "name")
      .sort({ createdAt: -1 })
      .limit(5);
    const appointmentsWithServiceTitles = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      if (typeof appointment.service === 'number' && serviceMap[appointment.service]) {
        appointmentObj.service = {
          _id: appointment.service,
          title: serviceMap[appointment.service]
        };
      } else if (appointment.service) {
        const serviceIndex = business.serviceCategories.findIndex(
          (_, index) => index.toString() === appointment.service.toString()
        );
        if (serviceIndex !== -1) {
          appointmentObj.service = {
            _id: appointment.service,
            title: business.serviceCategories[serviceIndex].title
          };
        } else {
          appointmentObj.service = null;
        }
      } else {
        appointmentObj.service = null;
      }
      return appointmentObj;
    });
    res.status(200).json({ success: true, data: appointmentsWithServiceTitles });
  } catch (err) {
    console.error("Error fetching recent bookings:", err);
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

module.exports = {
  createAppointment,
  getAppointmentsForBusiness,
  getTotalBookings,
  getMonthlyRevenue,
  getTodaysAppointments,
  getRecentBookings,
  getAppointmentsForCustomer,
  getAppointmentsForUser,
};
