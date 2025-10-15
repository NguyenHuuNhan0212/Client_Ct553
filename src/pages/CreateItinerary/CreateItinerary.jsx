import { Button } from 'antd';
import Header from '../../components/Header/Header';
import CreateItineraryPro from '../../components/CreateItinerary/CreateItinerary';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';

function ItineraryCreatePage() {
  return (
    <>
      <Header />
      <CreateItineraryPro />
      <Footer />
      <Chatbot />
    </>
  );
}

export default ItineraryCreatePage;
