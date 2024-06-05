import { createCategory, deleteCategory, updateCategory, listCategory, readCategory } from "../controllers/categoryController.js";

import express from "express";
const router = express.Router()

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'

router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route('/:categoryid')
    .put(authenticate, authorizeAdmin, updateCategory)
    .delete(authenticate, authorizeAdmin, deleteCategory)
    .get(readCategory)

router.route('/categories/all').get(listCategory)

export default router