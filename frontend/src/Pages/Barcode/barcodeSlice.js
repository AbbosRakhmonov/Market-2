import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api'
import {universalToast} from '../../Components/ToastMessages/ToastMessages.js'

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
        barcode: '',
        errorGetBarcode: false,
        successGetBarcode: false,
        loading: false,
    },
    reducers: {
        clearErrorGetBarcode: (state) => {
            state.errorGetBarcode = false
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
            universalToast(payload, 'warning', {
                position: 'bottom-right',
                autoClose: 2000,
            })
            state.loading = false
            state.barcode = ''
            state.errorGetBarcode = true
        },
    },
})

export const {clearErrorGetBarcode} = barcodeSlice.actions
export default barcodeSlice.reducer
