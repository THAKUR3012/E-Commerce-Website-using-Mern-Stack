import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null

}

export const fetchAllFilterProducts = createAsyncThunk("/products/fetchAllFilterProducts", async ({ filterParams, sortParams }) => {

    // console.log(fetchAllFilterProducts, "fetchAllFilterProducts")

    const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams
    })
    const result = await axios.get(`http://localhost:5000/api/v1/shop/get?${query}`);
    return result?.data
})

export const fetchProductDetails = createAsyncThunk("/products/fetchProductDetails", async (id) => {
    const result = await axios.get(`http://localhost:5000/api/v1/shop/get/${id}`);
    return result?.data
})

const shopProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilterProducts.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchAllFilterProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(fetchAllFilterProducts.rejected, (state, action) => {
            state.isLoading = false
            state.productList = []
        }).addCase(fetchProductDetails.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.productDetails = action.payload.data
        }).addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false
            state.productDetails = null
        })
    }


})

export const { setProductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer