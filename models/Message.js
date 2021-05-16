const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  content: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
