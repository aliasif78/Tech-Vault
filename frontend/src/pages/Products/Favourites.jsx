import { useSelector } from "react-redux"
import { setFavouriteProduct } from '../../redux/features/favourites/favouriteSlice'
import Product from "./Product"

const Favourites = () => {
    const favourites = useSelector(setFavouriteProduct)
    console.log(favourites)

    return (
        <div className="ml-[10rem]">
            <h1 className="text-3xl font-semibold ml-[3rem] mt-[3rem]">Favourite Products</h1>

            <div className="flex flex-wrap">
                {favourites.map((p) => (
                    <Product key={p._id} product={p}></Product>
                ))}
            </div>
        </div>
    )
}

export default Favourites