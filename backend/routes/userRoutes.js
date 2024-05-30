import express from "express";
import { addUser, loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router()

router.route('/').post(addUser)
router.post('/auth', loginUser)
router.post('/logout', logoutUser)

export default router