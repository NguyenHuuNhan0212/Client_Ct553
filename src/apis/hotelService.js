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
  getDetailHotelByReqUser(data) {
    return axiosClient.get(
      `/hotels/detail/${data.hotelId}?checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  },
  updateHotel(hotelId, data) {
    return axiosClient.put(`/hotels/${hotelId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  deleteHotel(hotelId) {
    return axiosClient.delete(`/hotels/${hotelId}`);
  },
  updateStatusActive(hotelId) {
    return axiosClient.patch(`/hotels/update-status-active/${hotelId}`);
  },
  getHotelsNearPlace(data) {
    return axiosClient.get(`/hotels/near-place?address=${data.address}`);
  },
  getHotelsRelative(data) {
    return axiosClient.get(
      `/hotels/relative?id=${data._id}&address=${data.address}`
    );
  },
  searchHotels(data) {
    return axiosClient.get(
      `/hotels/search?location=${data.location}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  }
};
export default hotelApi;
