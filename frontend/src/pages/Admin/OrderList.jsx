import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice"
import AdminMenu from "./AdminMenu"

const OrderList = () => {
    const { data: orders, isLoading, Error } = useGetOrdersQuery()

    return (
        <>
            {isLoading ? (<Loader />) : Error ? (<Message variant='danger'>{Error?.data?.message || Error.error}</Message>) : (
                <table className="container ml-16 w-[90%] mx-auto">
                    <AdminMenu />

                    <thead className="w-full border">
                        <tr className="mb-[5rem]">
                            <th className="text-left pl-1">Items</th>
                            <th className="text-left pl-1">ID</th>
                            <th className="text-left pl-1">User</th>
                            <th className="text-left pl-1">Data</th>
                            <th className="text-left pl-1">Total</th>
                            <th className="text-left pl-1">Paid</th>
                            <th className="text-left pl-1">Delivered</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>
                                    <img src={order.orderItems[0].image} alt={order._id} className="w-[5rem] pt-4" />
                                </td>

                                <td>{order._id}</td>
                                <td>{order.user ? order.user.username : 'N/A'}</td>
                                <td>{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td>
                                <td>$ {order.totalPrice}</td>

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

                                <div className="px-2 py-2 mt-2 mr-3 -ml-2">
                                    <Link to={`/order/${order._id}`}>
                                        <button className="bg-pink-500 text-white py-2 px-3 rounded">View Details</button>
                                    </Link>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default OrderList