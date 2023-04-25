const asyncHandler = require("express-async-handler");

const Message = require("../models/messageModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   GET /api/message
// @access  Private
const cheeckRooms = asyncHandler(async (req, res) => {
  const rooom = await Message.find(
    { room: req.query.room },
    "text room"
  ).populate("user", "name");

  res.status(200).json(message);
});

// @desc    CHECK IF ROOM EXIST
// @route   GET /api/room
// @access  Private


module.exports = {
    cheeckRooms,
};
