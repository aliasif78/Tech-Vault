import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.json({ error: "Please provide a name." })
        }

        const existingCategory = await Category.findOne({ name })

        if (existingCategory) {
            return res.json({ error: "Provided category already exists." })
        }

        const newCategory = await new Category({ name }).save()
        res.json(newCategory)
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryid } = req.params
        const deletedCategory = await Category.findByIdAndDelete(categoryid)

        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found." });
        }

        res.json(deletedCategory)
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error." })
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        const { categoryid } = req.params

        const category = await Category.findOne({ _id: categoryid })

        if (!category) {
            return res.status(404).json({ error: "Category does not exist." })
        }

        category.name = name

        const updatedCategory = await category.save()
        res.json(updatedCategory)
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error." })
    }
})

const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({})
        res.json(all)
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const readCategory = asyncHandler(async (req, res) => {
    try {
        const categoryid = req.params.categoryid
        const category = await Category.findOne({ _id: categoryid })
        res.json(category)
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

export { createCategory, updateCategory, deleteCategory, listCategory, readCategory }