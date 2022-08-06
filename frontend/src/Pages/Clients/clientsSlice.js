import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Api from "../../Config/Api";
import {getPackmans} from './../Packman/packmanSlice'

export const getClients = createAsyncThunk(
    'clients/getClients',
    async (body , {rejectWithValue}) => {
        try {
          const {data} = await Api.post('/sales/client/getclients' , body)
       //   
          return data;
        } catch (error){
         return rejectWithValue(error)
        }
    }
)

export const addClients = createAsyncThunk(
    'clients/addClients',
    async (body , {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/client/register', body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateClients = createAsyncThunk(
    'clients/updateClients',
    async (body , {rejectWithValue}) => {
        try {
          const {data} = await Api.put('/sales/client/update', body)
          return data
        }
        catch (error){
          return rejectWithValue(error)
        }
    }
)

export const deleteClients = createAsyncThunk(
    'clients/deleteClients',
     async (body , {rejectWithValue}) => {
        try {
            const {data} = await Api.delete('/sales/client/delete', {
                data : body
            })
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const getClientsByFilter = createAsyncThunk(
    'clients/getClientsByFilter',
    async (body , {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/sales/client/getclients',body)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const clientsSlice = createSlice({
    name : "clients",
    initialState : {
      options:[],  
      clients : [],
      total : 0,
      searchedClients : [],
      totalSearched : 0,
      loading : false,
      errorClients : null,
      successAddClients : false,
      successUpdateClients : false,
      successDeleteClients : false
    },
    reducers : {
        clearErrorClients: (state) => {
            state.errorClients = null
        },
        clearSuccessAddClients : (state) => {
            state.successAddClients = false
        },
        clearSuccessUpdateClients : (state) => {
            state.successUpdateClients = false
        },
        clearSuccessDeleteClients : (state) => {
            state.successDeleteClients = false
        },
        clearSearchedClients : (state) => {
            state.searchedClients = []
            state.totalSearched = 0;
        }
    },
    extraReducers : {
        [getClients.pending] : (state) => {
            state.loading = true
        },
        [getClients.fulfilled] : (state, {payload : {clients, count}}) => {
            state.loading = false
            state.total = count
            state.clients = clients
        },
        [getPackmans.pending] : (state) => {
            state.loading = true
        },
        [getPackmans.fulfilled] : (state, {payload: {packmans, count}}) => {
            state.loading = false
            state.options = packmans
        },
        [getPackmans.rejected] : (state, {payload}) => {
            state.loading = false
            state.errorClients = payload
        },
        [getClients.rejected] : (state, {payload}) => {
            state.loading = false
            state.errorClients = payload
        },
        [getClientsByFilter.pending] : (state) => {
            state.loading = true
        },
        [getClientsByFilter.fulfilled] : (state, {payload : {clients, count}}) => {
            state.loading = false
            state.searchedClients = clients
            state.totalSearched = count
        },
        [getClientsByFilter.rejected] : (state, {payload}) => {
            state.loading = false
            state.errorClients= payload
        },
        [addClients.pending] : (state) => {
            state.loading = true
        },
        [addClients.fulfilled] : (state, {payload : {clients, count}}) => {
            state.loading = false
            state.successAddClients = true
            state.clients = clients
            state.total = count
        }, 
        [addClients.rejected] : (state , {payload}) => {
            state.loading = false
            state.errorClients = payload
        },
        [updateClients.pending] : (state) => {
            state.loading = true
        },
        [updateClients.fulfilled] : (state, {payload : {clients, count}}) => {
            state.loading = false
            state.total = count
            state.clients = clients
            state.successUpdateClients = true
        },
        [updateClients.rejected] : (state, {payload}) => {
            state.loading = false
            state.errorClients = payload
        },
        [deleteClients.pending] : (state) => {
            state.loading = true
        },
        [deleteClients.fulfilled] : (state, {payload : {clients, count}}) => {
            state.loading = false
            state.successDeleteClients = true
            state.total = count
            state.clients = clients
        },
        [deleteClients.rejected] : (state , {payload}) => {
            state.loading =false
            state.errorClients = payload
        },
    },
})

export const {
    clearErrorClients,
    clearSuccessAddClients,
    clearSuccessDeleteClients,
    clearSuccessUpdateClients,
    clearSearchedClients,
} = clientsSlice.actions;
export default clientsSlice.reducer