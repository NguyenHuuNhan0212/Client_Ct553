import axiosClient from './axiosClient';
const userApi = {
  getUserById() {
    return axiosClient.get('/my-profile');
  },
  uploadAvatar(data) {
    return axiosClient.post('http://localhost:3000/api/avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateProfile(data) {
    return axiosClient.patch('/update-profile', data);
  }
};
export default userApi;
