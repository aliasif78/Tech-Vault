import express from "express";
import { addUser, loginUser, logoutUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

// Get all user data if Admin has logged in
router.route('/')
    .post(addUser)
    .get(authenticate, authorizeAdmin, getAllUsers)

// Login and Logout the User
router.post('/auth', loginUser)
router.post('/logout', logoutUser)

// Used put request because we were updating data in the database
router.route('/profile')
    .get(authenticate, getCurrentUserProfile)
    .put(authenticate, updateCurrentUserProfile)

// Admin Routes
// Delete a User (using a delete request as the operation requires removal)
router.route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById)


export default router