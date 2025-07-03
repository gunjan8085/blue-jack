const router = require("express").Router();
const appointController = require("../controllers/appoint.controller");

// GET /api/v1/appointments/user?userId=...
router.get("/user", appointController.getAppointmentsForUser);
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

// GET /api/v1/appointments/customer?email=...
router.get("/customer", appointController.getAppointmentsForCustomer);

// PATCH /api/v1/appointments/:appointmentId/status
router.patch('/:appointmentId/status', appointController.updateAppointmentStatus);

// GET /api/v1/appointments/:businessId/today-revenue
router.get('/:businessId/today-revenue', appointController.getTodaysRevenue);
// GET /api/v1/appointments/:businessId/today-bookings
router.get('/:businessId/today-bookings', appointController.getTodaysBookingsCount);

// GET /api/v1/appointments/:businessId/total-customers
router.get('/:businessId/total-customers', appointController.getTotalCustomers);

// GET /api/v1/appointments/user/completed?userId=...
router.get("/user/completed", appointController.getCompletedAppointmentsForUser);

// GET /api/v1/appointments/customer/completed?email=...
router.get("/customer/completed", appointController.getCompletedAppointmentsForCustomerByEmail);

// GET /api/v1/appointments/:businessId/average-rating
router.get('/:businessId/average-rating', appointController.getAverageRating);

// GET /api/v1/appointments/:businessId/customer-satisfaction
router.get('/:businessId/customer-satisfaction', appointController.getCustomerSatisfaction);

module.exports = router;
