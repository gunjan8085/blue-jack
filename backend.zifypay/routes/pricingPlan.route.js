const express = require("express");
const router = express.Router();
const pricingPlanController = require("../controllers/pricingPlan.controller");

// Create a new pricing plan
router.post("/", pricingPlanController.createPricingPlan);

module.exports = router; 