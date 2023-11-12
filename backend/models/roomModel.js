const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please add a room name"],
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
