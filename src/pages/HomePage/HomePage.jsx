import { Layout } from 'antd';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import ServiceList from '../../components/Service/ServiceList';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';

const { Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <Header />
      <Banner />
      <Content style={{ padding: '0 50px' }}>
        <div style={{ margin: '40px 0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            Dịch vụ nổi bật
          </h2>
          <ServiceList />
        </div>
      </Content>
      <Footer />
      <Chatbot />
    </Layout>
  );
}
