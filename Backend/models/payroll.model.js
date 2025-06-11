const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

const Payroll = mongoose.model("Payroll", payrollSchema);

module.exports = Payroll;
