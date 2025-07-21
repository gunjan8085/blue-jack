const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
    hasReview: { type: Boolean, default: false },
    review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    paymentStatus:  {
      type: String,
      enum: ["pending", "failed", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Add unique index to prevent double bookings (except cancelled)
appointSchema.index(
  { staff: 1, date: 1, time: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: "cancelled" } } }
);

// ✅ Use "Appoint" instead of "Appointment"
module.exports = mongoose.models.Appoint || mongoose.model("Appoint", appointSchema);
