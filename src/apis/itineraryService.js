import axiosClient from './axiosClient';

const itineraryApi = {
  createItinerary(data) {
    return axiosClient.post('/itinerary', data);
  },
  getAllItineraryByUserId() {
    return axiosClient.get('/itinerary/my-itinerary');
  }
};
export default itineraryApi;
