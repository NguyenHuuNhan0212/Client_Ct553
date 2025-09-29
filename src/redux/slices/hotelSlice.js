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

const placeSlice = createSlice({
  name: 'hotel',
  initialState: {
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
      });
  }
});
export default placeSlice.reducer;
