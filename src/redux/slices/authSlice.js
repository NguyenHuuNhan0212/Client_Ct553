import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../apis/authService';
import { toast } from 'react-toastify';

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      toast.success('Đăng nhập thành công');
      return res; // giả sử API trả về user + token
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
    loading: false
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      toast.info('Đăng xuất thành công!');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  }
});
export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
