import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import itineraryApi from '../../apis/itineraryService';

export const createItinerary = createAsyncThunk(
  'itinerary/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.createItinerary(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState: {
    currentItinerary: null,
    itinerary: [],
    loading: false
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(createItinerary.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItinerary = action.payload;
      })
      .addCase(createItinerary.rejected, (state) => {
        state.loading = false;
        state.currentItinerary = null;
      });
  }
});

export default itinerarySlice.reducer;
