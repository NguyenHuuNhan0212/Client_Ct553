import { Layout } from 'antd';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import ServiceList from '../../components/Service/ServiceList';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPlace } from '../../redux/slices/placeSlice';

const { Content } = Layout;

export default function Home() {
  const dispatch = useDispatch();
  const { places } = useSelector((state) => state.place);
  useEffect(() => {
    dispatch(getAllPlace());
  }, []); //eslint-disable-line
  return (
    <Layout>
      <Header />
      <Banner />
      <Content style={{ padding: '0 50px' }}>
        <div style={{ margin: '40px 0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Địa điểm nổi bật
          </h2>
          <ServiceList places={places} />
        </div>
      </Content>
      <Footer />
      <Chatbot />
    </Layout>
  );
}
