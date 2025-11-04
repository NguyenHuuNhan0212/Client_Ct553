import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import chatApi from '../../apis/chatService';

export const sendMessageToAI = createAsyncThunk(
  'chat/sendMessageToAI',
  async (data, { rejectWithValue }) => {
    try {
      const res = await chatApi.sendMessage(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Lỗi khi gửi tin nhắn');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chat: [
      {
        sender: 'bot',
        text: 'Xin chào! 🤖 Tôi là Trợ lý Du lịch AI 🌴. Hãy hỏi tôi về các điểm đến, khách sạn hay lịch trình du lịch nhé!',
        isTripPlan: false
      }
    ],
    loading: false,
    error: null,
    tripPlan: null,
    city: null
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.chat.push({ sender: 'user', text: action.payload });
    },
    clearChat: (state) => {
      state.chat = [];
    },
    clearIsTripPlan: (state) => {
      state.chat = state.chat?.map((msg) => ({ ...msg, isTripPlan: false }));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        state.tripPlan = payload.tripPlan ? action.payload.tripPlan : null;
        state.city = action.payload.city ? action.payload.city : null;

        if (payload.type === 'places') {
          state.chat.push({
            sender: 'bot',
            type: 'places',
            placeType: payload.placeType,
            city: payload.city,
            data: payload.data
          });
        } else if (payload.type === 'place_info') {
          state.chat.push({
            sender: 'bot',
            type: 'place_info',
            data: payload.data
          });
        } else {
          state.chat.push({
            sender: 'bot',
            text: payload.answer,
            isTripPlan: payload.isTripPlan ? true : false
          });
        }
      })
      .addCase(sendMessageToAI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addUserMessage, clearChat, clearIsTripPlan } = chatSlice.actions;
export default chatSlice.reducer;
