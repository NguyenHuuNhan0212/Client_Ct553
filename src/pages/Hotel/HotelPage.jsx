import { Layout, Typography } from 'antd';
import Header from '../../components/Header/Header';
import SearchForm from '../../components/Hotel/SearchForm/SearchForm';
import PopularDestinations from '../../components/Hotel/PopularDestinations/PopularDestinations';
import Chatbot from '../../components/Chatbot/Chatbot';
import Footer from '../../components/Footer/Footer';
import { Content } from 'antd/es/layout/layout';
import styles from './style.module.css';
import SearchResult from '../../components/Hotel/SearchResult/SearchResult';
import { useDispatch, useSelector } from 'react-redux';
import { searchHotels } from '../../redux/slices/hotelSlice';
const { Title } = Typography;

function HotelPage() {
  const {
    content,
    popularDestinations,
    heroContent,
    banner,
    title,
    heroOverlay
  } = styles;
  const dispatch = useDispatch();
  const { searchResults, hasSearched } = useSelector((state) => state.hotel);
  const handleSearch = (data) => {
    const { location, checkIn, checkOut, guests } = data;
    // const [checkIn, checkOut] = dateRange;
    dispatch(
      searchHotels({
        location,
        checkIn: checkIn,
        checkOut: checkOut,
        guests
      })
    );
  };

  return (
    <Layout>
      <Header />
      <Content className={content}>
        {/* Banner tìm kiếm */}
        <div className={banner}>
          <div className={heroOverlay}></div>
          <div className={heroContent}>
            <h1 className={title}>Tìm kiếm khách sạn phù hợp cho bạn</h1>
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>

        {/* Điểm đến phổ biến */}
        <div className={popularDestinations}>
          {hasSearched && <SearchResult hotels={searchResults} />}
          <PopularDestinations />
        </div>
      </Content>
      <Footer />
      <Chatbot />
    </Layout>
  );
}

export default HotelPage;
