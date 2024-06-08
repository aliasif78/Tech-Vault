import { createCategory, deleteCategory, updateCategory, listCategory, readCategory } from "../controllers/categoryController.js";

import express from "express";
const router = express.Router()

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'

// Routes
router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route('/allcategories').get(listCategory)

router.route('/:categoryid')
    .put(authenticate, authorizeAdmin, updateCategory)
    .delete(authenticate, authorizeAdmin, deleteCategory)
    .get(readCategory)


export default router