const mongoose = require("mongoose");

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  features: [{ type: String }],
  appointmentLimit: { type: Number, default: null }, // null = unlimited
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("PricingPlan", pricingPlanSchema); 