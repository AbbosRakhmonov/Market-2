import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import Api from "../../Config/Api"

export const getFilialShopData = createAsyncThunk(
     'filialExchanges/getFilialShopData',
      async (body, {rejectWithValue}) => {
        try {
           const {data} = await Api.post('/filialproducts/gettransfers', body) 
           return data
        }
        catch (error){
           return rejectWithValue(error);
        }
     }
) 

export const getExchangesFilterId = createAsyncThunk(
   'filialExchanges/getExchangesFilterId',
    async (body, {rejectWithValue}) => {
      try {
         const {data} = await Api.post('/filialproducts/gettransfers', body) 
         return data
      }
      catch (error){
         return rejectWithValue(error);
      }
   }
)




const FilialExchangesSlice = createSlice({
   name: 'filialExchanges',
   initialState: {
      shops: [],
      loading : false,
      errorShops : null,
      total : 0,
      totalSearched : 0, 
      searchedExchanges: [],
   },
   reducers : {
      clearErrorShops : (state) => {
         state.errorShops = null
      },
      clearSearchedExchanges : (state) => {
         state.searchedExchanges = []
         state.totalSearched = 0
      }
   },
   extraReducers : {
      [getFilialShopData.pending] : (state) => {
         state.loading = true
      },
      [getFilialShopData.fulfilled] : (state,  {payload : {count, data}}) => {
         state.loading = false
         state.searchedExchanges.length
         ? (state.searchedExchanges = data)
         : (state.shops = data)
        state.searchedExchanges.length
         ? (state.totalSearched = count)
         : (state.total = count)
      },
      [getFilialShopData.rejected] : (state, {payload}) => {
         state.loading = false
         state.errorShops = payload
      },
      [getExchangesFilterId.pending]: (state) => {
         state.loading = true
     },
     [getExchangesFilterId.fulfilled]: (
         state,
         {payload: {count, data}}
     ) => {
         state.loading = false
         state.searchedExchanges = data
         state.totalSearched = count
     },
     [getExchangesFilterId.rejected]: (state, {payload}) => {
         state.loading = false
         state.errorShops = payload
     },
   }
})

export const {
   clearErrorShops, 
   clearSearchedExchanges
} = FilialExchangesSlice.actions

export default FilialExchangesSlice.reducer


