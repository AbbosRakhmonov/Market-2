import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../../Config/Api';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post('/products/product/getproducts', body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post('/products/product/register', body);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await Api.post('/products/product/update', body);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    total: 0,
    loading: false,
    errorProducts: null,
    successProducts: false,
  },
  reducers: {
    clearErrorProducts: (state) => {
      state.errorProducts = null;
    },
    clearSuccessProducts: (state) => {
      state.successProducts = false;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload: { products, count } }) => {
      state.loading = false;
      state.products = products;
      state.total = count;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [addProduct.pending]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, { payload: { products, count } }) => {
      state.loading = false;
      state.products = products;
      state.total = count;
      state.successProducts = true;
    },
    [addProduct.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errorProducts = payload;
    },
  },
});

export const { clearErrorProducts, clearSuccessProducts } =
  productSlice.actions;
export default productSlice.reducer;
