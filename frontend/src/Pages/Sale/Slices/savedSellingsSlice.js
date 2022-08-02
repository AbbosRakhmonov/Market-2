import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Api from '../../../Config/Api.js'
import {deleteError} from '../../../App/globalFunctions.js'
import {successDeleteTemporary, universalToast} from '../../../Components/ToastMessages/ToastMessages.js'

export const getSavedPayments = createAsyncThunk(
    'registerSelling/getSavedPayments',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/temporary/get')
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const deleteSavedPayment = createAsyncThunk(
    'registerSelling/deleteSavedPayment',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/temporary/delete', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

const savedSellingsSlice = createSlice({
    name: 'savedSellings',
    initialState: {
        savedPayments: [],
        getLoading: true,
        deleteLoading: false,
        deleteError: null,
        getError: null
    },
    extraReducers: {
        [getSavedPayments.pending]: (state) => {
            state.getLoading = true
        },
        [getSavedPayments.fulfilled]: (state, {payload}) => {
            state.getLoading = false
            state.savedPayments = payload
        },
        [getSavedPayments.rejected]: (state, {payload}) => {
            state.getLoading = false
            state.getError = payload
            universalToast(payload, 'error')
            deleteError(state, 'getError')
        },
        [deleteSavedPayment.pending]: (state) => {
            state.deleteLoading = true
        },
        [deleteSavedPayment.fulfilled]: (state, {payload}) => {
            state.deleteLoading = false
            state.savedPayments = payload
            successDeleteTemporary()
        },
        [deleteSavedPayment.rejected]: (state, {payload}) => {
            state.deleteLoading = false
            state.deleteError = payload
            universalToast(payload, 'error')
            deleteError(state, 'deleteError')
        }
    }
})

export default savedSellingsSlice.reducer