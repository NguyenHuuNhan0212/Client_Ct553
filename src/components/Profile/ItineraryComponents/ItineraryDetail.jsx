import React, { Children, useEffect, useState } from 'react';
import {
  Button,
  Card,
  List,
  Typography,
  Row,
  Col,
  Tag,
  Tooltip,
  message,
  Divider,
  Timeline,
  Space,
  Modal
} from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  LineOutlined,
  ClockCircleOutlined,
  EditOutlined,
  FormOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteItinerary,
  getAllItineraryByUserId,
  getItineraryDetail
} from '../../../redux/slices/itinerarySlice';
import itineraryApi from '../../../apis/itineraryService';
import ItineraryPriceModal from './ItieraryPriceAndPeopleForm';
import PlaceItineraryDetail from './PlaceItemInItineraryDetail';
const UNSPLASH_KEY = '553eU4V8AG8l8WrGcyX_rD8K0lc2Wen7cNhKerqzUDg';
export default function ItineraryDetail({ itinerary, onBack }) {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const { currentItinerary } = useSelector((state) => state.itinerary);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const today = dayjs();
  const isTrueDay = today.isAfter(dayjs(currentItinerary?.startDate));

  const handleUpdateStatus = async () => {
    try {
      await itineraryApi.updateStatusItinerary(currentItinerary?._id);
      message.success('Cập nhật trạng thái thành công.');
      dispatch(getItineraryDetail(currentItinerary?._id));
    } catch (err) {
      message.error(err.response?.data?.message || 'Có lỗi xảy ra.');
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleSubmit = async (data) => {
    try {
      await itineraryApi.addPriceAndPeople(data);
      message.success('Thêm chi phí và số người thành công.');
      dispatch(getItineraryDetail(data.itineraryId));
    } catch (err) {
      message.error(err.response?.data?.message || 'Có lỗi xảy ra.');
    }
  };

  const handleDeleteItinerary = async () => {
    try {
      dispatch(deleteItinerary(currentItinerary?._id));
      message.success('Xóa lịch trình thành công.');
      dispatch(getAllItineraryByUserId());
      setOpenDeleteModal(false);
      onBack();
    } catch (err) {
      message.error(err.response?.data?.message || 'Lỗi khi xóa.');
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
  }, [itinerary?.destination]);
  useEffect(() => {
    if (!currentItinerary || currentItinerary._id !== itinerary._id) {
      dispatch(getItineraryDetail(itinerary._id));
    }
  }, [dispatch, itinerary._id, currentItinerary]);
  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
      <Tooltip title={'Trở lại xem danh sách lịch trình'}>
        <Button onClick={onBack} style={{ marginBottom: 16 }}>
          ← Quay lại
        </Button>
      </Tooltip>

      <Card
        cover={
          <img
            alt={currentItinerary?.title}
            src={image}
            style={{ height: 300, objectFit: 'cover' }}
          />
        }
      >
        <Row gutter={30}>
          <Col
            span={16}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              marginBottom: 12
            }}
          >
            <Typography.Title level={2}>
              {currentItinerary?.title}
            </Typography.Title>
            <div style={{ color: '#06b6d4', fontWeight: 500 }}>
              <EnvironmentOutlined /> {currentItinerary?.destination}
            </div>
            <div style={{ color: '#9333ea', fontWeight: 500 }}>
              <UserOutlined /> Người tạo: {currentItinerary?.creatorName}
            </div>
            <div style={{ fontWeight: 500 }}>
              <Typography.Text style={{ color: '#f6971bff' }}>
                Trạng thái:{' '}
              </Typography.Text>
              <Tag
                color={
                  currentItinerary?.status === 'completed'
                    ? 'cyan'
                    : currentItinerary?.status === 'upcoming' && !isTrueDay
                    ? 'gold'
                    : 'blue'
                }
              >
                {currentItinerary?.status === 'completed'
                  ? 'Đã hoàn thành'
                  : currentItinerary?.status === 'upcoming' && !isTrueDay
                  ? 'Sắp tới'
                  : 'Đang thực hiện...'}
              </Tag>
            </div>
          </Col>
          <Col
            span={8}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              marginTop: 30,
              justifyContent: 'center',
              marginBottom: 12
            }}
          >
            {currentItinerary?.itinerary?.status === 'upcoming' &&
              isTrueDay && (
                <Tooltip title={'Nhấn để xác nhận đã hoàn thành chuyến đi'}>
                  <Button
                    color='purple'
                    variant='filled'
                    style={{ fontWeight: 500 }}
                    onClick={handleUpdateStatus}
                  >
                    Đã hoàn thành chuyến đi
                  </Button>
                </Tooltip>
              )}
            {currentItinerary?.status === 'completed' && (
              <Tooltip title={'Nhấn để cập nhật chi phí của chuyến đi'}>
                <Button
                  color='purple'
                  variant='filled'
                  style={{ fontWeight: 500 }}
                  onClick={handleOpen}
                >
                  <FormOutlined /> Cập nhật chí phí và số người
                </Button>
              </Tooltip>
            )}
            <Tooltip title={'Nhấn để xóa lịch trình'}>
              <Button
                color='danger'
                variant='filled'
                style={{ fontWeight: 500 }}
                onClick={handleOpenDeleteModal}
              >
                <DeleteOutlined /> Xóa lịch trình
              </Button>
            </Tooltip>

            <Tooltip title={'Nhấn để chỉnh sửa lịch trình'}>
              <Button color='cyan' variant='filled' style={{ fontWeight: 500 }}>
                <EditOutlined /> Chỉnh sửa lịch trình
              </Button>
            </Tooltip>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card style={{ color: '#8fe624ff', fontWeight: 600 }}>
              <div>Ngày dự kiến</div>
              <CalendarOutlined />{' '}
              {dayjs(currentItinerary?.startDate).format('DD/MM/YYYY')}
              <LineOutlined />
              {dayjs(currentItinerary?.endDate).format('DD/MM/YYYY')}
            </Card>
          </Col>
          {currentItinerary?.people && (
            <Col span={8}>
              <Card style={{ color: '#0f5879ff', fontWeight: 600 }}>
                <div>Số lượng người theo chi phí</div>
                <TeamOutlined /> {currentItinerary?.people} người
              </Card>
            </Col>
          )}
          {currentItinerary?.priceForItinerary && (
            <Col span={8}>
              <Card style={{ color: '#eb2f96', fontWeight: 600 }}>
                <div>Chi phí</div>
                <DollarOutlined />{' '}
                {currentItinerary?.priceForItinerary.toLocaleString()} VNĐ
              </Card>
            </Col>
          )}
        </Row>

        <Divider style={{ marginTop: 24, fontSize: 24 }}>
          Chi tiết hành trình
        </Divider>
        {currentItinerary?.itineraryDetail?.map((day) => (
          <div key={day.day}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <Typography.Text italic style={{ fontSize: 20 }}>
                {day.day}
              </Typography.Text>
            </div>

            <Timeline
              items={day.places?.map((p) => ({
                dot: <ClockCircleOutlined />,

                children: <PlaceItineraryDetail place={p} />
              }))}
            />
          </div>
        ))}
      </Card>
      <ItineraryPriceModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        itinerary={currentItinerary?.itinerary}
      />
      <Modal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        okText={'Xác nhận'}
        onOk={handleDeleteItinerary}
        cancelText={'Hủy'}
      >
        <Typography.Title level={4}>Xác nhận xóa lịch trình</Typography.Title>
        <Typography.Text>
          Bạn có chắc chắn muốn xóa lịch trình có tiêu đề{' '}
          <Typography.Text type={'danger'} style={{ fontWeight: 500 }}>
            {currentItinerary?.itinerary?.title}{' '}
          </Typography.Text>{' '}
          không?
        </Typography.Text>
      </Modal>
    </div>
  );
}
