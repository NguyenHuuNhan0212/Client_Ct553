import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import placeReducer from './slices/placeSlice';
import hotelReducer from './slices/hotelSlice';
import bookingReducer from './slices/bookingSlice';
import itineraryReducer from './slices/itinerarySlice';
import chatReducer from './slices/chatSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    place: placeReducer,
    hotel: hotelReducer,
    booking: bookingReducer,
    itinerary: itineraryReducer,
    chat: chatReducer
  }
});
export default store;
