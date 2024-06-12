import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToFavourites, removeFromFavourites, setFavourites } from '../../redux/features/favourites/favouriteSlice'
import { addFavouriteToLocalStorage, removeFromLocalStorage, getFavouritesFromLocalStorage } from '../../Utils/localStorage'

const HeartIcon = ({ product }) => {
    const dispatch = useDispatch()
    const favourites = useSelector(state => state.favourites) || []
    const isFavourite = favourites.some((p) => p._id === product._id)

    useEffect(() => {
        const favouritesFromLS = getFavouritesFromLocalStorage()
        dispatch(setFavourites(favouritesFromLS))
    }, [])

    const toggleFavourites = () => {
        if (isFavourite) {
            dispatch(removeFromFavourites(product))
            removeFromLocalStorage(product._id)
        }

        else {
            dispatch(addToFavourites(product))
            addFavouriteToLocalStorage(product)
        }

        console.log(isFavourite)
    }


    return (
        <div onClick={toggleFavourites} className='absolute top-3 right-3 cursor-pointer'>
            {isFavourite ? (<FaHeart className='text-pink-500' />) : (<FaRegHeart className='text-white' />)}
        </div>
    )
}

export default HeartIcon