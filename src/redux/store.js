import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import placeSlice from './slices/placeSlice';
import hotelSlice from './slices/hotelSlice';
import bookingSlice from './slices/bookingSlice';
import itinerarySlice from './slices/itinerarySlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    place: placeSlice,
    hotel: hotelSlice,
    booking: bookingSlice,
    itinerary: itinerarySlice
  }
});
export default store;
