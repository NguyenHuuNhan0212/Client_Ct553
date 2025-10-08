// bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingApi from '../../apis/bookingService';

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (data, { rejectWithValue }) => {
    try {
      const res = await bookingApi.bookingRoomType(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getBookings = createAsyncThunk(
  'booking/getBookings',
  async (_, { rejectWithValue }) => {
    try {
      const res = await bookingApi.getBookings();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getBookingDetail = createAsyncThunk(
  'booking/getBookingDetail',
  async (id, { rejectWithValue }) => {
    try {
      const res = await bookingApi.getBookingDetail(id);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getAllForSupplier = createAsyncThunk(
  'booking/getAllForSupplier',
  async (_, { rejectWithValue }) => {
    try {
      const res = await bookingApi.getAllServiceBookingsOfSupplier();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    currentBooking: null,
    bookings: [],
    bookingsOfSupplier: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Lỗi đặt phòng';
      })
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(getBookings.rejected, (state) => {
        state.loading = false;
        state.bookings = [];
      })
      .addCase(getBookingDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(getBookingDetail.rejected, (state) => {
        state.loading = false;
        state.currentBooking = null;
      })
      .addCase(getAllForSupplier.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllForSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingsOfSupplier = action.payload.bookings;
      })
      .addCase(getAllForSupplier.rejected, (state) => {
        state.loading = false;
        state.bookingsOfSupplier = [];
      });
  }
});

export default bookingSlice.reducer;
