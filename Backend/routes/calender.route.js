const router = require("express").Router();
const appointmentController = require("../controllers/appointment.controller");
const {
  authenticateBusinessToken,
} = require("../middlewares/authToken.middleware");
const { checkIsOwner } = require("../middlewares/checkBusinessApiAuth");

router.post(
  "/create-appointment-user",
  authenticateBusinessToken,
  appointmentController.createAppointmentByUser
);

router.post(
  "/create-appointment-employee",
  authenticateBusinessToken,
  //checkIsOwner,
  appointmentController.createAppointmentByEmployee
);

router.get(
  "/getAllAppointmentsByClientId/:clientId",
  authenticateBusinessToken,
  appointmentController.getAllAppointmentsByClientId
);

router.get(
  "/getAppointmentsByBusinessId/:businessId",
  authenticateBusinessToken,
  appointmentController.getAppointmentsByBusinessId
);

router.get(
  "/getAppointmentsByClientId/:clientId",
  authenticateBusinessToken,
  appointmentController.getAppointmentsByClientId
);

router.get(
  "/getAllAppointmentsByBusinessId/:businessId",
  authenticateBusinessToken,
  appointmentController.getAllAppointmentsByBusinessId
);

module.exports = router;
