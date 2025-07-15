const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    businessName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    mobile: { type: String, required: true },

    industry: {
      type: String,
      enum: ["Retail", "Restaurant", "Healthcare", "Other"],
      required: true,
    },
    timeInBusiness: {
      type: String,
      enum: [
        "Less than 1 year",
        "1-2 years",
        "3-5 years",
        "5+ years"
      ],
      required: true,
    },
    annualSales: {
      type: String,
      enum: [
        "Under $100K",
        "$100K-$500K",
        "$500K-$1M",
        "$1M+"
      ],
      required: true,
    },
    product: {
      type: String,
      enum: [
        "Term Loan",
        "Line of Credit",
        "Equipment Financing",
        "Other"
      ],
      required: true,
    },
    agreedToTerms: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Loan || mongoose.model("Loan", loanSchema);
