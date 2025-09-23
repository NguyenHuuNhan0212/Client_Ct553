import axiosClient from './axiosClient';

const placeApi = {
  addPlace(data) {
    return axiosClient.post('/places', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
export default placeApi;
