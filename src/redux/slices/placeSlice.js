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
export const getOnePlace = createAsyncThunk(
  'place/getOnePlace',
  async (id, { rejectWithValue }) => {
    try {
      const res = await placeApi.getOnePlace(id);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getAllPlace = createAsyncThunk(
  'place/getAllPlace',
  async (_, { rejectWithValue }) => {
    try {
      const res = await placeApi.getAll();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getPlacesByAddressAndType = createAsyncThunk(
  'place/getPlacesByAddress',
  async (data, { rejectWithValue }) => {
    try {
      const res = await placeApi.getPlaceByAddressAndType(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
const placeSlice = createSlice({
  name: 'place',
  initialState: {
    type: null,
    placesOffUser: [],
    places: [],
    currentPlace: null,
    loading: false
  },
  reducers: {
    setPlaceType: (state, action) => {
      state.type = action.payload.type;
    },
    resetPlaceType: (state) => {
      state.type = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlaceOfUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlaceOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.placesOffUser = action.payload;
      })
      .addCase(getAllPlaceOfUser.rejected, (state) => {
        state.loading = false;
        state.placesOffUser = [];
      })
      .addCase(getOnePlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOnePlace.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlace = action.payload;
      })
      .addCase(getAllPlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(getAllPlace.rejected, (state) => {
        state.loading = false;
        state.places = [];
      })
      .addCase(getPlacesByAddressAndType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlacesByAddressAndType.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload.places;
      })
      .addCase(getPlacesByAddressAndType.rejected, (state) => {
        state.loading = false;
      });
  }
});
export const { setPlaceType, resetPlaceType } = placeSlice.actions;
export default placeSlice.reducer;
