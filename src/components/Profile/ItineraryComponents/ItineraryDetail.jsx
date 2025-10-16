import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  List,
  Typography,
  Row,
  Col,
  Tag,
  Tooltip,
  message
} from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  LineOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { getItineraryDetail } from '../../../redux/slices/itinerarySlice';
import itineraryApi from '../../../apis/itineraryService';
import ItineraryPriceModal from './ItieraryPriceAndPeopleForm';
const UNSPLASH_KEY = '553eU4V8AG8l8WrGcyX_rD8K0lc2Wen7cNhKerqzUDg';
export default function ItineraryDetail({ itinerary, onBack }) {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const { currentItinerary } = useSelector((state) => state.itinerary);
  const [open, setOpen] = useState(false);
  const today = dayjs();
  const isTrueDay = today.isAfter(
    dayjs(currentItinerary?.itinerary?.startDate)
  );
  const handleUpdateStatus = async () => {
    try {
      await itineraryApi.updateStatusItinerary(
        currentItinerary?.itinerary?._id
      );
      message.success('Cập nhật trạng thái thành công.');
      dispatch(getItineraryDetail(currentItinerary?.itinerary?._id));
    } catch (err) {
      message.error(err.response?.data?.message || 'Có lỗi xảy ra.');
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit = async (data) => {
    console.log(data);
    try {
      await itineraryApi.addPriceAndPeople(data);
      message.success('Thêm chi phí và số người thành công.');
      dispatch(getItineraryDetail(data.itineraryId));
    } catch (err) {
      message.error(err.response?.data?.message || 'Có lỗi xảy ra.');
    }
  };
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            itinerary.destination || 'travel'
          )}&orientation=landscape&per_page=1&client_id=${UNSPLASH_KEY}`
        );
        const data = await res.json();
        setImage(
          data.results?.[0]?.urls?.regular ||
            'http://localhost:3000/uploads/default-travel.jpg'
        );
      } catch (err) {
        console.error('Lỗi khi tải ảnh:', err);
      }
    };
    fetchImage();
  }, [itinerary.destination]);
  useEffect(() => {
    dispatch(getItineraryDetail(itinerary._id));
  }, [dispatch, itinerary._id]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Tooltip title={'Trở lại xem danh sách lịch trình'}>
        <Button onClick={onBack} style={{ marginBottom: 16 }}>
          ← Quay lại
        </Button>
      </Tooltip>

      <Card
        cover={
          <img
            alt={currentItinerary?.itinerary?.title}
            src={image}
            style={{ height: 300, objectFit: 'cover' }}
          />
        }
      >
        <Typography.Title level={2}>
          {currentItinerary?.itinerary?.title}
        </Typography.Title>
        <Row gutter={30} style={{ marginTop: 20 }}>
          <Col
            span={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              marginBottom: 12
            }}
          >
            <div style={{ color: '#06b6d4', fontWeight: 500 }}>
              <EnvironmentOutlined /> {currentItinerary?.itinerary?.destination}
            </div>
            <div style={{ color: '#9333ea', fontWeight: 500 }}>
              <UserOutlined /> Người tạo:{' '}
              {currentItinerary?.itinerary?.creatorName}
            </div>
            <div style={{ fontWeight: 500 }}>
              <Typography.Text style={{ color: '#f6971bff' }}>
                Trạng thái:{' '}
              </Typography.Text>
              <Tag
                color={
                  currentItinerary?.itinerary?.status === 'completed'
                    ? 'cyan'
                    : currentItinerary?.itinerary?.status === 'upcoming' &&
                      !isTrueDay
                    ? 'gold'
                    : 'blue'
                }
              >
                {currentItinerary?.itinerary?.status === 'completed'
                  ? 'Đã hoàn thành'
                  : currentItinerary?.itinerary?.status === 'upcoming' &&
                    !isTrueDay
                  ? 'Sắp tới'
                  : 'Đang thực hiện...'}
              </Tag>
            </div>
          </Col>
          <Col span={12} style={{ textAlign: 'right', marginTop: 30 }}>
            {currentItinerary?.itinerary?.status === 'upcoming' &&
              isTrueDay && (
                <Button
                  color='purple'
                  variant='filled'
                  style={{ fontWeight: 500 }}
                  onClick={handleUpdateStatus}
                >
                  Đã hoàn thành chuyến đi
                </Button>
              )}
            {currentItinerary?.itinerary?.status === 'completed' && (
              <Button
                color='purple'
                variant='filled'
                style={{ fontWeight: 500 }}
                onClick={handleOpen}
              >
                Cập nhật chí phí và số người
              </Button>
            )}
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card style={{ color: '#8fe624ff', fontWeight: 600 }}>
              <div>Ngày dự kiến</div>
              <CalendarOutlined />{' '}
              {dayjs(currentItinerary?.itinerary?.startDate).format(
                'DD/MM/YYYY'
              )}
              <LineOutlined />
              {dayjs(currentItinerary?.itinerary?.endDate).format('DD/MM/YYYY')}
            </Card>
          </Col>
          {currentItinerary?.itinerary?.people && (
            <Col span={8}>
              <Card style={{ color: '#0f5879ff', fontWeight: 600 }}>
                <div>Số lượng người theo chi phí</div>
                <TeamOutlined /> {currentItinerary?.itinerary?.people} người
              </Card>
            </Col>
          )}
          {currentItinerary?.itinerary?.priceForItinerary && (
            <Col span={8}>
              <Card style={{ color: '#eb2f96', fontWeight: 600 }}>
                <div>Chi phí</div>
                <DollarOutlined />{' '}
                {currentItinerary?.itinerary?.priceForItinerary.toLocaleString()}{' '}
                VNĐ
              </Card>
            </Col>
          )}
        </Row>

        <Typography.Title level={4} style={{ marginTop: 24 }}>
          Hoạt động
        </Typography.Title>
        <List
          dataSource={currentItinerary?.itineraryDetail}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>
                Ngày {item.visitDay} - {item.placeId?.name} {item.note} (
                {item.startTime || '...'} → {item.endTime || '...'})
              </Typography.Text>
            </List.Item>
          )}
        />
      </Card>
      <ItineraryPriceModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        itinerary={currentItinerary?.itinerary}
      />
    </div>
  );
}
