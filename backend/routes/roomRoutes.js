const express = require('express')
const router = express.Router()
const {
    cheeckRooms,
  getRooms,
  createRoom,
  loginRoom,
} = require('../controllers/rooomController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRooms).post(protect, createRoom)
router.route('/search/').get(protect,cheeckRooms).post(protect, loginRoom)


module.exports = router