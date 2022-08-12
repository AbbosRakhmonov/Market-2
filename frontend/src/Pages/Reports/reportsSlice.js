import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {universalToast} from '../../Components/ToastMessages/ToastMessages'
import Api from '../../Config/Api'

export const getReports = createAsyncThunk(
    'reports/getReports',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/reports/getreports', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getSales = createAsyncThunk(
    'reports/getSales',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/reports/getsalesreport', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getProfit = createAsyncThunk(
    'reports/getProfit',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/reports/profitreport', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getPaymentReport = createAsyncThunk(
    'reports/getPaymentReport',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/reports/paymentsreport', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getDebts = createAsyncThunk(
    'reports/getDebts',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/reports/getdebtsreport', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getDiscounts = createAsyncThunk(
    'reports/getDebts',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/reports/getdiscountsreport', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const payDebt = createAsyncThunk(
    'reports/payDebt',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/saleproducts/payment', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const reportSlice = createSlice({
    name: 'cash',
    initialState: {
        reports: null,
        loading: false,
        errorReports: null,
        datas: [],
        count: 0,
    },
    reducers: {
        clearErrorReports: (state) => {
            state.errorReports = null
        },
        clearDatas: (state) => {
            state.datas = []
            state.count = 0
        },
    },
    extraReducers: {
        [getReports.pending]: (state) => {
            state.loading = true
        },
        [getReports.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.reports = payload
        },
        [getReports.rejected]: (state, {payload}) => {
            state.loading = false
            state.errorReports = payload
        },
        [getSales.pending]: (state) => {
            state.loading = true
        },
        [getSales.rejected]: (state, {payload}) => {
            state.loading = false
            universalToast(`${payload}`, 'error')
        },
        [getSales.fulfilled]: (state, {payload: {data, count}}) => {
            state.loading = false
            state.datas = data
            state.count = count
        },
        [getProfit.pending]: (state) => {
            state.loading = true
        },
        [getProfit.rejected]: (state, {payload}) => {
            state.loading = false
            universalToast(`${payload}`, 'error')
        },
        [getProfit.fulfilled]: (state, {payload: {data, count}}) => {
            state.loading = false
            state.datas = data
            state.count = count
        },
        [getPaymentReport.pending]: (state) => {
            state.loading = true
        },
        [getPaymentReport.rejected]: (state, {payload}) => {
            state.loading = false
            universalToast(`${payload}`, 'error')
        },
        [getPaymentReport.fulfilled]: (state, {payload: {data, count}}) => {
            state.loading = false
            state.datas = data
            state.count = count
        },
        [getDebts.pending]: (state) => {
            state.loading = true
        },
        [getDebts.rejected]: (state, {payload}) => {
            state.loading = false
            universalToast(`${payload}`, 'error')
        },
        [getDebts.fulfilled]: (state, {payload: {data}}) => {
            state.loading = true
            state.datas = data
        },
        [getDiscounts.pending]: (state) => {
            state.loading = true
        },
        [getDiscounts.rejected]: (state, {payload}) => {
            state.loading = false
            universalToast(`${payload}`, 'error')
        },
        [getDiscounts.fulfilled]: (state, {payload: {data, count}}) => {
            state.loading = true
            state.datas = data
            state.count = count
        },
        [payDebt.pending]: (state) => {
            state.loading = true
        },
        [payDebt.rejected]: (state, {payload}) => {
            state.loading = false
            universalToast(`${payload}`, 'error')
        },
        [payDebt.fulfilled]: (state) => {
            state.loading = false
        },
    },
})

export const {clearErrorReports, clearDatas} = reportSlice.actions
export default reportSlice.reducer
