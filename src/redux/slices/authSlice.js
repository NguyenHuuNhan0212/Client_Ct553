import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../apis/authService';
import { toast } from 'react-toastify';
import { getInfoUser } from './userSlice';

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
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    username: JSON.parse(localStorage.getItem('username')) || null,
    loading: false
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('refreshToken');
      window.location.replace('/');
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
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
