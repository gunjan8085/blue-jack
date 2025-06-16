const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    name: { type: String, required: true },
    serviceType: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCategory",
      required: true,
    },
    description: { type: String },
    price: {
      priceType: {
        type: String,
        default: "fixed",
        enum: ["free", "from", "fixed"],
      },
      amount: { type: Number },
    },
    duration: { type: Number, required: true }, // in minutes
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    resourcesRequired: { type: Boolean, default: false },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
    availableFor: {
      type: String,
      default: "all",
      enum: ["male", "female", "all"],
    },
    isOnline: { type: Boolean, default: false },
    status: {
      type: String,
      default: "active",
      enum: ["active", "archived", "deleted"],
    },
    rebookReminderAfter: {
      count: { type: Number },
      period: { type: String, default: "days", enum: ["days", "weeks"] },
    },
    costOfService: { type: Number, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
