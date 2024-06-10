import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from "../../components/Loader"
import { toast } from "react-toastify"
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../redux/api/usersApiSlice'
import Message from "../../components/Message"
import AdminMenu from "./AdminMenu"

const UserList = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUsername, setEditableUsername] = useState('')
    const [editableEmail, setEditableEmail] = useState('')

    useEffect(() => {
        refetch()
    }, [refetch])

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure that you want to DELETE this user?")) {
            try {
                await deleteUser(id)
            }

            catch (error) {
                toast.error(error.data.message || error.error)
            }
        }
    }

    const toggleEdit = async (id, username, email) => {
        console.log(id, username, email)
        setEditableUserId(id)
        setEditableUsername(username)
        setEditableEmail(email)
    }

    const updateHandler = async (id) => {
        try {
            await updateUser({ userId: id, username: editableUsername, email: editableEmail })
            setEditableUserId(null)
            refetch()
        }

        catch (error) {
            toast.error(error.data.message || error.error)
        }
    }

    return (
        <div className="p-4 ml-[7rem] mt-[2rem]">
            <h1 className="text-2xl font-semibold mb-4 text-white">Users</h1>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data.message || error.message}</Message>) : (
                <div className="flex flex-col md:flex-row">
                    <AdminMenu />
                    <table className="w-full md:w-4/5 mx-auto">
                        <thead className="text-white">
                            <tr className="">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Admin</th>
                            </tr>
                        </thead>

                        <tbody className="text-neutral-400 text-sm">
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-4 py-2">{user._id}</td>

                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input type="text" value={editableUsername} onChange={e => setEditableUsername(e.target.value)} className="w-full p-1 border rounded-lg text-black" />

                                                <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.username} {" "}
                                                <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        {editableUserId === user._id ? (
                                            <div className="flex items-center">
                                                <input type="text" value={editableEmail} onChange={e => setEditableEmail(e.target.value)} className="w-full p-1 border rounded-lg text-black" />

                                                <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                {user.email} {" "}
                                                <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                    <FaEdit className="ml-[1rem]" />
                                                </button>
                                            </div>
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        {user.isAdmin ? (<FaCheck style={{ color: '#1ad91f' }} />) : (<FaTimes style={{ color: 'red' }} />)}
                                    </td>

                                    <td className="px-4 py-2">
                                        {!user.isAdmin && (
                                            <div className="flex">
                                                <button onClick={() => deleteHandler(user._id)} className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>)}
        </div>
    )
}

export default UserList