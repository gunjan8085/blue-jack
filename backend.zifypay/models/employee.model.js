const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isEmailVerified: { type: Boolean, default: false },
    password: { type: String },
    isOwner: { type: Boolean, default: false },
    profilePicUrl: { type: String },
    dob: { type: Date },
    phoneNumber: { type: String },
    additionalPhoneNumber: { type: String },
    country: { type: String },
    emergencyContacts: [
      {
        name: String,
        relationship: String,
        email: String,
        phoneNumber: String,
      },
    ],
    isAvailableForNewJob: { type: Boolean, default: false },
    jobProfile: { type: mongoose.Schema.Types.ObjectId, ref: "JobProfile" },
    authType: {
      type: String,
      default: "none",
      enum: ["social", "password", "none"],
    },
    portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
