import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api'

export const getCurrency = createAsyncThunk(
    'currency/getCurrency',
    async (body, {rejectWithValue}) => {
        try {
            const {
                data: {exchangerate},
            } = await Api.post('/exchangerate/get')
            return exchangerate
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getCurrencyType = createAsyncThunk(
    'currency/getCurrencyType',
    async (body, {rejectWithValue}) => {
        try {
            const {
                data: {currency},
            } = await Api.post('/exchangerate/currencyget')
            return currency
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const changeCurrencyType = createAsyncThunk(
    'currency/changeCurrencyType',
    async (body, {rejectWithValue}) => {
        try {
            const {
                data: {currency},
            } = await Api.put('/exchangerate/currencyupdate', body)
            return currency
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currency: null,
        currencies: [],
        currencyType: '',
        currencyLoading: false,
        currencyError: null,
    },
    reducers: {
        clearError: (state) => {
            state.currencyError = null
        },
    },
    extraReducers: {
        [getCurrency.pending]: (state) => {
            state.currencyLoading = true
        },
        [getCurrency.fulfilled]: (state, action) => {
            state.currencyLoading = false
            state.currency = action.payload
        },
        [getCurrency.rejected]: (state, action) => {
            state.currencyLoading = false
            state.currencyError = action.payload
        },
        [getCurrencyType.pending]: (state) => {
            state.currencyLoading = true
        },
        [getCurrencyType.fulfilled]: (state, action) => {
            state.currencyLoading = false
            state.currencyType = action.payload
        },
        [getCurrencyType.rejected]: (state, action) => {
            state.currencyLoading = false
            state.currencyError = action.payload
        },
        [changeCurrencyType.pending]: (state) => {
            state.currencyLoading = true
        },
        [changeCurrencyType.fulfilled]: (state, action) => {
            state.currencyLoading = false
            state.currencyType = action.payload
        },
        [changeCurrencyType.rejected]: (state, action) => {
            state.currencyLoading = false
            state.currencyError = action.payload
        },
    },
})

export const {clearError} = currencySlice.actions
export default currencySlice.reducer
