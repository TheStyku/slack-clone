const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    room: {
      type: String,
      required: [true, "Please add a room name"],
    },
    isRequired: {
        type: Boolean,
        required: [true]
    },
    password:{
        type: String,
    },
    description:{
        type: String,
    }
  },
);

module.exports = mongoose.model("Room", roomSchema);
