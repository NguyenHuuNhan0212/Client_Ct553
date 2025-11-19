import axiosClient from './axiosClient';

const messageApi = {
  getMessages(data) {
    return axiosClient.get(`/messages/${data.placeId}/${data.friendId}`);
  }
};
export default messageApi;
