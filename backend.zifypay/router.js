const express = require("express");
const router = express.Router();

const userRoutes = require("./routes/user.route");
const businessRoutes = require("./routes/business.route");
const catalogRoutes = require("./routes/catalog.route");
const calenderRoutes = require("./routes/calender.route");
const homeRoutes = require("./routes/home.route");
// const businessRoutes = require("./routes/business.route");
const serviceCategoriesRoutes = require("./routes/serviceCategories.route");
const employeeRoutes = require("./routes/employee.route");
// const serviceRoutes = require("./routes/services.route")
const appointRoutes = require("./routes/appoint.route");
const platformReviewRoutes = require("./routes/platformReview.route");
const jobRoutes = require("./routes/job.route");
const applicationRoutes = require("./routes/application.route");
const adminRoutes = require("./routes/admin.route");
const pricingPlanRoutes = require("./routes/pricingPlan.route");


// Base Routes
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/businesses", businessRoutes);
router.use("/api/v1/business", businessRoutes);
// router.use("/api/v1/employee", employeeRoutes);
router.use("/api/v1/catalog", catalogRoutes);
router.use("/api/v1/calender", calenderRoutes);
router.use("/api/v1/home", homeRoutes);
router.use("/api/v1/employee", employeeRoutes);
// router.use("/api/v1/services", serviceRoutes);
const serviceRoutes = require("./routes/services.route")
router.use("/api/v1/services", serviceRoutes);
router.use("/api/v1/service-categories", serviceCategoriesRoutes);
router.use("/api/v1/appointments", appointRoutes);
router.use("/api/v1/platform-reviews", platformReviewRoutes);
router.use("/api/v1/jobs", jobRoutes);
router.use("/api/v1/applications", applicationRoutes);
router.use("/api/v1/admin", adminRoutes);
router.use("/api/pricing-plan", pricingPlanRoutes);

module.exports = router;

