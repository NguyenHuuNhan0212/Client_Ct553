import { Divider, Empty, Layout } from 'antd';
import Header from '../../components/Header/Header';
import styles from './style.module.css';
import SearchForm from '../../components/Place/SearchForm';
import Footer from '../../components/Footer/Footer';
import ServiceList from '../../components/Service/ServiceList';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react'; //eslint-disable-line
import { useEffect, useState } from 'react';
import placeApi from '../../apis/placeService';
import { getPlacesByAddressAndType } from '../../redux/slices/placeSlice';
import Chatbot from '../../components/Chatbot/Chatbot';
const { Content } = Layout;
function CafeAndChillPage() {
  const {
    content,
    banner,
    heroContent,
    heroOverlay,
    title,
    popularDestinations
  } = styles;
  const { type } = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const [cafesPopular, setCafesPopular] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const handleSearch = async (data) => {
    setIsSearch(data.isSearch);

    const results = await dispatch(
      getPlacesByAddressAndType({ address: data.location, type: type })
    ).unwrap();

    if (data.searchText && data.searchText.trim() !== '') {
      const keywordLower = data.searchText.trim().toLowerCase();
      const filtered = results.places.filter(
        (place) =>
          place.name.toLowerCase().includes(keywordLower) ||
          (place.description &&
            place.description.toLowerCase().includes(keywordLower))
      );
      setCafesPopular(filtered);
    } else {
      setCafesPopular(results.places);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await placeApi.getPlacesPopularByType(type);
      setCafesPopular(res);
    };
    fetchRestaurant();
  }, [type]);
  return (
    <Layout>
      <Header />
      <Content className={content}>
        {/* Banner tìm kiếm */}
        <div className={banner}>
          <div className={heroOverlay}></div>
          <div className={heroContent}>
            <h1 className={title}>
              Khám phá không gian cà phê & chill độc đáo quanh bạn
            </h1>
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
        {!isSearch && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className={popularDestinations}>
              <Divider style={{ fontSize: 30, textAlign: 'center' }}>
                Điểm đến nổi bật
              </Divider>
              <ServiceList places={cafesPopular} />
            </div>
          </motion.div>
        )}
        {isSearch && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className={popularDestinations}>
              <Divider style={{ fontSize: 30, textAlign: 'center' }}>
                Kết quả tìm kiếm
              </Divider>
              {!cafesPopular.length ? (
                <Empty description='Không tìm thấy quán cafes phù hợp' />
              ) : (
                <ServiceList places={cafesPopular} />
              )}
            </div>
          </motion.div>
        )}
      </Content>
      <Footer />
      <Chatbot />
    </Layout>
  );
}

export default CafeAndChillPage;
