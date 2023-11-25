const asyncHandler = require("express-async-handler");

const DirectMessage = require("../models/directMessegeModel");
const User = require("../models/userModel");

const find = asyncHandler(async(req,res)=>{
    const find1 = await DirectMessage.findOne()
})

module.exports = {
    
  };