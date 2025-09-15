import axiosClient from './axiosClient';

const userApi = {
  getUserById() {
    return axiosClient.get('/my-profile');
  }
};
export default userApi;
