import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messageApi from '../../apis/messageService';

export const getAllMessageManage = createAsyncThunk(
  'message/get-manage',
  async (_, { rejectWithValue }) => {
    try {
      const res = await messageApi.getAllPlaceHaveMessage();
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || 'Lỗi khi lấy địa điểm có tin nhắn'
      );
    }
  }
);

export const getAllMessageUser = createAsyncThunk(
  'message/get-user',
  async (_, { rejectWithValue }) => {
    try {
      const res = await messageApi.getAllPlacesChat();
      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || 'Lỗi khi lấy địa điểm đã nhắn tin'
      );
    }
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    totalMessageOfUserUnRead: 0,
    messagesUser: [],
    messagesManage: [],
    totalMessageOfManagementUnRead: 0
  },
  reducers: {
    setTotalMessageUnreadUser: (state) => {
      state.totalMessageOfUserUnRead = state.messagesUser?.reduce(
        (acc, crr) => acc + (crr?.unread || 0),
        0
      );
    },
    setTotalMessageUnreadManage: (state) => {
      state.totalMessageOfManagementUnRead = state.messagesManage?.reduce(
        (acc, crr) => acc + (crr?.unread || 0),
        0
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessageManage.fulfilled, (state, action) => {
        state.messagesManage = action.payload;
      })
      .addCase(getAllMessageManage.rejected, (state) => {
        state.messagesManage = [];
      })
      .addCase(getAllMessageUser.fulfilled, (state, action) => {
        state.messagesUser = action.payload;
      })
      .addCase(getAllMessageUser.rejected, (state) => {
        state.messagesUser = [];
      });
  }
});

export const { setTotalMessageUnreadManage, setTotalMessageUnreadUser } =
  messageSlice.actions;

export default messageSlice.reducer;
