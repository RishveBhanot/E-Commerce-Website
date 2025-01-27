import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart', 
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            console.log(action.payload)
            const existingProduct = state.find(item => item.id === action.payload.id);
            if(existingProduct){
                existingProduct.quantity += 1;
            } else {
                state.push({...action.payload, quantity: 1});
            }
        },
        removeFromCart: (state, action) => {
            const existingProduct = state.find(item => item.id === action.payload.id);
            if(existingProduct.quantity > 1){
                existingProduct.quantity -= 1;
            } else{
                state.filter(item => item.id !== action.payload.id)
            }
        },
        deleteItem: (state, action) => {
             return state.filter(item => item.id !== action.payload.id);
        }

    },
});

export const {addToCart, removeFromCart, deleteItem} = cartSlice.actions;

export default cartSlice.reducer;