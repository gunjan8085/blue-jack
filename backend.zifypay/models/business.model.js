const mongoose = require("mongoose");
const { ENUMS } = require("../configs/constants.config");
const { required } = require("joi");

const businessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    brandName: { type: String, required: true },
    website: String,
    thumbnail: String,
    about: String,
    serviceCategories: {
      type: [String],
      required: false
    }
    ,
    teamSize: {
      min: { type: Number, default: 1 },
      max: { type: Number, default: null },
    },
    address: {
      addressLine1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    isOnlineOnly: { type: Boolean, default: false },
    existingSoftware: {
      type: String,
      default: "Other",
    },
    foundUsAt: { type: String, default: "Other" },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
    media: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ["photo", "video"],
        },
      },
    ],
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
    timings: [
      {
        days: [Number],
        time: [
          {
            open: {
              hour: { type: Number, required: true },
              minute: { type: Number, required: true },
            },
            close: {
              hour: { type: Number, required: true },
              minute: { type: Number, required: true },
            },
          },
        ],
      },
    ],
    avgReview: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
