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
    return axiosClient.patch(`/itinerary/status/${itineraryId}`);
  },
  addPriceAndPeople(data) {
    return axiosClient.patch(
      `/itinerary/price-people/${data.itineraryId}`,
      data
    );
  },
  deleteItinerary(itineraryId) {
    return axiosClient.delete(`/itinerary/${itineraryId}`);
  },
  getAllItineraryTemplate() {
    return axiosClient.get('/itinerary/template');
  },
  updateItinerary(itineraryId, data) {
    return axiosClient.patch(`/itinerary/${itineraryId}`, data);
  },
  createItineraryWithAI(data) {
    return axiosClient.post('/itinerary/trip-plan', data);
  }
};
export default itineraryApi;
