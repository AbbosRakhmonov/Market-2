import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Config/Api";

export const getCurrency = createAsyncThunk(
    "currency/getCurrency",
    async (body, {rejectWithValue}) => {
        try {
            const {data:{exchangerate}} = await Api.post("/exchangerate/get");
            return exchangerate;
        } catch (error) {
            return rejectWithValue(error);
        }
    });

export const getCurrencyType = createAsyncThunk(
    "currency/getCurrencyType",
    async (body, {rejectWithValue}) => {
        try {
            const {data: {currency}} = await Api.post("/exchangerate/currencyget");
            return currency;
        } catch (error) {
            return rejectWithValue(error);
        }
    })

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currency: null,
        currencies: [],
        currencyType: "",
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: {
        [getCurrency.pending]: (state) => {
            state.loading = true;
        },
        [getCurrency.fulfilled]: (state, action) => {
            state.loading = false;
            state.currency = action.payload;
        },
        [getCurrency.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getCurrencyType.pending]: (state) => {
            state.loading = true;
        },
        [getCurrencyType.fulfilled]: (state, action) => {
            state.loading = false;
            state.currencyType = action.payload;
        },
        [getCurrencyType.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const {clearError} = currencySlice.actions;
export default currencySlice.reducer;