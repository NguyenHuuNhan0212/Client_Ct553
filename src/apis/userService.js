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
  },
  getStatsUser() {
    return axiosClient.get('/users/stats');
  },
  getQuantityAccountAwaitConfirm() {
    return axiosClient.get('/users/upgrade');
  },
  confirmUpgradeToProvider(userId) {
    return axiosClient.post(`/users/upgrade/confirm/${userId}`);
  },
  rejectUpgradeToProvider(userId) {
    return axiosClient.post(`/users/upgrade/reject/${userId}`);
  },
  getAllUser() {
    return axiosClient.get('/users');
  },
  getAllSupplier() {
    return axiosClient.get('/users/supplier');
  },
  getAllPlacesChat() {
    return axiosClient.get('/places/chat');
  },
  getAllChatUserToProvider(placeId) {
    return axiosClient.get(`/chat/user-to-provider/${placeId}`);
  }
};
export default userApi;
