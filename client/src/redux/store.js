import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import cartDbReducer from './cartSliceDb'


const store = configureStore({
    reducer: {
        auth: authReducer,
        cartDb: cartDbReducer
    }
});

export default store;