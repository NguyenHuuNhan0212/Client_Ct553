import axiosClient from './axiosClient';

const hotelApi = {
  getOneHotel(hotelId) {
    return axiosClient.get(`/places/${hotelId}`);
  },
  getDetailHotelByReqUser(data) {
    return axiosClient.get(
      `/hotels/detail/${data.hotelId}?checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
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
