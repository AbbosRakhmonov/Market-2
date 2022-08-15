import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../../Config/Api.js'
import {universalToast} from '../../../Components/ToastMessages/ToastMessages.js'

export const getSellings = createAsyncThunk(
    'sellings/getSellings',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post(
                '/sales/saleproducts/getconnectors',
                body
            )
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const getSellingsByFilter = createAsyncThunk(
    'sellings/getSellingsByFilter',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post(
                '/sales/saleproducts/getconnectors',
                body
            )
            return data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

const sellingsSlice = createSlice({
    name: 'sellings',
    initialState: {
        sellings: [],
        total: 0,
        totalSearched: 0,
        searchedSellings: [],
        getSellingsLoading: true,
        getSellingsError: null,
    },
    reducers: {
        clearSearchedSellings: (state) => {
            state.searchedSellings = []
            state.totalSearched = 0
        },
    },
    extraReducers: {
        [getSellings.pending]: (state) => {
            state.getSellingsLoading = true
        },
        [getSellings.fulfilled]: (
            state,
            {payload: {saleconnectors, count}}
        ) => {
            state.getSellingsLoading = false
            state.searchedSellings.length
                ? (state.searchedSellings = saleconnectors)
                : (state.sellings = saleconnectors)
            state.searchedSellings.length
                ? (state.totalSearched = count)
                : (state.total = count)
        },
        [getSellings.rejected]: (state, {payload}) => {
            universalToast(payload, 'error')
            state.getSellingsError = payload
            state.getSellingsLoading = false
            state.getSellingsError = null
        },
        [getSellingsByFilter.pending]: (state) => {
            state.getSellingsLoading = true
        },
        [getSellingsByFilter.fulfilled]: (
            state,
            {payload: {saleconnectors, count}}
        ) => {
            state.getSellingsLoading = false
            state.searchedSellings = saleconnectors
            state.totalSearched = count
        },
        [getSellingsByFilter.rejected]: (state, {payload}) => {
            universalToast(payload, 'error')
            state.getSellingsError = payload
            state.getSellingsLoading = false
            state.getSellingsError = null
        },
    },
})
export const {clearSearchedSellings} = sellingsSlice.actions
export default sellingsSlice.reducer
