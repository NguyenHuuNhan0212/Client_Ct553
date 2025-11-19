import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 100000
});

const getAccessToken = () => sessionStorage.getItem('token');
const getRefreshToken = () => sessionStorage.getItem('refreshToken');

const refreshTokenLogic = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');

    const res = await axios.post(
      'http://localhost:3000/api/auth/refresh-token',
      {
        refreshToken
      }
    );

    const newAccessToken = res.data.token;
    sessionStorage.setItem('token', newAccessToken);
    return newAccessToken;
  } catch (error) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    const isAdmin = window.location.pathname.startsWith('/admin');
    window.location.href = isAdmin ? '/admin/login' : '/login';
    throw error;
  }
};

axiosClient.interceptors.request.use(
  async (config) => {
    let token = getAccessToken();

    if (token) {
      const decoded = jwtDecode(token);
      const date = new Date();

      if (decoded.exp < date.getTime() / 1000) {
        try {
          token = await refreshTokenLogic();
        } catch (error) {
          return Promise.reject(error);
        }
      }

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await refreshTokenLogic();
        axiosClient.defaults.headers.Authorization = 'Bearer ' + newAccessToken;
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
        return axiosClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
