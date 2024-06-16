import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice"

const UserOrders = () => {
    const { data: orders, isLoading, Error } = useGetMyOrdersQuery()

    return (
        <div className="container ml-[5rem] mx-auto">
            <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

            {isLoading ? (<Loader />) : Error ? (<Message variant='danger'>{Error?.data?.error || Error.error}</Message>) : (
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="py-2">Image</td>
                            <td className="py-2">ID</td>
                            <td className="py-2">Date</td>
                            <td className="py-2">Total</td>
                            <td className="py-2">Paid</td>
                            <td className="py-2">Delivered</td>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="py-2">
                                    <img src={order.orderItems[0].image} alt={order.user} className="w-[6rem] mb-5" />
                                </td>

                                <td className="py-2">{order._id}</td>
                                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                                <td className="py-2">$ {order.totalPrice}</td>

                                <td className="py-2">
                                    {order.isPaid ? (
                                        <p className="p-1 text-center bg-green-600 w-[6rem] rounded-full">Completed</p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full">Incomplete</p>
                                    )}
                                </td>

                                <td className="px-2 py-2">
                                    {order.isDelivered ? (
                                        <p className="p-1 text-center bg-green-600 w-[6rem] rounded-full">Delivered</p>
                                    ) : (
                                        <p className="p-1 text-center bg-red-600 w-[6rem] rounded-full">Pending</p>
                                    )}
                                </td>

                                <div className="px-2 py-2 mt-4 mr-3 -ml-2">
                                    <Link to={`/order/${order._id}`}>
                                        <button className="bg-pink-500 text-white py-2 px-3 rounded">View Details</button>
                                    </Link>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default UserOrders