const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    appointmentColor: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceCategory", serviceCategorySchema);
