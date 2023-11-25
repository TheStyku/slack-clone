const mongoose = require("mongoose");

const directMessageSchema = mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    text: { type: String, required: true },
  },
  date: {
    type: String,
    required: [true, "Please add a date"],
  },
});
