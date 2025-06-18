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

    const appointments = await Appoint.find({ business: businessId })
      .populate("service", "name")
      .populate("staff", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAppointment,
  getAppointmentsForBusiness,
};
