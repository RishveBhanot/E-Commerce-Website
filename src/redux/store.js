import { configureStore } from "@reduxjs/toolkit";
import createReducer from './cartSlice'

const store = configureStore({
    reducer: {
        cart: createReducer,
    },

});

export default store;