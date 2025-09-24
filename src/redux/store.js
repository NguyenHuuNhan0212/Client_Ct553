import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import placeSlice from './slices/placeSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    place: placeSlice
  }
});
export default store;
