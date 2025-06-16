const mongoose = require("mongoose");

const shiftsSchema = new mongoose.Schema(
  {
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    date: { type: Date, required: true },
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
    isDayOff: { type: Boolean },
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
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shifts", shiftsSchema);
