import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hotelApi from '../../apis/hotelService';

export const getOneHotel = createAsyncThunk(
  'hotel/getOneHotel',
  async (id, { rejectWithValue }) => {
    try {
      const res = await hotelApi.getOneHotel(id);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const searchHotels = createAsyncThunk(
  'hotel/searchHotels',
  async (data, { rejectWithValue }) => {
    try {
      const res = await hotelApi.searchHotels(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getDetailHotelByReqUser = createAsyncThunk(
  'hotel/getDetailHotelByReqUser',
  async (data, { rejectWithValue }) => {
    try {
      const res = await hotelApi.getDetailHotelByReqUser(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    searchResults: [],
    hasSearched: false,
    currentHotel: null,
    checkIn: null,
    location: null,
    checkOut: null,
    guests: 1,
    loading: false
  },
  reducers: {
    setStateBooking: (state, action) => {
      state.location = action.payload.location;
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
      state.guests = action.payload.guests;
    },
    resetStateBooking: (state) => {
      state.checkIn = null;
      state.checkOut = null;
      state.location = null;
      state.hasSearched = false;
      state.guests = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHotel = action.payload;
      })
      .addCase(getOneHotel.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.hasSearched = true;
      })
      .addCase(searchHotels.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDetailHotelByReqUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailHotelByReqUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHotel = action.payload;
      })
      .addCase(getDetailHotelByReqUser.rejected, (state) => {
        state.loading = false;
      });
  }
});
export const { setStateBooking, resetStateBooking } = hotelSlice.actions;
export default hotelSlice.reducer;
