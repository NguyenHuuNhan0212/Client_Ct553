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
  }
};
export default statsApi;
