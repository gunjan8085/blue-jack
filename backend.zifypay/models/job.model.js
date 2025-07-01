const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String },
    location: { type: String },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract", "Remote"],
      default: "Full-Time",
    },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "USD" },
    },
    openings: { type: Number, default: 1 },

    experience: { type: String, default: "0+ years" },
    visaRequirement: {
      type: String,
      enum: ["No visa needed", "US citizen only", "Visa Sponsored", "Open"],
      default: "No visa needed",
    },
    description: { type: String, required: true },
    responsibilities: [String],
    qualifications: [String],
    perks: [String],

    applyEmail: { type: String },
    applyLink: { type: String },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
