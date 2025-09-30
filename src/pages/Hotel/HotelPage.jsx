import { Layout, Typography } from 'antd';
import Header from '../../components/Header/Header';
import SearchForm from '../../components/Hotel/SearchForm/SearchForm';
import PopularDestinations from '../../components/Hotel/PopularDestinations/PopularDestinations';
import Chatbot from '../../components/Chatbot/Chatbot';
import Footer from '../../components/Footer/Footer';
import { Content } from 'antd/es/layout/layout';
import styles from './style.module.css';
import { useState } from 'react';
import SearchResult from '../../components/Hotel/SearchResult/SearchResult';
const { Title } = Typography;

function HotelPage() {
  const { content, popularDestinations, banner } = styles;
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const handleSearch = (data) => {
    console.log('Search data:', data);
    // TODO: gọi API tìm khách sạn tại đây
    setIsSearchVisible(true);
  };

  return (
    <Layout>
      <Header />
      <Content className={content}>
        {/* Banner tìm kiếm */}
        <div className={banner}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
            Tìm kiếm khách sạn phù hợp cho bạn
          </Title>
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Điểm đến phổ biến */}
        <div className={popularDestinations}>
          {!isSearchVisible && <PopularDestinations />}
          {isSearchVisible && <SearchResult />}
        </div>
      </Content>
      <Footer />
      <Chatbot />
    </Layout>
  );
}

export default HotelPage;
