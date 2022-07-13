import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    userId: null,
    user: null,
    market: null,
    login: noop,
    loginAdministrator: noop,
    logout: noop,
    isAuthenticated: false,
    administrator: null,
  },
  reducers: {
    setUser(state, action) {},
  },
});
