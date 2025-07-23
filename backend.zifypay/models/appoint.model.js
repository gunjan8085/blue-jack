const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }, // Not required for blocks
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Not required for blocks
    customer: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      notes: { type: String },
    },
    date: { type: String, required: true },
    time: { type: String }, // For appointments (single slot)
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "blocked"],  // Added blocked status
      default: "pending",
    },
    hasReview: { type: Boolean, default: false },
    review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
    paymentStatus: {
      type: String,
      enum: ["pending", "failed", "completed"],
      default: "pending",
    },
    type: { type: String, enum: ["appointment", "block"], default: "appointment" }, // Block support
    reason: { type: String }, // For block (e.g., leave)
    startTime: { type: String }, // For block range (HH:mm)
    endTime: { type: String },   // For block range (HH:mm)
  },
  { timestamps: true }
);

// Add unique index to prevent double bookings (except cancelled)
appointSchema.index(
  { staff: 1, date: 1, time: 1 },
  { unique: true, partialFilterExpression: { status: { $ne: "cancelled" }, status: { $ne: "blocked" } } } // Exclude blocked slots from uniqueness check
);

module.exports = mongoose.models.Appoint || mongoose.model("Appoint", appointSchema);
