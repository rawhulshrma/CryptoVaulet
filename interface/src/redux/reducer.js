// reducers.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';


export default combineReducers({
  auth: authReducer,

});