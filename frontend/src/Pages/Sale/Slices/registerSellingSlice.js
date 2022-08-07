import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Api from '../../../Config/Api.js'
import {successSavedTemporary, universalToast} from '../../../Components/ToastMessages/ToastMessages.js'
import {deleteError} from '../../../App/globalFunctions.js'

export const getAllProducts = createAsyncThunk(
    'registerSelling/getAllProducts',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/products/product/getproductsale')
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const getClients = createAsyncThunk(
    'registerSelling/getClients',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/client/getall')
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const makePayment = createAsyncThunk(
    'registerSelling/makePayment',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/saleproducts/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const savePayment = createAsyncThunk(
    'registerSelling/savePayment',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/temporary/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const registerSellingSlice = createSlice({
    name: 'registerSelling',
    initialState: {
        allProducts: [],
        clients: [],
        lastPayments: [],
        loadingGetAllProducts: true,
        loadingGetClients: true,
        loadingMakePayment: false,
        loadingSavePayment: false,
        errorGetAllProducts: null,
        errorGetUsers: null,
        errorMakePayment: null,
        errorSavePayment: null
    },
    reducers: {},
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.loadingGetAllProducts = true
        },
        [getAllProducts.fulfilled]: (state, {payload}) => {
            state.loadingGetAllProducts = false
            state.allProducts = payload
        },
        [getAllProducts.rejected]: (state, {payload}) => {
            state.loadingGetAllProducts = false
            state.errorGetAllProducts = payload
            universalToast(payload, 'error')
            deleteError(state, 'errorGetAllProducts')
        },
        [getClients.pending]: (state) => {
            state.loadingGetClients = true
        },
        [getClients.fulfilled]: (state, {payload}) => {
            state.loadingGetClients = false
            state.clients = payload
        },
        [getClients.rejected]: (state, {payload}) => {
            state.loadingGetClients = false
            state.errorGetUsers = payload
            universalToast(payload, 'error')
            deleteError(state, 'errorGetUsers')
        },
        [makePayment.pending]: (state) => {
            state.loadingMakePayment = true
        },
        [makePayment.fulfilled]: (state, {payload}) => {
            state.loadingMakePayment = false
            state.lastPayments.unshift(payload)
        },
        [makePayment.rejected]: (state, {payload}) => {
            state.loadingMakePayment = false
            state.errorMakePayment = payload
            universalToast(payload, 'error')
            deleteError(state, 'errorMakePayment')
        },
        [savePayment.pending]: (state) => {
            state.loadingSavePayment = true
        },
        [savePayment.fulfilled]: (state) => {
            state.loadingSavePayment = false
            successSavedTemporary()
        },
        [savePayment.rejected]: (state, {payload}) => {
            state.loadingSavePayment = false
            state.errorSavePayment = payload
            universalToast(payload, 'error')
            deleteError(state, 'errorSavePayment')
        }
    }
})

export default registerSellingSlice.reducer