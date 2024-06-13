import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from './api/apiSlice.js'
import { authReducer } from './features/auth/authSlice.js'
import { favouriteReducer } from "./features/favourites/favouriteSlice.js";
import { getFavouritesFromLocalStorage } from "../Utils/localStorage.js";
import { cartSliceReducer } from "./features/cart/cartSlice.js";
import { shopSliceReducer } from "./features/shop/shopSlice.js";

const initialFavourites = getFavouritesFromLocalStorage() || []

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favourites: favouriteReducer,
        cart: cartSliceReducer,
        shop: shopSliceReducer
    },

    preloadedState: {
        favourites: initialFavourites
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)
export default store