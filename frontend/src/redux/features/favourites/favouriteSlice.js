import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: [],
    reducers: {

        // Add the product if not already in favourites
        addToFavourites: (state, action) => {
            if (!state.some((product) => product._id === action.payload._id))
                state.push(action.payload)
        },

        // Remove a product from favourites
        removeFromFavourites: (state, action) => {
            return state.filter((product) => product._id !== action.payload._id)
        },

        setFavourites: (state, action) => {
            // Set the favourites from the Local Storage
            return action.payload
        }
    }
})

export const { addToFavourites, removeFromFavourites, setFavourites } = favouriteSlice.actions
export const setFavouriteProduct = (state) => state.favourites
export const favouriteReducer = favouriteSlice.reducer
export default favouriteSlice.reducer;