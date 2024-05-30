import express from "express";
import { addUser } from "../controllers/userController.js";

const router = express.Router()

// Route for Adding a User
router.route('/').post(addUser)

export default router