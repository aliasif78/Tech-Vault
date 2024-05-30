// Defining the User Functions
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Using asyncHandler to catch an error
const addUser = asyncHandler(async (req, res)=>{
    res.send("testing")
})

export {addUser}