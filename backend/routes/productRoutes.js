import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'
import express from "express";
import ExpressFormidable from 'express-formidable';
import checkId from '../middlewares/checkId.js'
import { addProduct, updateProduct, deleteProduct, getProducts, getProductById, getAllProducts, addProductReview, getTopProducts, getNewProducts } from '../controllers/productController.js';

const router = express.Router()

// Routes
router.route('/')
    .post(authenticate, authorizeAdmin, ExpressFormidable(), addProduct)
    .get(getProducts)

router.route('/allproducts').get(getAllProducts)
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);
router.route('/top').get(getTopProducts)
router.route('/new').get(getNewProducts)

router.route('/:id')
    .put(authenticate, authorizeAdmin, ExpressFormidable(), updateProduct)
    .delete(authenticate, authorizeAdmin, ExpressFormidable(), deleteProduct)
    .get(authenticate, getProductById)

export default router