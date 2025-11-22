import axiosClient from './axiosClient';

const messageApi = {
  getMessages(data) {
    return axiosClient.get(`/messages/${data.placeId}/${data.friendId}`);
  },
  getAllChatUserToProvider(placeId) {
    return axiosClient.get(`/chat/user-to-provider/${placeId}`);
  },
  getAllPlaceHaveMessage() {
    return axiosClient.get('/places/chats');
  },
  getAllPlacesChat() {
    return axiosClient.get('/places/chat');
  }
};
export default messageApi;
