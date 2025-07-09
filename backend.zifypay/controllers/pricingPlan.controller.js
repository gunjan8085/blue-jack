const PricingPlan = require("../models/pricingPlan.model");

exports.createPricingPlan = async (req, res) => {
  try {
    const plan = await PricingPlan.create(req.body);
    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}; 