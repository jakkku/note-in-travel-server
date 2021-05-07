const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  location: [Number, Number],
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
