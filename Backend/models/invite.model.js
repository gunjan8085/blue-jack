const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    sentTo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    jobProfile: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "JobProfile",
    },
    expiresAt: { type: Date, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["invited", "accepted", "expired", "cancelled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invite", inviteSchema);
