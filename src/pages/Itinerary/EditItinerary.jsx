import { Button } from 'antd';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';
import EditItinerary from '../../components/Itinerary/EditItinerary';

function ItineraryEditPage() {
  return (
    <>
      <Header />
      <EditItinerary />
      <Footer />
      <Chatbot />
    </>
  );
}

export default ItineraryEditPage;
