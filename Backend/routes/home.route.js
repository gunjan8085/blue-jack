const homeController = require("../controllers/home.controller");
const {
  authenticateBusinessToken,
} = require("../middlewares/authToken.middleware");
const { checkIsOwner } = require("../middlewares/checkBusinessApiAuth");
const router = require("express").Router();

router.get(
  "/getAllUpcomingAppointments/:fromDate/:toDate",
  authenticateBusinessToken,
  checkIsOwner,
  homeController.getAllUpcomingAppointments
);

router.get(
  "/getTopServicesOverPeriod/:fromDate/:toDate",
  authenticateBusinessToken,
  checkIsOwner,
  homeController.getTopServicesOverPeriod
);

module.exports = router;
