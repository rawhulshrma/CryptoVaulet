// authActions.js
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `http://localhost:8080/api`;


export const signMessage = async (provider) => {
  try {
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const message = "Welcome to Crypto Vault Website";
    const signature = await signer.signMessage(message);
    return { signature, address };
  } catch (error) {
    throw new Error('Failed to sign message');
  }
};

export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ provider }, { rejectWithValue }) => {
    try {
      const { signature, address } = await signMessage(provider);
      
      const response = await axios.post(`${API_URL}/authentication`, 
        { signature },
        { 
          params: { address },
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userAddress', address);
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userAddress');
      return { success: true };
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);


export const clearErrors = createAction('auth/clearErrors');
export const clearMessages = createAction('auth/clearMessages');