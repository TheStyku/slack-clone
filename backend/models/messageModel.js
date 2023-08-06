const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a meesage"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    room: {
        type: String,
        required: [true, 'Please add a room']
    },
    date:{
      type: String,
      required: [true, 'Please add a date']
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
