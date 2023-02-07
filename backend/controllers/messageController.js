const asyncHandler = require('express-async-handler')

const Message = require('../models/messageModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const message = await Message.find({ room: req.query.room}, 'text room').populate('user','name')

  res.status(200).json(message)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setMessage = asyncHandler(async (req, res) => {
    if (!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }
  
    const message = await Message.create({
      room: req.body.room,
      user: req.user.id,
      text: req.body.text
    })
  
    res.status(200).json(message)
  })

  module.exports = {
    getMessages,
    setMessage,
  }