import axiosClient from './axiosClient';
const statsApi = {
  getStatsPlaceByType() {
    return axiosClient.get('/stats/admin/place-by-type');
  },
  getUsersSevenDaysNewest() {
    return axiosClient.get('/stats/admin/users-newest');
  },
  getFivePlacesPopular() {
    return axiosClient.get('/stats/admin/five-places-booking');
  },
  getFivePlacesHaveInItinerary(params) {
    const location =
      params && params.location ? `?location=${params.location}` : '';
    return axiosClient.get(`/stats/admin/five-places-itinerary${location}`);
  },
  getStatsRevenueAndTransaction() {
    return axiosClient.get('/stats/admin/revenue-and-transaction');
  },
  getStatsPlaceStatus() {
    return axiosClient.get('/stats/admin/place-status-approved');
  },
  getFiveSupplierHaveManyPlaces() {
    return axiosClient.get('/stats/admin/five-suppliers');
  },
  getStatsRevenueChart(params) {
    const time = params
      ? `?startMonth=${params.startMonth}&endMonth=${params.endMonth}`
      : '';
    return axiosClient.get(`stats/admin/revenue${time}`);
  },
  getFiveSupplierHaveRevenueHigh(params) {
    const { month, location } = params
      ? params
      : { month: null, location: null };
    const url =
      month && location
        ? `?month=${month}&location=${location}`
        : month && !location
        ? `?month=${month}`
        : !month && location
        ? `?location=${location}`
        : '';
    return axiosClient.get(`/stats/admin/five-supplier-revenue-high${url}`);
  }
};
export default statsApi;
