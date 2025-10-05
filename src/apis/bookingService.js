import axiosClient from './axiosClient';

const bookingApi = {
  bookingRoomType(data) {
    return axiosClient.post('/bookings', data);
  },
  getBookings() {
    return axiosClient.get('/bookings');
  },
  getBookingDetail(bookingId) {
    return axiosClient.get(`/bookings/${bookingId}`);
  }
};
export default bookingApi;
