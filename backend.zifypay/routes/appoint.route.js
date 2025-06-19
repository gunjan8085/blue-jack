const router = require("express").Router();
const appointController = require("../controllers/appoint.controller");

// POST /api/v1/appointments/:businessId/create
router.post("/:businessId/create", appointController.createAppointment);

// GET /api/v1/appointments/:businessId
router.get("/:businessId", appointController.getAppointmentsForBusiness);

// GET /api/v1/appointments/:businessId/total-bookings
router.get("/:businessId/total-bookings", appointController.getTotalBookings);

// GET /api/v1/appointments/:businessId/monthly-revenue
router.get("/:businessId/monthly-revenue", appointController.getMonthlyRevenue);

// GET /api/v1/appointments/:businessId/today
router.get("/:businessId/today", appointController.getTodaysAppointments);

// GET /api/v1/appointments/:businessId/recent
router.get("/:businessId/recent", appointController.getRecentBookings);

module.exports = router;
