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
  },
  deleteBooking(bookingId) {
    return axiosClient.delete(`/bookings/${bookingId}`);
  },
  cancelBooking(bookingId) {
    return axiosClient.patch(`/bookings/${bookingId}`);
  },
  getAllServiceBookingsOfSupplier() {
    return axiosClient.get('/bookings/supplier');
  }
};
export default bookingApi;
