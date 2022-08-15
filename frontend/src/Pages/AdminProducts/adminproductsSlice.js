import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api.js'
import {universalToast} from '../../Components/ToastMessages/ToastMessages.js'

export const getMarkets = createAsyncThunk(
    'adminproducts/getMarkets',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/administrator/getmarkets', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const getMarketsByFilter = createAsyncThunk(
    'adminproducts/getMarketsByFilter',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/administrator/getmarkets', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }

    })

export const getBranchesByFilter = createAsyncThunk(
    'adminproducts/getBranchesByFilter',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/administrator/getmarketcontrols', body)
            console.log(data)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const createMarket = createAsyncThunk(
    'adminproducts/createMarket',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/market/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const createDirector = createAsyncThunk(
    'adminproducts/createDirector',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/director/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const adminproductsSlice = createSlice({
    name: 'adminmarkets',
    initialState: {
        markets: [],
        total: 0,
        branches: [],
        searchedMarkets: [],
        searchedBranches: [],
        totalSearchedBranches: 0,
        totalSearched: 0,
        loadingGetMarkets: true,
        errorGetMarkets: null,
        loadingCreateMarket: false,
        errorCreateMarket: null,
        loadingCreateDirector: false,
        errorCreateDirector: null,
        loadingGetBranches: false,
        errorGetBranches: null
    },
    reducers: {
        clearSearchedMarkets: (state) => {
            state.searchedMarkets = []
            state.totalSearched = 0
        },
        clearSearchedBranches: (state) => {
            state.searchedBranches = []
            state.totalSearchedBranches = 0
        }
    },
    extraReducers: {
        [getMarkets.pending]: (state) => {
            state.loadingGetMarkets = true
        },
        [getMarkets.fulfilled]: (state, {payload: {markets, count}}) => {
            if (state.searchedMarkets.length > 0) {
                state.searchedMarkets = markets
                state.totalSearched = count
            } else {
                state.markets = markets
                state.total = count
            }
            state.loadingGetMarkets = false
        },
        [getMarkets.rejected]: (state, {payload}) => {
            state.errorGetMarkets = payload
            state.loadingGetMarkets = false
            universalToast(payload, 'error')
        },
        [getMarketsByFilter.pending]: (state) => {
            state.loadingGetMarkets = true
        },
        [getMarketsByFilter.fulfilled]: (state, {payload: {markets, count}}) => {
            state.searchedMarkets = markets
            state.totalSearched = count
            state.loadingGetMarkets = false
        },
        [getMarketsByFilter.rejected]: (state, {payload}) => {
            universalToast(payload, 'error')
            state.loadingGetMarkets = false
        },
        [createMarket.pending]: (state) => {
            state.loadingCreateMarket = true
        },
        [createMarket.rejected]: (state, {payload}) => {
            state.loadingCreateMarket = false
            universalToast(payload, 'error')
        },
        [createDirector.pending]: (state) => {
            state.loadingCreateDirector = true
        },
        [createDirector.rejected]: (state, {payload}) => {
            state.loadingCreateDirector = false
            universalToast(payload, 'error')
        },
        [getBranchesByFilter.pending]: (state) => {
            state.loadingGetBranches = true
        },
        [getBranchesByFilter.fulfilled]: (state, {payload: {branches, count}}) => {
            state.searchedBranches = branches
            state.totalSearchedBranches = count
            state.loadingGetBranches = false
        },
        [getBranchesByFilter.rejected]: (state, {payload}) => {
            universalToast(payload, 'error')
            state.loadingGetBranches = false
        }
    }
})
export const {clearSearchedMarkets, clearSearchedBranches} = adminproductsSlice.actions
export default adminproductsSlice.reducer