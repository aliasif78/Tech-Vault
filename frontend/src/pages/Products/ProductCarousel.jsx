import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'

const ProductCarousel = () => {

    const { data: products, isLoading, error } = useGetTopProductsQuery()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000
    }

    return (
        <div className="mb-4 ml-[4rem] mt-3 xl:block lg:block md:block">
            {isLoading ? null : error ? (
                < Message variant='danger'>
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <Slider {...settings} className='xl:w-[28rem] lg:w-[24rem] md:w-[20rem] sm:w-[40rem] sm:block'>
                    {products.map(({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
                        <div key={_id}>
                            <img src={image} alt={name} className='w-full rounded-lg object-cover h-[25rem]' />

                            <div className="text-sm flex justify-between mt-1">
                                <div className="one w-[30%]">
                                    <h2>{name}</h2>
                                    <br />
                                    <p>$ {price}</p>
                                    <br />
                                    <p className="w-[25rem]">{description.substring(0, 170)}...</p>
                                </div>

                                <div className="one w-[100%]">
                                    <h2 className="flex items-center mb-4">
                                        <FaStore className="mr-2 text-white" />Brand : {brand}
                                    </h2>

                                    <h2 className="flex items-center mb-4">
                                        <FaClock className="mr-2 text-white" />Added : {moment(createdAt).fromNow()}
                                    </h2>

                                    <h2 className="flex items-center mb-4">
                                        <FaStar className="mr-2 text-white" />Reviews : {numReviews}
                                    </h2>
                                </div>

                                <div className="two w-[60%]">
                                    <h2 className="flex items-center mb-4">
                                        <FaStar className="mr-2 text-white" />Rating : {""} {Math.round(rating)}
                                    </h2>

                                    <h2 className="flex items-center mb-4">
                                        <FaShoppingCart className="mr-2 text-white" />Quantity : {quantity}
                                    </h2>

                                    <h2 className="flex items-center mb-4">
                                        <FaBox className="mr-2 text-white" />In Stock : {countInStock}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div >
    )
}

export default ProductCarousel
