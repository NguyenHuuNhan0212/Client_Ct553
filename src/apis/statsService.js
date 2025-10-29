import axiosClient from './axiosClient';
const statsApi = {
  getStatsPlaceByType() {
    return axiosClient.get('/stats/admin/place-by-type');
  },
  getUsersSevenDaysNewest() {
    return axiosClient.get('/stats/admin/users-newest');
  },
  getFivePlacesPopular() {
    return axiosClient.get('/stats/admin/five-places-popular');
  }
};
export default statsApi;
