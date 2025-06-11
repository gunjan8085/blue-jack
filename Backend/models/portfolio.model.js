const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
