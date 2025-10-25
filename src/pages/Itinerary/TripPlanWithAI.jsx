import Chatbot from '../../components/Chatbot/Chatbot';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import EditItineraryByChatbot from '../../components/Itinerary/EditItineraryWithChatbot';

function TripPlanWithAIPage() {
  return (
    <>
      <Header />
      <EditItineraryByChatbot isTripPlan />
      <Footer />
      <Chatbot />
    </>
  );
}

export default TripPlanWithAIPage;
