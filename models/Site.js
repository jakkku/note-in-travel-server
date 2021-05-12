const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "full name is required"],
  },
  shortName: {
    type: String,
    required: [true, "short name is required"],
  },
  region: {
    latitude: Number,
    longitude: Number,
    latitudeDelta: Number,
    longitudeDelta: Number,
  },
  category: {
    type: String,
    enum: [
      "restaurant",
      "cafe",
      "tourism",
      "accommodation",
      "none",
    ],
    default: "none",
  },
});

module.exports = mongoose.model("Site", siteSchema);
