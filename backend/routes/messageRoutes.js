const express = require('express')
const router = express.Router()
const {
    getMessages,
    setMessage,
} = require('../controllers/messageController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getMessages).post(protect, setMessage)


module.exports = router