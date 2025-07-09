const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appoint",
      index: true,
    },
    forBusiness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    text: {
      type: String,
      default: "",
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
