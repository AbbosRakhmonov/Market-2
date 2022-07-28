import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api'

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/products/category/getall', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        errorGetCategories: null,
    },
    reducers: {
        clearErrorGetCategories: (state) => {
            state.errorGetCategories = null
        },
    },
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.loading = true
        },
        [getCategories.fulfilled]: (state, {payload}) => {
            state.categories = payload
            state.loading = false
        },
        [getCategories.rejected]: (state, {payload}) => {
            state.errorGetCategories = payload
            state.loading = false
        },
    },
})

export const {clearErrorGetCategories} = categorySlice.actions
export default categorySlice.reducer
