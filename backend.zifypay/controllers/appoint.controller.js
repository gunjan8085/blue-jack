// const Appointment = require("../models/appoint.model");
const Appoint = require("../models/appoint.model");

const Business = require("../models/business.model");
const Service = require("../models/services.model");
const Employee = require("../models/employee.model");

const createAppointment = async (req, res, next) => {
  try {
    const { businessId } = req.params;
    const { service, staff, date, time, customer } = req.body;

    // Basic checks
    if (!service || !staff || !date || !time || !customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const appointment = await Appoint.create({
      business: businessId,
      service,
      staff,
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

module.exports = {
  createAppointment,
  getAppointmentsForBusiness,
};
