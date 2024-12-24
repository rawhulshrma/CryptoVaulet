// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { authenticate, logout, clearErrors, clearMessages } from '../action/authAction';

const initialState = {
  token: localStorage.getItem('token'),
  userAddress: localStorage.getItem('userAddress'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  message: null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Authentication
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.userAddress = action.payload.user.user_address;
        state.message = action.payload.message;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
        state.userAddress = null;
      })
      // Clear states
      .addCase(clearErrors, (state) => {
        state.error = null;
      })
      .addCase(clearMessages, (state) => {
        state.message = null;
      });
  }
});

export default authSlice.reducer;