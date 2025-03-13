import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk("fetchProfile", async () => {
    const response = await axios.get("http://localhost:7001/api/profile", {withCredentials: true});
    // console.log("fetch profile", response.data);
    return response.data;
})

const initialState = { user: null }

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: ( state, action ) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    }
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;