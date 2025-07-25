const mongoose = require("mongoose");
const { ENUMS } = require("../configs/constants.config");
const { required, number } = require("joi");

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
    businessType: {
      type: String,
      enum: ["SALON", "SPA", "CLINIC", "STUDIO", "OTHER"],
      required: true,
    },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    serviceCategories: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        hashtags: {
          type: [String], // example: ["#spa", "#relax"]
          default: [],
        },
        imageUrl: {
          type: String,
        },
        tags: {
          type: [String], // example: ["facial", "massage"]
          default: [],
        },
        price: {
          type: Number,
          required: true,
        },
        duration: {
          type: Number, // in minutes
          required: true,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

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
    // Subscription & Appointment Tracking
    appointmentCount: { type: Number, default: 0 },
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PricingPlan",
      default: null,
    },
    isActive: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["activated", "deactivated"],
      default: "deactivated",
    },
    connectedPaymentAccount: {
      NAME: { type: String, required: false, default: "NORTH" },
      CUST_NBR: { type: String, required: false, default: "NA" },
      MERCH_NBR: { type: String, required: false, default: "NA" },
      DBA_NBR: { type: String, required: false, default: "NA" },
      TERMINAL_NBR: { type: String, required: false, default: "NA" },
    },
    paymentHistory: [
      {
        transactionId: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["success", "failed", "pending"],
          default: "pending",
        },
        customerName: { type: String, required: true },
        customerNumber: { type: String, required: true },
        customerEmail: { type: String, required: true },
        paymentMethod: {
          type: String,
          enum: ["card", "bank_transfer", "cash"],
          default: "card",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
