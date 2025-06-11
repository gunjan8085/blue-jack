const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    timezone: { type: String, default: "UTC" },
    timeFormat: { type: String, default: "12hr", enum: ["12hr", "24hr"] },
    firstDayOfWeek: {
      type: String,
      default: 1,
      enum: [1, 6, 7], // 1 = Monday, 6 = Saturday, 7 = Sunday
    },
    displayProcessingTime: { type: Boolean, default: true },
    highlightBlockedTime: { type: Boolean, default: true },
    appointmentColorSource: {
      type: String,
      default: "category",
      enum: ["team-member", "category", "status"],
    },
    waitlistType: { type: String, default: "auto", enum: ["auto", "pick"] },
    waitlistPriority: {
      type: String,
      default: "firstInLine",
      enum: ["firstInLine", "highestValue"],
    },
    cancellationReasons: [String],
    slotDuration: {
      type: Number, // minutes as a number
      default: 30,
      min: 0,
    },
    impInfo: { type: String },
    notificationSettings: {
      sendToTeamMember: { type: Boolean, default: true },
      sendToSpecifcEmail: { type: Boolean, default: true },
      specificEmail: { type: String },
    },
    bokingTnCs: { type: mongoose.Schema.Types.ObjectId, ref: "BookingTnCs" },
    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
    allLocations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Business" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workspace", workspaceSchema);
