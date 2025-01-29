import { createSlice } from "@reduxjs/toolkit";
import {addProductToDB} from '../../data/dataMethods';
import { removeProductFromDB } from "../../data/dataMethods";
import axios from "axios";
const cartSlice = createSlice({
    name: 'cart', 
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            // console.log(action.payload, "payload")
            const existingProduct = state.find(item => item.id === action.payload.id);
            // console.log(existingProduct, "product");
            if(existingProduct){
                existingProduct.quantity += 1;
                axios.put(`http://localhost:3000/cartData/${action.payload.id}`, {...action.payload, quantity : existingProduct.quantity});
            } else {
                state.push({...action.payload, quantity: 1});
                axios.post("http://localhost:3000/cartData",{...action.payload, quantity : 1})
            }

            // addProductToDB(action.payload)
            // .then(data => console.log("Product added to db:", data))
            // .catch(err => console.error("Failed to add product to db:", err));
        },

        removeFromCart: (state, action) => {
            const existingProduct = state.find(item => item.id === action.payload.id);
            // console.log(existingProduct,'rishve')
            if(existingProduct.quantity > 1){
                existingProduct.quantity -= 1;
            } else{
        
                const newState = state.filter(item => item.id !== action.payload.id);
                console.log(action.payload.id, "payloadId") 


                removeProductFromDB(action.payload.id)
                .then(data => console.log("Product deleted from db:", data))
                .catch(err => console.error("Failed to delete product from db:", err)); 
                return newState;
            } 
        },

        deleteItem: (state, action) => {
        console.log("hello")
        const newState = state.filter(item => item.id !== action.payload.id);
            console.log(temp);
            removeProductFromDB(action.payload.id)
            .then(data => console.log("Product deleted from db:", data))
            .catch(err => console.error("Failed to delete product from db:", err));

            return newState;
            
        }

    },
});

export const {addToCart, removeFromCart, deleteItem} = cartSlice.actions;

export default cartSlice.reducer;