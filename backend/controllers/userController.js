// Defining the User Functions
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

// Using asyncHandler to catch an error
const addUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    let check = false

    // Presence Checks
    if (!username || !email || !password) {
        throw new Error("Missing Information.")
        check = true
    }

    // Email Existance Check
    const userExists = await User.findOne({ email })

    if (!check && userExists) {
        res.status(400).send("Email is already in use.")
        check = true
    }

    // Username Existance Check
    if (!check) {
        const userExists2 = await User.findOne({ username })

        if (userExists2) {
            res.status(400).send("Username is already in use.")
            check = true
        }
    }

    // Finally add the User    
    // Encrypt the User Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        // Save the User to the Database
        await newUser.save()
        
        // Generate a Cookie
        generateToken(res, newUser._id)

        // Send a Successful Response Status
        res.status(201).json({ _id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin })
    }

    // Throw an Error if anything unexpected happens
    catch (error) {
        res.status(400)
        throw new Error("Invalid information provided")
    }
})

export { addUser }