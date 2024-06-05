import { useState } from "react"
import { toast } from "react-toastify"
import { useCreateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery, useUpdateCategoryMutation } from '../../redux/api/categoryApiSlice.js'
import CategoryForm from "../../components/CategoryForm.jsx"
import Modal from "../../components/Modal.jsx"
import { deleteModel } from "mongoose"

const CategoryList = () => {
    const { data: categories } = useFetchCategoriesQuery()
    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const handleCreateCategory = async (e) => {
        e.preventDefault()

        if (!name) {
            toast.error('Please specify a name.')
            return
        }

        try {
            const result = await createCategory({ name }).unwrap()

            if (result.error) {
                toast.error(result.error)
            }

            else {
                setName("")
                toast.success(`${result.name} has been added successfully.`)
            }
        }

        catch (error) {
            console.error(error)
            toast.error('Failed to create category.')
        }
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault()

        if (!updatingName) {
            toast.error('Please specify a name.')
            return
        }

        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id, updatedCategory: {
                    name: updatingName
                }
            }).unwrap()

            if (result.error) {
                toast.error(result.error)
            }

            else {
                setName("")
                setSelectedCategory(null)
                setUpdatingName("")
                setModalVisible(false)
                toast.success(`${result.name} has been added successfully.`)
            }
        }

        catch (error) {
            console.error(error)
            toast.error('Failed to create category.')
        }
    }

    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()

            if (result.error) {
                toast.error(result.error)
            }

            else {
                toast.success(`${result.name} has been deleted successfully.`)
                setSelectedCategory(null)
                setModalVisible(false)
            }
        }

        catch (error) {
            console.error(error)
            toast.error('Failed to delete category.')
        }
    }

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            {/* <AdminMenu /> */}

            <div className="md:w-3/4 p-3">
                <div className="h-20 text-4xl ml-[1rem] mt-[2rem]">Manage Categories</div>
                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
                <br />
                <hr />

                <div className="flex flex-wrap mt-[0.5rem]">
                    {categories?.map((category) => (
                        <div key={category._id} className="">
                            <button onClick={() => { setModalVisible(true); setSelectedCategory(category); setUpdateName(category.name) }} className="text-sm bg-black border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">{category.name}</button>
                        </div>
                    ))}
                </div>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                    <CategoryForm value={updatingName} setValue={setUpdatingName} handleSubmit={handleUpdateCategory} buttonText="Update" handleDelete={handleDeleteCategory} />
                </Modal>
            </div>
        </div>
    )
}

export default CategoryList