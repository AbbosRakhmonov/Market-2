import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Api from '../../Config/Api'

export const getSuppliers = createAsyncThunk(
    'incoming/getsuppliers',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/supplier/getincoming', {body})
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getProducts = createAsyncThunk(
    'incoming/getproduct',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/products/product/getall', {body})
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const incomingSlice = createSlice({
    name: 'incoming',
    initialState: {
        suppliers: [],
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: {
        [getSuppliers.pending]: (state) => {
            state.loading = true
        },
        [getSuppliers.fulfilled]: (state, {payload}) => {
            state.suppliers = payload
            state.loading = false
        },
        [getSuppliers.rejected]: (state, {payload}) => {
            state.error = payload
            state.loading = false
        },
        [getProducts.pending]: (state) => {
            state.loading = true
        },
        [getProducts.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.products = payload
        },
        [getProducts.rejected]: (state, {payload}) => {
            state.error = payload
        },
    },
})

export const {clearError} = incomingSlice.actions
export default incomingSlice.reducer
