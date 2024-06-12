import { Link } from "react-router-dom"
import HeartIcon from "./HeartIcon"

const SmallProducts = ({product}) => {
    return (
        <div className="w-[18rem] ml-[2rem] p-3">
            <div className="relative">
                <img src={product.image} alt={product.name} className="h-auto rounded" />

                <HeartIcon product={product} />

                <div>
                    <Link to={`/product/${product._id}`}>
                        <h2 className="flex justify-between items-center mt-1">
                            <div>{product.name}</div>
                            <span className="bg-pink-900 text-pink-200 text-sm font-medium m-2 px-2.5 py-0.5 rounded-full">$ {product.price}</span>
                        </h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SmallProducts