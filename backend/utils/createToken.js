// Creating a Token for the User Cookie
import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
    
    // Create the Token and sign it using the Secret Key defined in the .env file and set its expiry date to 30 Days
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn: "30d"})

    // Set JWT as an HTTP-only Cookie with an age of 30 Days
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000
    })

    return token
}

export default generateToken