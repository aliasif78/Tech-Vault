import express from "express";
import { addUser, loginUser, logoutUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile } from "../controllers/userController.js";
import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js"

const router = express.Router()

// Get all user data if Admin has logged in
router.route('/').post(addUser).get(authenticate, authorizeAdmin, getAllUsers)
router.post('/auth', loginUser)
router.post('/logout', logoutUser)

// Used put request because we were updating data in the database
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

export default router