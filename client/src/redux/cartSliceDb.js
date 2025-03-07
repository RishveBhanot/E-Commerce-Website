import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("retrieveCart", async() => {
    const response = await axios.get("http://localhost:7001/api/cart", { withCredentials: true})
    return response.data;
});

export const addToCartDb = createAsyncThunk("addCartProduct", async ({ productId, quantity }) => {
    console.log("Sending to server:", { productId, quantity });

    const response = await axios.post('http://localhost:7001/api/cart', 
        { productId, quantity }, // Ensure proper structure
        { withCredentials: true }
    );
    
    return response.data;
});




const cartSliceDb = createSlice({
    name: "cartDb",
    initialState: {
        items: [],
        cart:[],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.
        addCase(fetchCart.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addToCartDb.fulfilled, (state, action) => {
            state.items = action.payload;
        })
    }
});

export default cartSliceDb.reducer;