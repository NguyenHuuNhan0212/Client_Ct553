import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../apis/authService';
import userApi from '../../apis/userService';
import { toast } from 'react-toastify';

// === LOGIN ===
export const login = createAsyncThunk(
  'auth/login',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      localStorage.setItem('token', res.token);
      localStorage.setItem('refreshToken', res.refreshToken);

      await dispatch(getInfoUser());

      toast.success('Đăng nhập thành công');
      return res;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Đăng nhập thất bại');
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getInfoUser = createAsyncThunk(
  'auth/getInfoUser',
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
      return rejectWithValue(err);
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
      return rejectWithValue(err);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    username: JSON.parse(localStorage.getItem('username')) || null,
    loading: false,
    user: null,
    avatar: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      toast.success('Đăng xuất thành công!');
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })

      // GET USER INFO
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
