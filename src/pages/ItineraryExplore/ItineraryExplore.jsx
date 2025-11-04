import React, { useEffect, useState } from 'react';
import {
  Typography,
  Spin,
  Layout,
  Row,
  Col,
  Select,
  Space,
  InputNumber
} from 'antd';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Chatbot from '../../components/Chatbot/Chatbot';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCurrentItinerary,
  getAllItineraryTemplate
} from '../../redux/slices/itinerarySlice';
import ItineraryList from '../../components/Profile/ItineraryComponents/ItineraryList';
import { motion } from 'motion/react'; //eslint-disable-line
import {
  ClockCircleFilled,
  ClockCircleOutlined,
  ContainerOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import ItineraryDetail from '../../components/Profile/ItineraryComponents/ItineraryDetail';
const { Content } = Layout;
const { Title, Text } = Typography;

export default function ItineraryExplore() {
  const dispatch = useDispatch();
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [duration, setDuration] = useState(null);
  const { loading, itinerariesTemplate } = useSelector(
    (state) => state.itinerary
  );
  const { user } = useSelector((state) => state.user);

  const itineraries = !user
    ? itinerariesTemplate
    : itinerariesTemplate.filter((i) => {
        return i.userId?.toString() !== user?._id?.toString();
      });
  const filteredItinerary = itineraries.filter((itinerary) => {
    const matchLocation = selectedLocation
      ? selectedLocation
          .toLocaleLowerCase()
          .includes(itinerary.destination.toLocaleLowerCase())
      : true;
    const matchDuration = duration
      ? Number(itinerary.numDays) === Number(duration)
      : true;
    return matchLocation && matchDuration;
  });
  const onChangeDuration = (value) => {
    setDuration(value);
  };

  useEffect(() => {
    dispatch(getAllItineraryTemplate());
  }, [dispatch]);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch('https://provinces.open-api.vn/api/v2');
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error('Lỗi khi load tỉnh thành:', err);
      }
    };
    fetchCities();
  }, []);
  return (
    <>
      <Header />
      <Content
        style={{ minHeight: '600px', padding: '0 100px', margin: '75px auto' }}
      >
        {loading ? (
          <Spin size='large' />
        ) : !selectedItinerary ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Title style={{ textAlign: 'center' }} level={2}>
              <ContainerOutlined /> Khám phá và chọn lịch trình phù hợp cho bạn
            </Title>
            <Row justify='end' style={{ marginBottom: 16 }}>
              <Col>
                <Space>
                  <Text strong>
                    <EnvironmentOutlined /> Điểm đến:
                  </Text>
                  <Select
                    showSearch
                    allowClear
                    placeholder='Chọn địa điểm'
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={cities.map((city) => ({
                      label: city.name,
                      value: city.name
                    }))}
                    size='large'
                    style={{ width: '220px' }}
                    value={selectedLocation || undefined}
                    onChange={(value) => setSelectedLocation(value)}
                  />

                  <Text strong>
                    <ClockCircleOutlined /> Thời gian
                  </Text>
                  <InputNumber
                    size='large'
                    style={{ width: 170 }}
                    min={1}
                    value={duration || undefined}
                    onChange={onChangeDuration}
                    placeholder='Số ngày dự kiến'
                  />
                </Space>
              </Col>
            </Row>
            <ItineraryList
              itineraries={filteredItinerary}
              onSelect={setSelectedItinerary}
              isTemplate
            />
          </motion.div>
        ) : (
          <ItineraryDetail
            itinerary={selectedItinerary}
            onBack={() => {
              setSelectedItinerary(null);
              dispatch(clearCurrentItinerary());
            }}
            isTemplate
          />
        )}
      </Content>

      <Footer />
      <Chatbot />
    </>
  );
}
