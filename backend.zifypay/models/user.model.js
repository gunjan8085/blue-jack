// models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String }, // remains optional (Google users won't have it)
  profilePicUrl: { type: String, default: null },
  phoneNumber: String,
  country: String,
  isCustomer: { type: Boolean, default: true },

  // NEW:
  authProvider: { type: String, enum: ["local", "google"], default: "local" },
  googleId: { type: String, index: true, sparse: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  lastLoginAt: { type: Date },

  favourites: { type: [mongoose.Schema.Types.ObjectId], ref: "Business", default: [] },
  recentlyViewed: { type: mongoose.Schema.Types.ObjectId, ref: "Business", default: null },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
