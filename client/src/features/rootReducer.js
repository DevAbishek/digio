import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cartItems = [...state.cartItems, action.payload]
        },
        updateCart: (state, action) => {
            state.cartItems = state.cartItems.map(item => item._id === action.payload._id ? {...item, quantity: action.payload.quantity} : item);
        },
        deleteCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        showLoading: (state, action) => {
            state.loading = true
        },
        hideLoading: (state, action) => {
            state.loading = false
        }
    }
})

export default rootSlice.reducer
export const { addToCart, updateCart, deleteCart, showLoading, hideLoading} = rootSlice.actions