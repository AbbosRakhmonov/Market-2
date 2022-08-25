import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {universalToast} from '../../Components/ToastMessages/ToastMessages'
import Api from '../../Config/Api'

export const getExchangesFilial = createAsyncThunk(
    'productExchanges/getExchangesFilial',
    async (body={}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/filialproducts/getfilials', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const sendingFilial = createAsyncThunk(
    'productExchanges/sendingFilial',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/filialproducts/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const productExchangesSlice = createSlice({
    name: 'productExchanges',
    initialState: {
        filialDatas: [],
        loading: false,
        errorProductExchanges: null,
    },
    reducers: {
        clearErrorProductExchanges: (state) => {
            state.errorPackmans = null
        },
    },
    extraReducers: {
        [getExchangesFilial.pending]: (state) => {
            state.loading = true
        },
        [getExchangesFilial.fulfilled]: (state, {payload: {filials}}) => {
            state.loading = false
            state.filialDatas = filials
        },
        [getExchangesFilial.rejected]: (state, {payload}) => {
            state.loading = false
            state.errorProductExchanges = payload
        },
        [sendingFilial.pending]: (state) => {
            state.loading = true
        },
        [sendingFilial.fulfilled]: (state, {payload: {filials}}) => {
            state.loading = false
        },
        [sendingFilial.rejected]: (state, {payload}) => {
            state.loading = false
            universalToast(`${payload}`, 'error')
            state.errorProductExchanges = payload
        },
    },
})

export const {clearErrorProductExchanges} = productExchangesSlice.actions
export default productExchangesSlice.reducer
