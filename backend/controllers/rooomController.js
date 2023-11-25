const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Room = require("../models/roomModel");

const cheeckRooms = asyncHandler(async (req, res) => {

  const room = req.query.room
  const rooom = await Room.find({ name: new RegExp(`^${room}`, 'i' ) });
  console.log(room)
  if (rooom.length === 0) {
    res.status(400)
    throw new Error(`Room dont exist`)
  }
  res.status(200).json(rooom);
});

const getRooms = asyncHandler(async (req, res) => {
  const rooms = await User.findOne({ email: req.body.email }).select({ rooms });
  res.status(200).json(rooms);
});

const createRoom = asyncHandler(async (req, res) => {
  const { name, description, password } = req.body;
  const roomExist = await Room.findOne({ name });

  if (roomExist) {
    res.status(400);
    throw new Error(`Room ${roomExist.name} alredy exist`);
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const room = await Room.create({
    name,
    description,
    password:hashedPassword,
  });

  if (room) {
    res.status(201).json({
      name: room.name,
      password: room.password
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const loginRoom = asyncHandler(async(req,res)=>{
  const {name,password} = req.body
  const room = await Room.findOne({name})
  if(room &&(await bcrypt.compare(password, room.password))) {
    res.json({
      name: room.name
    })
  }else{
    res.status(400)
    throw new Error('Wrong password')
    
  }
})

module.exports = {
  cheeckRooms,
  getRooms,
  createRoom,
  loginRoom,
};
