import axiosClient from './axiosClient';

const placeApi = {
  addPlace(data) {
    return axiosClient.post('/places', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getAllPlaceOfUser() {
    return axiosClient.get('/places');
  },
  getOnePlace(placeId) {
    return axiosClient.get(`/places/${placeId}`);
  }
};
export default placeApi;
