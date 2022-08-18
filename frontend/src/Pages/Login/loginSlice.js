import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/Api'
import {successEditProfile, successLoggedIn, universalToast} from '../../Components/ToastMessages/ToastMessages'

const bcryptjs = require('bcryptjs')

const types = ['Admin', 'Director', 'Seller']

export const signIn = createAsyncThunk(
    'login/signIn',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {
                data: {token, user, market}
            } = await Api.post('/user/login', body)
            return {
                token: token,
                user: user,
                market: market
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const editProfileImage = createAsyncThunk(
    'login/editProfileImage',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/upload', body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    })

export const editUser = createAsyncThunk(
    'login/editUser',
    async (body, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/user/edit', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


const slice = createSlice({
    name: 'login',
    initialState: {
        user: null,
        market: null,
        logged: false,
        loading: false,
        error: null
    },
    reducers: {
        logIn: (state, {payload: {user, market}}) => {
            state.logged = true
            state.user = user
            state.market = market
        },
        logOut: (state, {payload}) => {
            localStorage.removeItem('userData')
            state.logged = false
            state.user = null
            state.market = null
            state.error = payload
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: {
        [signIn.pending]: (state) => {
            state.loading = true
        },
        [signIn.fulfilled]: (state, {payload}) => {
            const newObj = {
                ...payload,
                user: {
                    ...payload.user,
                    type: bcryptjs.compareSync(types[0], payload.user.type) ? types[0] : bcryptjs.compareSync(types[1], payload.user.type) ? types[1] : types[2]
                }
            }
            state.loading = false
            state.logged = true
            state.user = newObj.user
            state.market = payload.market
            localStorage.setItem('userData', JSON.stringify(newObj))
            successLoggedIn()
        },
        [signIn.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },
        [editProfileImage.rejected]: (state, {payload}) => {
            universalToast(payload, 'error')
        },
        [editUser.pending]: (state) => {
            state.loading = true
        },
        [editUser.fulfilled]: (state, {payload}) => {
            const prevUser = JSON.parse(localStorage.getItem('userData'))
            const newUser = {
                ...prevUser,
                user: payload
            }
            localStorage.setItem('userData', JSON.stringify(newUser))
            state.loading = false
            state.user = payload
            successEditProfile()
        },
        [editUser.rejected]: (state, {payload}) => {
            state.loading = false
            universalToast(payload, 'error')
        }
    }
})

export const {logOut, logIn, clearError} = slice.actions
export default slice.reducer
