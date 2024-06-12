// Add a Product to the Local Storage
export const addFavouriteToLocalStorage = (product) => {
    const favourites = getFavouritesFromLocalStorage()

    if (!favourites.some((p) => p._id === product._id)) {
        favourites.push(product)
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }
}

// Remove a Product from the Local Storage
export const removeFromLocalStorage = (productId) => {
    const favourites = getFavouritesFromLocalStorage()
    const updateFavourites = favourites.filter((product) => product._id !== productId)

    localStorage.setItem('favourites', JSON.stringify(updateFavourites))
}

// Retrieve Favourites from the Local Storage
export const getFavouritesFromLocalStorage = () => {
    const favouritesJSON = localStorage.getItem('favourites')
    return favouritesJSON ? JSON.parse(favouritesJSON) : []
}