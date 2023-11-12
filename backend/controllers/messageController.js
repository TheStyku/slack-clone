const asyncHandler = require("express-async-handler");

const Message = require("../models/messageModel");
const User = require("../models/userModel");

const getMessages = asyncHandler(async (req, res) => {
  const message = await Message.find(
    { room: req.query.room },
    "text room date"
  ).populate("user", "name");

  res.status(200).json(message);
});


const setMessage = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const message = await Message.create({
    room: req.body.room,
    user: req.user.id,
    text: req.body.text,
    date: req.body.date
  });

  res.status(200).json(message);
});

module.exports = {
  getMessages,
  setMessage,
};
