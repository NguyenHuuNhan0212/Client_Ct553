import { Divider, Layout, Typography } from 'antd';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import ServiceList from '../../components/Service/ServiceList';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { resetStateSearchHotel } from '../../redux/slices/hotelSlice';
import ExploreCategories from '../../components/ExploreCategories/ExploreCategories';
import placeApi from '../../apis/placeService';

const { Content } = Layout;
const { Title } = Typography;
export default function Home() {
  const dispatch = useDispatch();
  const [placesPopular, setPlacesPopular] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await placeApi.getPlacesPopular();
      setPlacesPopular(res);
    };
    fetchData();
    dispatch(resetStateSearchHotel());
    localStorage.removeItem('itineraryForm');
  }, []); //eslint-disable-line
  return (
    <Layout>
      <Header />
      <Banner />
      <Content style={{ padding: '0 50px' }}>
        <div style={{ margin: '40px 0' }}>
          <ExploreCategories />
          <Divider style={{ fontSize: 30 }}>Điểm đến nổi bật</Divider>

          <ServiceList places={placesPopular} />
        </div>
      </Content>
      <Footer />
      <Chatbot />
    </Layout>
  );
}
