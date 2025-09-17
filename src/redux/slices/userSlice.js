import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../apis/userService';
import { toast } from 'react-toastify';

export const getInfoUser = createAsyncThunk(
  'user/getInfoUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await userApi.getUserById();
      localStorage.setItem('username', JSON.stringify(res.fullName));
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const uploadAvatar = createAsyncThunk(
  'auth/avatar',
  async (data, { rejectWithValue }) => {
    try {
      const res = await userApi.uploadAvatar(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data, { rejectWithValue }) => {
    try {
      const res = await userApi.updateProfile(data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changPassword',
  async (data, { rejectWithValue }) => {
    try {
      const res = await userApi.changePassword(data);
      toast.success('Đổi mật khẩu thành công.');
      return res;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đổi mật khẩu thất bại.');
      return rejectWithValue(err.response?.data.message);
    }
  }
);
export const upgradeToProvider = createAsyncThunk(
  'user/upgradeToProvider',
  async (data, { rejectWithValue }) => {
    try {
      const res = await userApi.upgradeToProvider(data);
      toast.success(res.message || 'Đăng ký nhà cung cấp thành công.');
      return res;
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || 'Đăng ký thất bại.');
      return rejectWithValue(err.response?.data?.message);
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    avatar: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.avatar = action.payload.avatarUrl;
      })
      .addCase(getInfoUser.rejected, (state) => {
        state.user = null;
      })
      // AVATAR
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.avatar = action.payload.avatarUrl;
        if (state.user) {
          state.user.avatarUrl = action.payload.avatarUrl;
        }
      });
  }
});

export default userSlice.reducer;
