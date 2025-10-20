import { Button } from 'antd';
import Header from '../../components/Header/Header';
import CreateItinerary from '../../components/Itinerary/CreateItinerary';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';

function ItineraryCreatePage() {
  return (
    <>
      <Header />
      <CreateItinerary />
      <Footer />
      <Chatbot />
    </>
  );
}

export default ItineraryCreatePage;
