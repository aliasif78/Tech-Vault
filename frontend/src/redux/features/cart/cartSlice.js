import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../../Utils/cart";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action) => {
            // Excluding user, rating, numReviews & reviews from the item
            const { user, rating, numReviews, reviews, ...item } = action.payload
            const existingItem = state.cartItems.find((x) => x._id === item._id)

            if (existingItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existingItem._id ? item : x)
            }

            else {
                state.cartItems = [...state.cartItems, item]
            }

            // return updateCart(state, item)
            return updateCart(state)
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
            console.log(state.cartItems)
            return updateCart(state)
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },

        clearCartItems: (state) => {
            state.cartItems = []
            localStorage.setItem('cart', JSON.stringify(state))
        },

        resetCart: (state) => {
            state = initialState
        }
    }
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart } = cartSlice.actions
export const cartSliceReducer = cartSlice.reducer;