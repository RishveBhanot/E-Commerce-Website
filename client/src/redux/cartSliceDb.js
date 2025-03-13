import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk(
  "retrieveCart",
  async (userEmail) => {
    try {
      console.log("userEmail to get cart products", userEmail)
      if (!userEmail) throw new Error("User ID is missing"); 

      const response = await axios.get(
        `http://localhost:7001/api/cart/${userEmail}`,
        { withCredentials: true }
      );
      console.log(" Cart Fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error(" Error fetching cart:", error);
    }
  }
);

export const addToCartDb = createAsyncThunk(
  "cart/addToDb",
  async ({ userEmail, product }) => {
    console.log("Both userEmail and product",userEmail, product);
    try {
      const productWithId = { ...product, _id: product.id };
      console.log(product.id, "product id to get from schema");

      const response = await axios.post("http://localhost:7001/api/cart/add", {
        userEmail,
        product: {
          productId: String(productWithId._id), // Required
          image: productWithId.image,
          title: productWithId.title,
          price: productWithId.price,
          category: productWithId.category,
          description: productWithId.description,
          quantity: 1,
          rating: {
            rate: productWithId.rating.rate,
            count: productWithId.rating.count,
          },
        },
      }, { withCredentials:true });
      console.log('sending data to server', response.data);

      if(!response.data){
        console.log("Error sending data to the server");
      }
      

      return response.data;
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
    }
  }
);

const cartSliceDb = createSlice({
  name: "cartDb",
  initialState: {
    cart: [], 
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log("Redux Cart Updated:", action.payload);
        state.loading = false;
        state.cart = action.payload; 
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCartDb.fulfilled, (state, action) => {
        state.cart = action.payload; // ✅ Update state correctly
      });
  },
});

export default cartSliceDb.reducer;
