const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  searcUser,
  updateActiveRooms,
  updateActiveRoomsDelete,
  updateRoom,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/search", protect, searcUser);
router.patch("/update", updateActiveRooms);
router.patch("/update/delete", updateActiveRoomsDelete);
router.patch("/update/rooms",updateRoom)
module.exports = router;
