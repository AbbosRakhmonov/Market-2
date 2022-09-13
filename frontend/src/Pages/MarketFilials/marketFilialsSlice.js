import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api.js'

export const getAllFilials = createAsyncThunk(
    'marketFilials/getAllFilials',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post(
                'filialproducts/filials/getallfilials',
                body
            )
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const marketFilialsSlice = createSlice({
    name: 'marketFilials',
    initialState: {
        allFilials: [],
        loading: false,
        errorGetFilials: null,
    },
    reducers: {
        clearGetFilials: (state) => {
            state.errorGetFilials = null
        },
    },
    extraReducers: {
        [getAllFilials.pending]: (state) => {
            state.loading = true
        },
        [getAllFilials.fulfilled]: (state, {payload: {filials}}) => {
            state.loading = false
            state.allFilials = filials
        },
        [getAllFilials.rejected]: (state, {payload}) => {
            console.log('Yana xato')
            console.log(payload)
            state.loading = false
            state.errorGetFilials = payload
        },
    },
})

export const {clearGetFilials} = marketFilialsSlice.actions
export default marketFilialsSlice.reducer
