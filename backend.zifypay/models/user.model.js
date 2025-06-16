const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    profilePicUrl: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    isCustomer: {
      type: Boolean,
      default: true,
    },
    favourites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Business",
      default: [],
    },
    recentlyViewed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
