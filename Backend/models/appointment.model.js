const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "bookedByType",
    },
    bookedByType: {
      type: String,
      required: true,
      enum: ["User", "Employee"],
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookedService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    bookedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: Date,
    isFirstVisit: {
      type: Boolean,
      default: false,
    },
    discountCode: String,
    amount: Number,
    notes: String,
    status: {
      type: String,
      enum: [
        "booked",
        "waitlist",
        "confirmed",
        "completed",
        "cancelled",
        "rescheduled",
        "no-show",
      ],
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
