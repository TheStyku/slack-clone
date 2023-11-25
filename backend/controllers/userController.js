const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    rooms: ['general'],
    activeRooms:['general']
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      rooms: user.rooms,
      activeRooms: user.activeRooms
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      rooms: user.rooms,
      activeRooms: user.activeRooms
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

const searcUser= asyncHandler(async(req,res)=>{
  const {name} = req.query
  console.log(name)
  const userExists = await User.find({name: new RegExp(`^${name}`, 'i' )})
  if(userExists.length !== 0){
    res.status(200).json(userExists)
  } else{
    res.status(400)
    throw new Error(`No user exist`)
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const {email} = req.query
  const user = await User.findOne({email})
  res.status(200).json({
    _id: user.id,
      name: user.name,
      email: user.email,
      rooms: user.rooms,
      activeRooms: user.activeRooms
  })
})

const updateActiveRooms = asyncHandler(async(req,res)=>{
  console.log(`value=${req.body.activeRooms}`)
  const user = await User.findById(req.body._id)
  user.activeRooms.push(req.body.activeRooms)
  await user.save()
})

const updateActiveRoomsDelete = asyncHandler(async(req,res)=>{
  console.log(`value=${req.body.activeRooms}`)
  const user = await User.findById(req.body._id)
  let temp = user.activeRooms.filter( arg => arg!==req.body.activeRooms)
  user.activeRooms = temp
  await user.save()
})

const updateRoom = asyncHandler (async(req,res)=>{
  console.log(`value=${req.body.rooms}`)
  const user = await User.findById(req.body._id)
  user.rooms.push(req.body.rooms)
  await user.save()
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  searcUser,
  updateActiveRooms,
  updateActiveRoomsDelete,
  updateRoom
}