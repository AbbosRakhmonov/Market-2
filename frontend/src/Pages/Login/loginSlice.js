import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api from "../../Config/Api";

const login = createAsyncThunk(
    'login/login',
    async (data, {rejectWithValue}) => {
        try {
            const {id, token, user, market} = await Api.post('/user/login', data);
            return {
                userId: id,
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
        token: null,
        userId: null,
        user: null,
        market: null,
        logged: true,
        loading: false,
        error: null
    },
    reducers: {
        logOut: (state) => {
            localStorage.removeItem("userData");
            state.logged = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: {
        [login.pending]: (state,) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.logged = true;
            localStorage.setItem("userData", JSON.stringify(payload));
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    },
})

export const {logOut, clearError} = slice.actions;
export default slice.reducer;