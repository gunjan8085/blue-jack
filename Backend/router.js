const express = require("express");
const router = express.Router();

const userRoutes = require("./routes/user.route");
const businessRoutes = require("./routes/business.route");
const employeeRoutes = require("./routes/employee.route");
const catalogRoutes = require("./routes/catalog.route");
const calenderRoutes = require("./routes/calender.route");
const homeRoutes = require("./routes/home.route");

// Base Routes
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/business", businessRoutes);
router.use("/api/v1/employee", employeeRoutes);
router.use("/api/v1/catalog", catalogRoutes);
router.use("/api/v1/calender", calenderRoutes);
router.use("/api/v1/home", homeRoutes);

module.exports = router;
