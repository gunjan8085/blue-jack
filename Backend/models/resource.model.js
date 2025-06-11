const { required } = require("joi");
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
