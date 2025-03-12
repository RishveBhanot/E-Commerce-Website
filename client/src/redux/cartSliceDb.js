import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk(
  "retrieveCart",
  async (userId, { rejectWithValue }) => {
    try {
        console.log("idddddd",userId)
      if (!userId) throw new Error("User ID is missing"); 

      const response = await axios.get(
        `http://localhost:7001/api/cart/${userId}`,
        { withCredentials: true }
      );
      console.log(" Cart Fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error(" Error fetching cart:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCartDb = createAsyncThunk(
  "cart/addToDb",
  async ({ userId, product }, { rejectWithValue }) => {
    console.log(product, "00000000000");
    try {
      const productWithId = { ...product, _id: product.id };
      console.log(product.id, "tttttttttttt");

      const response = await axios.post("http://localhost:7001/api/cart/add", {
        userId,
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
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data || { message: error.message }
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
