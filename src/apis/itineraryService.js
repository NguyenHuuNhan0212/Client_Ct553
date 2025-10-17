import axiosClient from './axiosClient';

const itineraryApi = {
  createItinerary(data) {
    return axiosClient.post('/itinerary', data);
  },
  getAllItineraryByUserId() {
    return axiosClient.get('/itinerary/my-itinerary');
  },
  getItineraryDetail(itineraryId) {
    return axiosClient.get(`/itinerary/${itineraryId}`);
  },
  updateStatusItinerary(itineraryId) {
    return axiosClient.patch(`/itinerary/${itineraryId}`);
  },
  addPriceAndPeople(data) {
    return axiosClient.patch(
      `/itinerary/price-people/${data.itineraryId}`,
      data
    );
  },
  deleteItinerary(itineraryId) {
    return axiosClient.delete(`/itinerary/${itineraryId}`);
  }
};
export default itineraryApi;
