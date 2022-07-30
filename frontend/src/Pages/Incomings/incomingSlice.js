import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {universalToast} from '../../Components/ToastMessages/ToastMessages'
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
            const {data} = await Api.post('/products/product/getall', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addIncoming = createAsyncThunk(
    'incoming/register',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post(
                '/products/incoming/registerall',
                body
            )
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addTemporary = createAsyncThunk(
    'incoming/temporary',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/products/temporary/register', body)
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
        [addIncoming.pending]: (state) => {
            state.loading = true
        },
        [addIncoming.fulfilled]: (state) => {
            state.loading = false
            universalToast('Mahsulotlar qabul qilindi!', 'success')
        },
        [addIncoming.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            universalToast(`${payload}`, 'error')
        },
        [addTemporary.pending]: (state) => {
            state.loading = true
        },
        [addTemporary.fulfilled]: (state) => {
            state.loading = false
            universalToast('Mahsulotlar saqlandi!', 'success')
        },
        [addTemporary.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            universalToast(`${payload}`, 'error')
        },
    },
})

export const {clearError} = incomingSlice.actions
export default incomingSlice.reducer
