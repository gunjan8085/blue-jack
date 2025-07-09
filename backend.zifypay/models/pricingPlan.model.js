const mongoose = require("mongoose");

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  features: [{ type: String }],
  appointmentLimit: { type: Number, default: 100 }, // null = unlimited
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("PricingPlan", pricingPlanSchema); 