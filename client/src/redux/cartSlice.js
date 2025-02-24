import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const cartSlice = createSlice({
    name: 'cart', 
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            // console.log(action.payload, "payload")z
            const existingProduct = state.find(item => item.id === action.payload.id);
            console.log(existingProduct, "product");
            console.log(state, "state eeeee")
            if(existingProduct){
                existingProduct.quantity += 1;
            
            } else {
                const newProduct = {...action.payload, quantity :1};
                state.push(newProduct);
                toast.success('Product Added')
        
            }

        },

        removeFromCart: (state, action) => {
            const existingProduct = state.find(item => item.id === action.payload.id);
            console.log(state.initialState, "initailSTate cart")
            // console.log(existingProduct,'rishve')
            if(existingProduct.quantity > 1){
                existingProduct.quantity -= 1;
            } else{
        
                state.filter(item => item.id !== action.payload.id);
                console.log(action.payload.id, "payloadId") 


                
            } 
        },

        deleteItem: (state, action) => {
        console.log("hello")
        const newState = state.filter(item => item.id !== action.payload.id);
        

            return newState;
            
        }

    },
});

export const {addToCart, removeFromCart, deleteItem, initialState} = cartSlice.actions;

export default cartSlice.reducer;