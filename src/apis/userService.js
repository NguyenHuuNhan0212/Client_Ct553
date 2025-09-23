import axiosClient from './axiosClient';
const userApi = {
  getUserById() {
    return axiosClient.get('/my-profile');
  },
  uploadAvatar(data) {
    return axiosClient.post('/avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateProfile(data) {
    return axiosClient.patch('/update-profile', data);
  },
  changePassword(data) {
    return axiosClient.post('/change-password', data);
  },
  upgradeToProvider(data) {
    return axiosClient.post('/upgrade-to-provider', data);
  }
};
export default userApi;
