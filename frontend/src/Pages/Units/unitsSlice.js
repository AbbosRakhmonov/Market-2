import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../Config/Api";

export const getUnits = createAsyncThunk(
    'units/getUnits',
    async (body = {}, {rejectWithValue}) => {
        try {
            const {data} = await Api.post("products/unit/getall", body);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    })

const unitsSlice = createSlice({
    name: "units",
    initialState: {
        units: [],
        loading: false,
        errorUnits: null
    },
    reducers: {
        clearErrorUnits: (state) => {
            state.error = null;
        }
    },
    extraReducers: {
        [getUnits.pending]: (state) => {
            state.loading = true;
        },
        [getUnits.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.units = payload;
        },
        [getUnits.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        }
    },
});

export const {clearErrorUnits} = unitsSlice.actions;
export default unitsSlice.reducer;