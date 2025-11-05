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
  getFivePlacesHaveInItinerary() {
    return axiosClient.get('/stats/admin/five-places-itinerary');
  },
  getStatsRevenueAndTransaction() {
    return axiosClient.get('/stats/admin/revenue-and-transaction');
  }
};
export default statsApi;
