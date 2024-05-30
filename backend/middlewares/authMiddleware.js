// Middleware that will authenticate and authorize the User to proceed forward with whatever is to be done
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

export const authenticate = asyncHandler(async (req, res, next) => {
    let Token

    // Read JWT from the 'jwt' cookie
    Token = req.cookies.jwt

    // Check if the Token is valid
    if (Token) {
        try {
            // Decode the JWT
            const decoded = jwt.verify(Token, process.env.JWT_SECRET)

            // Retrieve user information from the database and exclude the password from this
            req.user = await User.findById(decoded.userID).select('-password')

            // Transfer control to the next Middleware or Requests
            next()
        }

        catch (error) {
            res.status(401).send("Not authorized, token failed.")
        }
    }

    else {
        res.status(401).send("Not authorized, token not specified.")
    }
})

export const authorizeAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin)
        next()
    else
        res.status(401).send("User not authorized as an Admin.")
})