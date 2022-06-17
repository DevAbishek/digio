import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './features/rootReducer'

const reducer = {
    root: rootReducer
}

// const preloadedState = {
//     root: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
//   }
  

const store = configureStore({
    reducer
})

export default store