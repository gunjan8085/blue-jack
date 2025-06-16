const mongoose = require("mongoose");

const jobProfileSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    jobTitle: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: null },
    status: {
      type: String,
      default: "pending_invite",
      enum: [
        "pending_invite",
        "accepted",
        "rejected",
        "over",
        "archived",
        "expired",
      ],
    },
    employmentType: {
      type: String,
      enum: ["employee", "self-employed"],
      default: "employee",
    },
    teamMemberId: { type: String },
    servicesProvided: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    ],
    allowCalendarBooking: { type: Boolean, default: true },
    accessLevel: {
      type: String,
      enum: ["no-access", "basic", "low", "medium", "high"],
      default: "low",
    },
    averageRating: { type: Number, default: 0 },
    payroll: { type: mongoose.Schema.Types.ObjectId, ref: "Payroll" },
    calendarColor: { type: String, default: "#F0F0FF" },
    note: String,
    headline: String,
    bio: String,
    languages: [String],
    socialLinks: [String],
    defaultShift: [
      {
        weekdays: [Number],
        shifts: [
          {
            startTime: {
              hour: { type: Number, required: true },
              minute: { type: Number, required: true },
            },
            endTime: {
              hour: { type: Number, required: true },
              minute: { type: Number, required: true },
            },
          },
        ],
        timeOffs: [
          {
            startTime: {
              hour: { type: Number, required: true },
              minute: { type: Number, required: true },
            },
            endTime: {
              hour: { type: Number, required: true },
              minute: { type: Number, required: true },
            },
          },
        ],
        validUntil: { type: Date, default: null }, // null means forever
      },
    ],
  },
  { timestamps: true }
);

const JobProfile = mongoose.model("JobProfile", jobProfileSchema);

module.exports = JobProfile;
