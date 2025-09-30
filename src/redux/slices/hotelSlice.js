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
const placeSlice = createSlice({
  name: 'hotel',
  initialState: {
    searchResults: [],
    hasSearched: false,
    currentHotel: null,
    loading: false
  },
  reducers: [],
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
      });
  }
});
export default placeSlice.reducer;
