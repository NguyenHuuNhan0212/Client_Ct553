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
export const deleteItinerary = createAsyncThunk(
  'itinerary/deleteItinerary',
  async (itineraryId, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.deleteItinerary(itineraryId);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const getAllItineraryTemplate = createAsyncThunk(
  'itinerary/getAllItineraryTemplate',
  async (_, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.getAllItineraryTemplate();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateItinerary = createAsyncThunk(
  'itinerary/updateItinerary',
  async (data, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.updateItinerary(
        data.itineraryId,
        data.data
      );
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const createItineraryWithAI = createAsyncThunk(
  'itinerary/createWithAI',
  async (data, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.createItineraryWithAI(data);
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
    itineraryInfoAI: {
      title: null,
      startDate: null,
      destination: null,
      endDate: null,
      creatorName: null
    },
    tripPlan: null,
    itinerariesTemplate: [],
    itinerariesOfUser: [],
    isCopy: false,
    loading: false
  },
  reducers: {
    clearCurrentItinerary: (state) => {
      state.currentItinerary = null;
    },
    setIsCopy: (state) => {
      state.isCopy = true;
    },
    clearIsCopy: (state) => {
      state.isCopy = false;
    },
    setItineraryInfoAI: (state, action) => {
      state.itineraryInfoAI = {
        title: action.payload.title,
        startDate: action.payload.startDate,
        destination: action.payload.city,
        endDate: action.payload.endDate,
        creatorName: action.payload.creatorName
      };
    },
    clearItineraryInfoAI: (state) => {
      state.itineraryInfoAI = {
        title: null,
        startDate: null,
        destination: null,
        endDate: null,
        creatorName: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createItinerary.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItinerary.fulfilled, (state) => {
        state.loading = false;
        state.isCopy = false;
      })
      .addCase(createItinerary.rejected, (state) => {
        state.loading = false;
        state.currentItinerary = null;
        state.isCopy = false;
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
      })
      .addCase(deleteItinerary.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItinerary.fulfilled, (state) => {
        state.loading = false;
        state.currentItinerary = null;
      })
      .addCase(deleteItinerary.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllItineraryTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllItineraryTemplate.fulfilled, (state, action) => {
        state.itinerariesTemplate = action.payload;
        state.loading = false;
      })
      .addCase(getAllItineraryTemplate.rejected, (state) => {
        state.loading = false;
        state.itinerariesTemplate = [];
      })
      .addCase(updateItinerary.rejected, (state) => {
        state.currentItinerary = null;
      })
      .addCase(updateItinerary.fulfilled, (state) => {
        state.currentItinerary = null;
      })
      .addCase(createItineraryWithAI.fulfilled, (state, action) => {
        state.loading = false;
        state.tripPlan = action.payload;
      })
      .addCase(createItineraryWithAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItineraryWithAI.rejected, (state) => {
        state.loading = false;
        state.tripPlan = null;
      });
  }
});
export const {
  clearCurrentItinerary,
  setIsCopy,
  clearIsCopy,
  setItineraryInfoAI,
  clearItineraryInfoAI
} = itinerarySlice.actions;
export default itinerarySlice.reducer;
