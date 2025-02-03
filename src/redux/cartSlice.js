import { createSlice } from "@reduxjs/toolkit";
import {addProductToDB} from '../../data/dataMethods';
import { removeProductFromDB } from "../../data/dataMethods";
import { toast } from "react-toastify";
import axios from "axios";
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

            addProductToDB(action.payload)
            .then(data => console.log("Product added to db:", data))
            .catch(err => console.error("Failed to add product to db:", err));
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


                removeProductFromDB(action.payload.id)
                .then(data => console.log("Product deleted from db:", data))
                .catch(err => console.error("Failed to delete product from db:", err)); 
                
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