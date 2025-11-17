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
    return axiosClient.get('/places/my-services');
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
    return axiosClient.put(`/places/${placeId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getPlaceByAddressAndType(data) {
    return axiosClient.get(
      `/places/relative?address=${data.address}&type=${data.type}`
    );
  },
  getPlacesPopularByType(type) {
    return axiosClient.get(`/places?type=${type}`);
  },
  getPlacesPopular() {
    return axiosClient.get(`/places/popular`);
  },
  addPlaceFavorite(data) {
    return axiosClient.post(`/places/favorite`, data);
  },
  removePlaceFavorite(data) {
    return axiosClient.delete(`/places/favorite/${data.placeId}`);
  },
  getPlacesFavorite() {
    return axiosClient.get('/places/favorite');
  },
  getStatsPlace() {
    return axiosClient.get('/places/stats');
  },
  getPlacesAwaitApprove() {
    return axiosClient.get('/places/await-approve');
  },
  approvePlace(placeId) {
    return axiosClient.patch(`/places/approve/${placeId}`);
  },
  getAllAdmin() {
    return axiosClient.get('/places/admin');
  },
  rejectPlace(placeId) {
    return axiosClient.patch(`/places/reject/${placeId}`);
  },
  getAllPlaceRejected() {
    return axiosClient.get('/places/rejected');
  },
  getAllPlaceHaveMessage() {
    return axiosClient.get('/places/chats');
  }
};
export default placeApi;
