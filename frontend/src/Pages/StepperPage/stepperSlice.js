import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {universalToast} from '../../Components/ToastMessages/ToastMessages'
import Api from '../../Config/Api'

export const sendCropImg = createAsyncThunk(
    'steppers/sendCropImg',
    async (body, {rejectWithValue}) => {
        try {
            const res = await fetch('http://localhost:8801/api/upload', {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body,
            }).then((res) => console.log('data: ', res))
            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addShop = createAsyncThunk(
    'steppers/addShop',
    async (body, {rejectWithValue}) => {
        try {
            console.log('Body : ', body)
            const {data} = await Api.post('/market/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const addDirector = createAsyncThunk(
    'steppers/addDirector',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/director/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const stepperSlice = createSlice({
    name: 'steppers',
    initialState: {
        stepImgName: '',
        steppers: [],
        stepLoading: false,
        errorStepper: null,
        successAddShop: false,
        successAddDirector: false,
    },
    reducers: {
        clearErrorStepper: (state) => {
            state.errorStepper = null
        },
        clearSuccessAddShop: (state) => {
            state.successAddShop = false
        },
        clearSuccessAddDirector: (state) => {
            state.successAddDirector = false
        },
    },
    extraReducers: {
        [sendCropImg.pending]: (state) => {
            state.stepLoading = true
        },
        [sendCropImg.fulfilled]: (state, {payload}) => {
            state.stepLoading = false
            state.stepImgName = payload
        },
        [sendCropImg.rejected]: (state) => {
            state.stepLoading = false
        },
        [addShop.pending]: (state) => {
            state.stepLoading = true
        },
        [addShop.fulfilled]: (state, {payload}) => {
            state.stepLoading = false
            state.steppers = payload
        },
        [addShop.rejected]: (state, {payload}) => {
            state.stepLoading = false
            universalToast(payload, 'error')
        },
        [addDirector.pending]: (state) => {
            state.stepLoading = true
        },
        [addDirector.fulfilled]: (state, {payload}) => {
            state.stepLoading = false
            state.steppers = payload
        },
        [addDirector.rejected]: (state) => {
            state.stepLoading = false
        },
    },
})

export const {clearErrorStepper, clearSuccessAddShop, clearSuccessAddDirector} =
    stepperSlice.actions
export default stepperSlice.reducer
