import axiosClient from './axiosClient';

const hotelApi = {
  addHotel(data) {
    return axiosClient.post('/hotels', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getOneHotel(hotelId) {
    return axiosClient.get(`/hotels/${hotelId}`);
  },
  updateHotel(hotelId, data) {
    return axiosClient.put(`/hotels/${hotelId}`, data);
  }
};
export default hotelApi;
