import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../../Config/Api"

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post("/products/product/getproducts", body);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

// addProduct yozish kerak
export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post("/products/product/register", body);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    })

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        total: 0,
        loading: false,
        errorProducts: null
    },
    reducers: {
        clearErrorProducts: (state) => {
            state.error = null;
        },
    },
    extraReducers: {
        [getProducts.pending]: (state) => {
            state.loading = true;
        },
        [getProducts.fulfilled]: (state, {payload: {products, count}}) => {
            state.loading = false;
            state.products = products;
            state.total = count;
        },
        [getProducts.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        },
        [addProduct.pending]: (state) => {
            state.loading = true;
        },
        [addProduct.fulfilled]: (state, {payload: {products, count}}) => {
            state.loading = false;
            state.products = products;
            state.total = count;
        },
        [addProduct.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        }
    },
});

export const {clearErrorProducts} = productSlice.actions;
export default productSlice.reducer;