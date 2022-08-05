import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api'

export const getConnectors = createAsyncThunk(
    'inventories/getConnectors',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/inventory/connectors', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const inventoryConnectorsSlice = createSlice({
    name: 'inventories',
    initialState: {
        connectors: [],
        total: 0,
        loading: false,
        errorConnectors: null,
    },
    reducers: {
        clearErrorConnectors: (state) => {
            state.errorConnectors = null
        },
    },
    extraReducers: {
        [getConnectors.pending]: (state) => {
            state.loading = true
        },
        [getConnectors.fulfilled]: (state, {payload: {connectors, count}}) => {
            state.loading = false
            state.connectors = connectors
            state.total = count
        },
        [getConnectors.rejected]: (state, {payload}) => {
            state.loading = false
            state.errorConnectors = payload
        },
    },
})

export const {clearErrorConnectors} = inventoryConnectorsSlice.actions
export default inventoryConnectorsSlice.reducer
