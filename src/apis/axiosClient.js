import axios from 'axios';

// Tạo instance axios
const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api', // đổi theo backend của bạn
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10s
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (nếu có)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu gọn (response.data)
    return response.data;
  },
  (error) => {
    // Xử lý lỗi chung
    if (error.response) {
      console.error(
        'API Error:',
        error.response.data?.message || error.message
      );
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
