// Defining the User Functions
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

// Using asyncHandler to catch any errors
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

const loginUser = asyncHandler(async (req, res) => {

    // Get the entered Email and Password
    const { email, password } = req.body

    // User exists, check the Password
    try {
        // Check if the User exists
        const userExists = await User.findOne({ email })

        if (userExists) {
            const isPasswordValid = await bcrypt.compare(password, userExists.password)

            // Password is valid, Login
            if (isPasswordValid) {

                // Generate a Cookie
                generateToken(res, userExists._id)

                // Send a Successful Response Status
                res.status(201).json({ _id: userExists._id, username: userExists.username, email: userExists.email, isAdmin: userExists.isAdmin })

                // Allow User to be Logged In now
                return
            }
        }
    }

    // Throw an Error if anything unexpected happens
    catch (error) {
        res.status(400)
        throw new Error("Invalid information provided")
    }
})

const logoutUser = asyncHandler(async (req, res) => {

    // Remove the Cookie
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logout successful." })
})

const getAllUsers = asyncHandler(async (req, res) => {
    // Get all Users
    const users = await User.find({})
    res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    // Get a specific Users
    const user = await User.findById(req.user._id)

    // Successfully fetched user data
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }

    // Failed to fetch user data
    else {
        res.status(404)
        throw new Error("User not found.")
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        // Update current info if new is provided, else, do nothing
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            // Encrypt the User Password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            user.password = hashedPassword
        }

        // Update the User in the database now
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin
        })
    }
    else {
        res.status(404)
        throw new Error("User not found.")
    }
})

export { addUser, loginUser, logoutUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile }