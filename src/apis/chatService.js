import axiosClient from './axiosClient';

const chatApi = {
  sendMessage(data) {
    return axiosClient.post('/chat/ask', data);
  }
};

export default chatApi;
