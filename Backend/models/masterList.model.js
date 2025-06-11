const mongoose = require("mongoose");
const { ENUMS } = require("../configs/constants.config");

const masterListSchema = new mongoose.Schema(
  {
    categories: {
      type: [String],
      enum: ENUMS.CATEGORIES,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MasterList", masterListSchema);
