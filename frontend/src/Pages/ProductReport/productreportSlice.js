import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api.js'
import {universalToast} from '../../Components/ToastMessages/ToastMessages.js'

export const getProductReports = createAsyncThunk(
    'productReport/getProductReports',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/saleproducts/getreportproducts', body)
            console.log(data)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)
// * buni ishlatish kerak
export const getAllProductReports = createAsyncThunk(
    'productReport/getAllProductReports',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/saleproducts/getexcelreportproducts', body)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

const productreportSlice = createSlice({
    name: 'productreport',
    initialState: {
        loading: false,
        error: null,
        allProducts: [],
        products: [],
        searchedProducts: [],
        total: 0,
        totalSearched: 0
    },
    reducers: {
        clearSearchedProducts: (state) => {
            state.searchedProducts = []
            state.totalSearched = 0
        }
    },
    extraReducers: {
        [getProductReports.pending]: (state) => {
            state.loading = true
        },
        [getProductReports.fulfilled]: (state, {payload}) => {
            state.loading = false
        },
        [getProductReports.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            universalToast(payload, 'error')
        }
    }
})

export const {clearSearchedProducts} = productreportSlice.actions
export default productreportSlice.reducer