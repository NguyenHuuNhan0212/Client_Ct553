import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import {
  Typography,
  List,
  Row,
  Col,
  Divider,
  Layout,
  Tag,
  message,
  Tooltip,
  Button
} from 'antd';
import { capitalizeName } from '../../utils/capitalize';
import PlaceRelative from './PlaceRelative';
import HotelNearPlace from './HotelNearPlace';
import ServiceOfPlace from './ServiceOfPlace';
import { getPlacesFavorite } from '../../redux/slices/placeSlice';
import placeApi from '../../apis/placeService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import ChatBox from '../Profile/Message/ChatBox';
const { Content } = Layout;
const { Title, Paragraph } = Typography;

function PlaceDetail({ currentPlace }) {
  const [mainImage, setMainImage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const { placesFavorite } = useSelector((state) => state.place);
  const dispatch = useDispatch();
  const { info, services, ownerInfo } = currentPlace;
  const navigate = useNavigate();
  const toggleFavorite = async (e) => {
    if (!user) {
      message.warning('Đăng nhập để thêm địa điểm vào danh sách yêu thích');
      navigate('/login');
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    try {
      if (!isFavorite) {
        await placeApi.addPlaceFavorite({ placeId: currentPlace?.info?._id });
        message.success('Đã thêm vào danh sách yêu thích');
        dispatch(getPlacesFavorite());
        setIsFavorite(true);
      } else {
        await placeApi.removePlaceFavorite({
          placeId: currentPlace?.info?._id
        });
        message.info('Đã xóa khỏi danh sách yêu thích');
        dispatch(getPlacesFavorite());
        setIsFavorite(false);
      }
    } catch (err) {
      message.error(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };
  const handleChat = () => {
    if (!user) {
      message.info('Đăng nhập để nhắn tin với quản lý.');
      navigate('/login');
      return;
    } else {
      setIsChat(!isChat);
    }
  };
  useEffect(() => {
    if (user?._id) {
      dispatch(getPlacesFavorite());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (placesFavorite && placesFavorite.length > 0) {
      const favoriteIds = placesFavorite.map((f) => f.placeId?._id.toString());
      setIsFavorite(favoriteIds.includes(currentPlace?.info?._id.toString()));
    } else {
      setIsFavorite(false);
    }
  }, [placesFavorite, currentPlace?.info?._id]);

  useEffect(() => {
    if (info?.images?.length > 0) {
      setMainImage(`http://localhost:3000/${info.images[0]}`);
    }
  }, [info]);
  return (
    <Content
      style={{
        padding: '0 200px',
        marginTop: '65px'
      }}
    >
      {/* Ảnh chính + thumbnail */}
      <div style={{ display: 'flex', marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            maxHeight: '500px',
            overflowY: 'auto',
            marginRight: 10
          }}
        >
          {info?.images?.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:3000/${img}`}
              alt={`thumb-${idx}`}
              onClick={() => setMainImage(`http://localhost:3000/${img}`)}
              style={{
                width: 80,
                height: 60,
                objectFit: 'cover',
                borderRadius: 5,
                cursor: 'pointer',
                border:
                  mainImage === `http://localhost:3000/${img}`
                    ? '2px solid #1890ff'
                    : '1px solid #ddd'
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '500px',
            background: '#fafafa'
          }}
        >
          <img
            src={mainImage}
            alt='main'
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>
      </div>
      <Row gutter={5}>
        {/* Thông tin chung */}
        <Col span={16}>
          <Title level={2}>
            {capitalizeName(info?.name)}{' '}
            <Tooltip
              title={
                !isFavorite
                  ? 'Thêm vào danh sách yêu thích'
                  : 'Xóa khỏi danh sách yêu thích'
              }
            >
              <span
                onClick={toggleFavorite}
                style={{
                  fontSize: 22,
                  color: isFavorite ? 'red' : 'white',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  borderRadius: '50%',
                  padding: 6,
                  cursor: 'pointer'
                }}
              >
                {isFavorite ? <HeartFilled /> : <HeartOutlined />}
              </span>
            </Tooltip>
          </Title>
          <Paragraph style={{ fontSize: '16px' }}>
            <b>Địa chỉ:</b> {info?.address}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Loại địa điểm: </b>{' '}
            {info?.type === 'touristSpot'
              ? 'Địa điểm du lịch'
              : info?.type === 'cafe'
              ? 'Quán cafe'
              : info?.type === 'restaurant'
              ? 'Địa điểm ăn uống'
              : 'Khách sạn, nhà nghĩ'}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Trạng thái hoạt động: </b>{' '}
            <Tag
              style={{ fontSize: '16px' }}
              color={info?.isActive ? 'green' : 'red'}
            >
              {info?.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
            </Tag>
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', paddingRight: '50px' }}>
            <b>Giới thiệu địa điểm: </b>
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(info?.description || '')
              }}
            />
          </Paragraph>
        </Col>
        <Col span={8}>
          <Divider style={{ fontSize: '20px' }}>Thông tin liên hệ</Divider>
          <Paragraph style={{ fontSize: '16px' }}>
            <b>Chủ địa điểm/Quản lý:</b>{' '}
            {capitalizeName(ownerInfo?.userId?.fullName) || 'Chưa cập nhật'}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px' }}>
            <b>Số điện thoại:</b> {ownerInfo?.userId?.phone || 'Chưa cập nhật'}
          </Paragraph>
          <Paragraph style={{ fontSize: '16px' }}>
            <Button type='primary' onClick={() => handleChat()}>
              Nhắn tin với quản lý
            </Button>
          </Paragraph>
          <Paragraph>
            {isChat && (
              <ChatBox
                userId={user?._id}
                name={info?.name}
                placeId={info?._id}
                friendId={ownerInfo?.userId?._id}
              />
            )}
          </Paragraph>
        </Col>
      </Row>
      {/* Dịch vụ */}
      {services?.length > 0 && <ServiceOfPlace services={services} />}
      <PlaceRelative currentPlace={info} isHotel={!info.type} />
      {info.type && <HotelNearPlace currentPlace={info} />}
    </Content>
  );
}

export default PlaceDetail;
