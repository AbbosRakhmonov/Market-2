import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api'

export const getReports = createAsyncThunk(
    'reports/getReports',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/inventory/connectors', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const reportSlice = createSlice({
    name: 'cash',
    initialState: {
        reports: {},
        loading: false,
        errorReports: null,
    },
    reducers: {
        clearErrorReports: (state) => {
            state.errorReports = null
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
    },
})

export const {clearErrorReports} = reportSlice.actions
export default reportSlice.reducer
