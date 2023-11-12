const express = require('express')
const router = express.Router()
const {
    cheeckRooms,
  getRooms,
  createRoom,
} = require('../controllers/rooomController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRooms).post(protect, createRoom)
router.route('/search/').get(protect,cheeckRooms)


module.exports = router