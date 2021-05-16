const mongoose = require("mongoose");
const Message = require("./Message");

const courseSchema = new mongoose.Schema({
  isShared: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: String,
  schedules: [{
    index: Number,
    site: {
      type: mongoose.Types.ObjectId,
      ref: "Site",
    },
  }],
  messages: [{
    type: mongoose.Types.ObjectId,
    ref: "Message",
  }],
  favorites: [{
    type: mongoose.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: true });

courseSchema.methods.addMessage = async function (message) {
  const newMessage = await Message.create(message);

  this.messages.push(newMessage._id);
  await this.save();

  return this;
};

module.exports = mongoose.model("Course", courseSchema);
