import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields

        // Validation Checks
        switch (true) {
            case !name:
                return res.json({ error: "A name must be provided." })

            case !description:
                return res.json({ error: "A description must be provided." })

            case !price:
                return res.json({ error: "A price must be provided." })

            case !category:
                return res.json({ error: "A category must be provided." })

            case !quantity:
                return res.json({ error: "A quantity must be provided." })

            case !brand:
                return res.json({ error: "A brand must be provided." })
        }

        const product = new Product({ ...req.fields })
        await product.save()
        res.json(product)
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand } = req.fields

        // Validation Checks
        switch (true) {
            case !name:
                return res.json({ error: "A name must be provided." })

            case !description:
                return res.json({ error: "A description must be provided." })

            case !price:
                return res.json({ error: "A price must be provided." })

            case !category:
                return res.json({ error: "A category must be provided." })

            case !quantity:
                return res.json({ error: "A quantity must be provided." })

            case !brand:
                return res.json({ error: "A brand must be provided." })
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true })
        await product.save()

        res.json(product)
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(product)
    }

    catch (error) {
        console.log(error)
        return res.status(500).json("Server Error")
    }
})

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (product) {
            return res.json(product)
        }

        else {
            res.status(404)
            throw new Error("The specified product does not exist.")
        }
    }

    catch (error) {
        console.log(error)
        return res.status(404).json("The specified product does not exist.")
    }
})

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({ createAt: -1 })
        res.json(products)
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server Error" })
    }
})

const getProducts = asyncHandler(async (req, res) => {
    try {
        // Get only 6 products for 1 page, and display rest more pages
        const pageSize = 6
        const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {}
        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }).limit(pageSize)

        res.json({ products, page: 1, pages: Math.ceil(count / pageSize), hasMore: false })
    }

    catch (error) {
        console.log(error)
        return res.status(500).json("Server Error")
    }
})

const addProductReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body
        const product = await Product.findById(req.params.id)
        
        if (product) {
            const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

            if (alreadyReviewed) {
                res.status(400)
                throw new Error("You have already reviewed this product.")
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item)=>item.rating + acc, 0) / product.reviews.length

            await product.save()
            res.status(201).json({message: "Review Added"})
        }

        else {
            res.status(404)
            throw new Error("Product not found.")
        }
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4)
        res.json(products)        
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const getNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({_id: -1}).limit(5)
        res.json(products)        
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

export { addProduct, updateProduct, deleteProduct, getProducts, getProductById, getAllProducts, addProductReview, getTopProducts, getNewProducts }