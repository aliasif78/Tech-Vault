import { useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useDeliverOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../../redux/api/orderApiSlice'

const Order = () => {
    const { id: orderId } = useParams()
    const { data: order, refetch, isLoading, Error } = useGetOrderDetailsQuery(orderId)
    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
    const { userInfo } = useSelector(state => state.auth)
    const [{ isPending }, payPalDispatch] = usePayPalScriptReducer()
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery()

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
            const loadingPayPalScript = async () => {
                payPalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id": paypal.clientId,
                        currency: "USD"
                    }
                })

                payPalDispatch({ type: "setLoadingStatus", value: 'pending' })
            }

            if (order && !order.isPaid) {
                if (!window.paypal) {
                    loadingPayPalScript()
                }
            }
        }
    }, [errorPayPal, loadingPayPal, order, paypal, payPalDispatch])

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                await payOrder({ orderId, details })
                refetch()
                toast.success('Payment successful.')
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        })
    }

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [{ amount: { value: order.totalPrice } }]
        }).then((orderId) => { return orderId })
    }

    function onError(err) {
        toast.error(err.message)
    }

    const deliverHandler = async ()=>{
        await deliverOrder(orderId)
        refetch()
    }

    return (
        isLoading ? (<Loader />) : Error ? (<Message variant='danger'>{Error.data.message}</Message>) : (
            <div className="container flex flex-col ml-[6rem] md:flex-row">
                <div className="md:w-2/3 pr-4">
                    <div className="border-gray-300 mt-5 pb-4 mb-5">
                        {order.orderItems.length === 0 ? (<Message>Order is empty.</Message>) : (
                            <div className="overflow-x-auto">
                                <table className="w-[80%]">
                                    <thead className="border-b-2">
                                        <tr>
                                            <th className="p-2">Image</th>
                                            <th className="p-2">Product</th>
                                            <th className="p-2 text-center">Quantity</th>
                                            <th className="p-2">Unit Price</th>
                                            <th className="p-2">Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {order.orderItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-2">
                                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                                                </td>

                                                <td className="p-2">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </td>

                                                <td className="p-2 text-center">{item.quantity}</td>
                                                <td className="p-2 text-center">$ {item.price}</td>
                                                <td className="p-2 text-center">$ {(item.quantity * item.price).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:w-1/3 mt-16 -ml-[3rem]">
                    <div className="mt-5 border-gray-300 pb-4 mb-4">
                        <h2 className="text-xl font-bold mb-2">Shipping</h2>
                        <p className="mb-4 mt-4">
                            <span className="text-pink-500">Order: </span>{orderId}
                        </p>

                        <p className="mb-4 mt-4">
                            <span className="text-pink-500">Name: </span>{order.user.username}
                        </p>

                        <p className="mb-4 mt-4">
                            <span className="text-pink-500">Email: </span>{order.user.email}
                        </p>

                        <p className="mb-4 mt-4">
                            <span className="text-pink-500">Address: </span>
                            {order.shippingAddress.country}, {order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.postalCode}
                        </p>

                        <p className="mb-4 mt-4">
                            <span className="text-pink-500">Method: </span>{order.paymentMethod}
                        </p>

                        <span className="text-pink-500">Status: </span>
                        {order.isPaid ? (<span>Paid ({order.paidAt})</span>) : (
                            <span>Not Paid</span>
                        )}
                    </div>

                    <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>

                    <div className="flex justify-between mb-2 w-[55%]">
                        <span className="text-pink-500">Items</span>
                        <span>$ {order.itemsPrice}</span>
                    </div>

                    <div className="flex justify-between mb-2 w-[55%]">
                        <span className="text-pink-500">Shipping</span>
                        <span>$ {order.shippingPrice}</span>
                    </div>

                    <div className="flex justify-between mb-2 w-[55%]">
                        <span className="text-pink-500">Tax</span>
                        <span>$ {order.taxPrice}</span>
                    </div>

                    <div className="flex justify-between mb-2 w-[55%]">
                        <span className="text-pink-500">Total</span>
                        <span>$ {order.totalPrice}</span>
                    </div>

                    {!order.isPaid && order.paymentMethod === 'PayPal' && (
                        <div>
                            {loadingPay && <Loader />}
                            {isPending ? (<Loader />) : (
                                <div className="mt-6">
                                    <div>
                                        <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} className="w-[57%]"></PayPalButtons>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <div>
                            <button type="button" className="bg-pink-500 text-white w-full py-2" onClick={deliverHandler}>Mark as Delivered</button>
                        </div>
                    )}
                </div>
            </div>
        )
    )
}

export default Order