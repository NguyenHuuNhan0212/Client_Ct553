import { Layout } from 'antd';
import Header from '../../components/Header/Header';
import HotelDetail from '../../components/Hotel/HotelDetail';
import { Content } from 'antd/es/layout/layout';
import Footer from '../../components/Footer/Footer';

function HotelDetailPage() {
  return (
    <>
      <Layout>
        <Header />
        <Content
          style={{
            padding: '0 200px 50px',
            marginTop: '65px',
            minHeight: '100vh'
          }}
        >
          <HotelDetail />
        </Content>
        <Footer />
      </Layout>
    </>
  );
}

export default HotelDetailPage;
