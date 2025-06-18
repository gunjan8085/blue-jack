const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      notes: { type: String },
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// ✅ Use "Appoint" instead of "Appointment"
module.exports = mongoose.models.Appoint || mongoose.model("Appoint", appointSchema);
