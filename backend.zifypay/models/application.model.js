const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },

    applicant: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      linkedin: { type: String },
      website: { type: String },
    },

    resumeUrl: { type: String },
    coverLetter: { type: String },

    status: {
      type: String,
      enum: ["pending", "reviewed", "interviewed", "rejected", "accepted"],
      default: "pending",
    },

    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Application || mongoose.model("Application", applicationSchema);
