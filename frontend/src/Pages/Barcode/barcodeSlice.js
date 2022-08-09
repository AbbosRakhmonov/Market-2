import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api'

export const getBarcode = createAsyncThunk(
    'barcode/getBarcodeByCode',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/barcode/getbycode', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const barcodeSlice = createSlice({
    name: 'products',
    initialState: {
        barcode: null,
        errorGetBarcode: false,
        successGetBarcode: false,
        loading: false,
    },
    reducers: {
        clearErrorGetBarcode: (state) => {
            state.errorGetBarcode = false
        },
        clearBarcode: (state) => {
            state.barcode = null
        },
    },
    extraReducers: {
        [getBarcode.pending]: (state) => {
            state.loading = true
        },
        [getBarcode.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.barcode = payload
        },
        [getBarcode.rejected]: (state, {payload}) => {
            state.loading = false
            state.errorGetBarcode = payload
        },
    },
})

export const {clearBarcode, clearErrorGetBarcode} = barcodeSlice.actions
export default barcodeSlice.reducer
