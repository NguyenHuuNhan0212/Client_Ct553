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
  },
  deleteBookingForSupplier(bookingId) {
    return axiosClient.delete(`/bookings/supplier/${bookingId}`);
  },
  confirmPayment(bookingId) {
    return axiosClient.patch(`bookings/confirm-payment/${bookingId}`);
  },
  createBookingInternal(data) {
    return axiosClient.post('/bookings/internal', data);
  },
  getStats() {
    return axiosClient.get('/bookings/stats');
  },
  cancelBookingForSupplier(bookingId) {
    return axiosClient.patch(`/bookings/supplier/${bookingId}`);
  },
  getRevenueByLocation(data) {
    const params = [];

    if (data?.from) params.push(`from=${data.from}`);
    if (data?.to) params.push(`to=${data.to}`);

    const queryString = params.length ? `?${params.join('&')}` : '';

    return axiosClient.get(`/bookings/revenue/by-location${queryString}`);
  },
  getRevenueByDate(params) {
    const query = params.date ? `?date=${params.date}` : '';
    return axiosClient.get(`/bookings/revenue/by-date${query}`);
  }
};
export default bookingApi;
