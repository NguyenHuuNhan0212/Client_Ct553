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
    return axiosClient.get('/places/user');
  },
  getOnePlace(placeId) {
    return axiosClient.get(`/places/${placeId}`);
  },
  getAll() {
    return axiosClient.get('/places');
  },
  getPlaceRelative(data) {
    return axiosClient.get(
      `/places/relative?id=${data._id}&type=${data.type}&address=${data.address}`
    );
  },
  deletePlace(placeId) {
    return axiosClient.delete(`/places/${placeId}`);
  },
  updateStatusActive(placeId) {
    return axiosClient.patch(`/places/update-status-active/${placeId}`);
  },
  updatePlace(placeId, data) {
    return axiosClient.put(`/places/${placeId}`, data);
  }
};
export default placeApi;
