const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isEmailVerified: { type: Boolean, default: false },
    password: { type: String },
    isOwner: { type: Boolean, default: false },
    profilePicUrl: { type: String, default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Fphoto-placeholder&psig=AOvVaw27SBlYwpmWfAPVHAm_Sa_T&ust=1751621145071000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJjszrKvoI4DFQAAAAAdAAAAABAE" },
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
