import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api from "../../Config/Api";

export const signIn = createAsyncThunk(
    'login/signIn',
    async (data, {rejectWithValue}) => {
        try {
            const {data: {token, user, market}} = await Api.post('/user/login', JSON.stringify(data));
            return {
                token: token,
                user: user,
                market: market,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const slice = createSlice({
    name: "login",
    initialState: {
        user: null,
        market: null,
        logged: false,
        loading: false,
        error: null
    },
    reducers: {
        logIn: (state, {user, market}) => {
            state.logged = true;
            state.user = user;
            state.market = market;
        },
        logOut: (state) => {
            localStorage.removeItem("userData");
            state.logged = false;
            state.user = null;
            state.market = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: {
        [signIn.pending]: (state,) => {
            state.loading = true;
        },
        [signIn.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.logged = true;
            state.user = payload.user;
            state.market = payload.market;
            localStorage.setItem("userData", JSON.stringify(payload));
        },
        [signIn.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        },
    },
})

export const {logOut, logIn, clearError} = slice.actions;
export default slice.reducer;