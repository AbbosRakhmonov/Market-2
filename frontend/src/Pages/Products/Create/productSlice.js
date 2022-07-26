import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../../Config/Api';

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/products/product/getproducts', body);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getProductsByFilter = createAsyncThunk(
    'products/getProductsByFilter',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/products/product/getproducts', body);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/products/product/register', body);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.put('/products/product/update', body);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (body, {rejectWithValue}) => {
        console.log(body)
        try {
            const {data} = await Api.delete('/products/product/delete', {data: body});
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        searchedProducts: [],
        total: 0,
        totalSearched: 0,
        loading: false,
        errorProducts: null,
        successAddProduct: false,
        successUpdateProduct: false,
        successDeleteProduct: false,
    },
    reducers: {
        clearErrorProducts: (state) => {
            state.errorProducts = null;
        },
        clearSuccessAddProduct: (state) => {
            state.successAddProduct = false;
        },
        clearSuccessUpdateProduct: (state) => {
            state.successUpdateProduct = false;
        },
        clearSearchedProducts: (state) => {
            state.searchedProducts = [];
            state.totalSearched = 0;
        },
        clearSuccessDeleteProduct: (state) => {
            state.successDeleteProduct = false;
        }
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
        [getProductsByFilter.pending]: (state) => {
            state.loading = true;
        },
        [getProductsByFilter.fulfilled]: (state, {payload: {products, count}}) => {
            state.loading = false;
            state.searchedProducts = products;
            state.totalSearched = count;
        },
        [getProductsByFilter.rejected]: (state, {payload}) => {
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
            state.successAddProduct = true;
        },
        [addProduct.rejected]: (state, {payload}) => {
            state.loading = false;
            state.errorProducts = payload;
        },
        [updateProduct.pending]: (state) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, {payload: {products, count}}) => {
            state.loading = false;
            state.products = products;
            state.total = count;
            state.successUpdateProduct = true;
        },
        [updateProduct.rejected]: (state, {payload}) => {
            state.loading = false;
            state.errorProducts = payload;
        },
        [deleteProduct.pending]: (state) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, {payload: {products, count}}) => {
            state.loading = false;
            state.products = products;
            state.total = count;
            state.successDeleteProduct = true;
        },
        [deleteProduct.rejected]: (state, {payload}) => {
            state.loading = false;
            state.errorProducts = payload;
        },
    },
});

export const {
    clearErrorProducts,
    clearSuccessAddProduct,
    clearSuccessUpdateProduct,
    clearSearchedProducts,
    clearSuccessDeleteProduct
} =
    productSlice.actions;
export default productSlice.reducer;
