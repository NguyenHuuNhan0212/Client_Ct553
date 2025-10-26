import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../apis/authService';
import { getInfoUser } from './userSlice';

export const login = createAsyncThunk(
  'auth/login',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('refreshToken', res.refreshToken);

      await dispatch(getInfoUser());

      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: sessionStorage.getItem('token') || null,
    username: JSON.parse(sessionStorage.getItem('username')) || null,
    loading: false
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.username = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('refreshToken');
      window.location.replace('/');
    },
    logoutForAdmin(state) {
      state.token = null;
      state.username = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('refreshToken');
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
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout, logoutForAdmin } = authSlice.actions;
export default authSlice.reducer;
