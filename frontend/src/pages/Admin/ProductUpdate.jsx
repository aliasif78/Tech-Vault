import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useDeleteProductMutation, useGetProductByIdQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice.js'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice.js'
import './ProductList.css'
import AdminMenu from "./AdminMenu.jsx"
import { IoMdCloudyNight } from "react-icons/io"

const ProductUpdate = () => {
    const params = useParams()
    const { data: productData } = useGetProductByIdQuery(params._id)

    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || '')
    const [description, setDescription] = useState(productData?.description || '')
    const [price, setPrice] = useState(productData?.price || '')
    const [category, setCategory] = useState(productData?.category || '')
    const [quantity, setQuantity] = useState(productData?.quantity || '')
    const [brand, setBrand] = useState(productData?.brand || '')
    const [stock, setStock] = useState(productData?.stock || 0)
    const [imageURL, setImageURL] = useState(productData?.imageURL || null)

    const navigate = useNavigate()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()
    const { data: categories = [], isLoading, error } = useFetchCategoriesQuery();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category ? productData.category : "")
            setQuantity(productData.quantity)
            setBrand(productData.brand)
            setStock(productData.countInStock)
            setImageURL(productData.imageURL)
            setImage(productData.image)
        }
    }, [productData])

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success('Item added successfully.')
            setImage(res.image)
        }

        catch (error) {
            toast.error('Failed to add item.')
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Append fields to formData
            formData.append('name', name);
            formData.append('image', image);
            formData.append('brand', brand);
            formData.append('quantity', quantity);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('countInStock', stock);

            const { data } = await updateProduct({ productId: params._id, formData: formData })

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(`${data.name} has been successfully updated.`);
                navigate("/admin/product/allproducts");
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to update product. Try again.');
        }
    };

    const handleDelete = async () => {
        try {
            let answer = window.confirm('Are you sure that you want to delete this product?')

            if (!answer)
                return

            const { data } = await deleteProduct(params._id)
            toast.success(`${data.name} has been successfully deleted.`)
            navigate('/admin/product/allproducts')
        }

        catch (error) {
            console.error(error)
            toast.error("Failed to delete product. Try again.")
        }
    }

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <div className="h-16 text-3xl font-semibold">Create Product</div>

                    {image && (
                        <div className="text-center">
                            <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                            {image ? image.name : "Upload Image"}
                            <input onChange={uploadFileHandler} type="file" name="image" accept="image/*" className={!image ? 'hidden' : 'text-white'} />
                        </label>
                    </div>

                    <div className="p-3">
                        <div className="flex flex-row flex-wrap gap-x-5 justify-start">
                            <div className="one">
                                <label htmlFor="name">Name</label>
                                <br />

                                <input type="text" className="p-4 mb-3 w-[26.35rem] border rounded-lg bg-[#101011] text-white" value={name} onChange={e => setName(e.target.value)} />
                            </div>

                            <div className="two">
                                <label htmlFor="name block">Price</label>
                                <br />

                                <input type="number" className="p-4 mb-3 w-[26.35rem] border rounded-lg bg-[#101011] text-white" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex flex-row flex-wrap gap-x-5 justify-start">
                            <div className="one">
                                <label htmlFor="name block">Quantity</label>
                                <br />

                                <input type="number" className="p-4 mb-3 w-[26.35rem] border rounded-lg bg-[#101011] text-white" value={quantity} onChange={e => setQuantity(e.target.value)} />
                            </div>

                            <div className="two">
                                <label htmlFor="name block">Brand</label>
                                <br />

                                <input type="text" className="p-4 mb-3 w-[26.35rem] border rounded-lg bg-[#101011] text-white" value={brand} onChange={e => setBrand(e.target.value)} />
                            </div>
                        </div>

                        <label htmlFor="" className="my-5">Description</label>
                        <textarea type="text" className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                        <div className="flex flex-wrap gap-x-5 justify-start">
                            <div>
                                <label htmlFor="name block">Count in Stock</label>
                                <br />
                                <input type="number" className="p-4 mb-3 w-[26.35rem] border rounded-lg bg-[#101011] text-white" value={stock} onChange={e => setStock(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor="">Category</label>
                                <br />
                                <select placeholder='Choose Category' className="p-4 mb-3 w-[26.35rem] border rounded-lg bg-[#101011] text-white" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value=""></option>
                                    {categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleUpdate} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-500 mr-6">Update</button>

                            <button onClick={handleDelete} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-500">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
