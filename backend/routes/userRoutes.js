import express from "express";
import { addUser, loginUser, logoutUser, getAllUsers } from "../controllers/userController.js";
import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js"

const router = express.Router()

// Get all user data if Admin has logged in
router.route('/').post(addUser).get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post('/logout', logoutUser)

export default router