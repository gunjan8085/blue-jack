
const router = require("express").Router();
const appointController = require("../controllers/appoint.controller");

// POST /api/v1/appointments/:businessId/create
router.post("/:businessId/create", appointController.createAppointment);

// GET /api/v1/appointments/:businessId
router.get("/:businessId", appointController.getAppointmentsForBusiness);

module.exports = router;
