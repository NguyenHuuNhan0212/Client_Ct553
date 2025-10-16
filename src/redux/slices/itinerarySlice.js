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
export const getAllItineraryByUserId = createAsyncThunk(
  'itinerary/getAllByUserId',
  async (_, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.getAllItineraryByUserId();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getItineraryDetail = createAsyncThunk(
  'itinerary/getItineraryDetail',
  async (itineraryId, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.getItineraryDetail(itineraryId);
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
    itinerariesOfUser: [],
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
      })
      .addCase(getAllItineraryByUserId.fulfilled, (state, action) => {
        state.itinerariesOfUser = action.payload.itineraries;
        state.loading = false;
      })
      .addCase(getAllItineraryByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllItineraryByUserId.rejected, (state) => {
        state.loading = false;
        state.itinerariesOfUser = [];
      })
      .addCase(getItineraryDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItinerary = action.payload;
      })
      .addCase(getItineraryDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItineraryDetail.rejected, (state) => {
        state.loading = false;
        state.currentItinerary = null;
      });
  }
});

export default itinerarySlice.reducer;
