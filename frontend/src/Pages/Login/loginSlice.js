import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api from "../../Config/Api";

const login = createAsyncThunk(
    'login/login',
    async (data, {rejectWithValue}) => {
        try {
            const response = await Api.post('/user/login', data);
            const {data} = response;
            return {
                userId: data.id,
                token: data.token,
                user: data.user,
                market: data.market,
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
        logged: false,
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