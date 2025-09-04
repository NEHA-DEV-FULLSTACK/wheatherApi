const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Combine date + time into one field
    eventDateTime: { type: Date, required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    eventData: { type: mongoose.Schema.Types.Mixed, required: true }, // Weather API data
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Event", eventSchema);
