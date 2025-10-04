import axiosClient from './axiosClient';

const hotelApi = {
  getOneHotel(hotelId) {
    return axiosClient.get(`/places/${hotelId}`);
  },
  getDetailHotelByReqUser(data) {
    return axiosClient.get(
      `places/hotel/${data.hotelId}?checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  },
  getHotelsNearPlace(data) {
    return axiosClient.get(`/places/near-hotels?address=${data.address}`);
  },
  searchHotels(data) {
    return axiosClient.get(
      `/places/hotels/search?location=${data.location}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  }
};
export default hotelApi;
