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
    tripPlan: null
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.chat.push({ sender: 'user', text: action.payload });
    },
    clearChat: (state) => {
      state.chat = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.loading = false;
        state.chat.push({
          sender: 'bot',
          text: action.payload.answer,
          isTripPlan: action.payload.isTripPlan ? true : false
        });
        state.tripPlan = action.payload.tripPlan
          ? action.payload.tripPlan
          : null;
      })
      .addCase(sendMessageToAI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addUserMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
