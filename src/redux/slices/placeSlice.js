import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import placeApi from '../../apis/placeService';

export const getAllPlaceOfUser = createAsyncThunk(
  'place/getAllForUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await placeApi.getAllPlaceOfUser();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const placeSlice = createSlice({
  name: 'place',
  initialState: {
    places: [],
    loading: false
  },
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlaceOfUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlaceOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload.places;
      })
      .addCase(getAllPlaceOfUser.rejected, (state) => {
        state.loading = false;
        state.places = [];
      });
  }
});
export default placeSlice.reducer;
