import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api'

export const getExchangeAll = createAsyncThunk(
    'exchangerate/getExchangerate',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/exchangerate/getall', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const addExchangerate = createAsyncThunk(
    'exchangerate/addExchangerate',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/exchangerate/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const updateExchangerate = createAsyncThunk(
    'exchangerate/updateExchangerate',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.put('/exchangerate/update', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const deleteExchangerate = createAsyncThunk(
    'exchangerate/deleteExchangerate',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.delete('/exchangerate/delete',{
                data : body
            })
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
const exchangerateSlice = createSlice({
    name: 'exchangerate',
    initialState: {
        exchangerate: [],
        loading: false,
        errorExchange: null,
        successAddExchange: false,
        successUpdateExchange: false,
        successDeleteExchange: false,
    },
    reducers: {
        clearErrorExchange: (state) => {
            state.errorExchange = null
        },
        clearSuccessAddExchange: (state) => {
            state.successAddExchange = false
        },
        clearSuccessUpdateExchange: (state) => {
            state.successUpdateExchange = false
        },
        clearSuccessDeleteExchange: (state) => {
            state.successDeleteExchange = false
        },
    },
    extraReducers: {
        [getExchangeAll.pending]: (state) => {
            state.loading = true
        },
        [getExchangeAll.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.exchangerate = payload
        },
        [getExchangeAll.rejected]: (state, {payload}) => {
            state.loading = false
            state.errorExchange = payload
        },
        [addExchangerate.pending]: (state) => {
            state.loading = true
        },
        [addExchangerate.fulfilled]: (state, {payload}) => {
            state.exchangerate.unshift(payload)
            state.loading = false
            state.successAddExchange = true
        },
        [addExchangerate.rejected]: (state, {payload}) => {
            state.loading = false
            state.errorExchange = payload
        },
        [updateExchangerate.pending]: (state) => {
            state.loading = true
        },
        [updateExchangerate.fulfilled]: (state, {payload}) => {
            state.exchangerate = state.exchangerate.map(item => {
                if (item._id === payload._id) {
                    return payload
                }
                return item
            })
            state.loading = false
            state.successUpdateExchange = true
        },
        [updateExchangerate.rejected]: (state, {payload}) => {
            state.loading = false
            state.errorExchange = payload
        },
        [deleteExchangerate.pending]: (state) => {
            state.loading = true
        },
        [deleteExchangerate.fulfilled]: (state, {payload}) => {
            state.exchangerate = state.exchangerate.filter((item) => item._id !== payload._id)
            state.loading = false
            state.successDeleteExchange = true
        },
        [deleteExchangerate.rejected]: (state, {payload}) => {
            state.loading = false
            state.errorExchange = payload
        },
    },
})
export const {
    clearErrorExchange,
    clearSuccessAddExchange,
    clearSuccessUpdateExchange,
    clearSuccessDeleteExchange,
} = exchangerateSlice.actions

export default exchangerateSlice.reducer

