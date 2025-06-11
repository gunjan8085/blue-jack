const mongoose = require("mongoose");

const bookingTnCsSchema = new mongoose.Schema(
  {
    bookingMinLeadTime: {
      type: Number, // minutes as a number
      required: true,
      min: 0,
    },
    bookingMaxLeadTime: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= this.bookingMinLeadTime;
        },
        message: "Max lead time must be ≥ min lead time",
      },
    },
    cancellationLeadTime: {
      type: Number,
      required: true,
      min: 0,
    },
    canSelectTeamMember: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

bookingTnCsSchema.index({ bookingMinLeadTime: 1 });

bookingTnCsSchema.methods.getMinLeadTimeMs = function () {
  return this.bookingMinLeadTime * 60 * 1000; // minutes → milliseconds
};

module.exports = mongoose.model("BookingTnCs", bookingTnCsSchema);
