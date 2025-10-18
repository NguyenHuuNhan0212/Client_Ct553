import {
  Layout,
  Typography,
  Row,
  Col,
  Tabs,
  Image,
  message,
  Tag,
  Tooltip
} from 'antd';
import {
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getDetailHotelByReqUser,
  getOneHotel
} from '../../redux/slices/hotelSlice';
import DOMPurify from 'dompurify';
import { capitalizeName } from '../../utils/capitalize';
import styles from './style.module.css';
import RoomCard from './RoomCard';
import ServiceOfPlace from '../PlaceDetail/ServiceOfPlace';
import { createBooking } from '../../redux/slices/bookingSlice';
import paymentApi from '../../apis/paymentService';
import placeApi from '../../apis/placeService';
import { getPlacesFavorite } from '../../redux/slices/placeSlice';
const { Title, Paragraph } = Typography;

function HotelDetail() {
  const { info } = styles;
  const dispatch = useDispatch();
  const { currentHotel, checkIn, checkOut, guests } = useSelector(
    (state) => state.hotel
  );
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const { placesFavorite } = useSelector((state) => state.place);
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
        await placeApi.addPlaceFavorite({ placeId: id });
        message.success('Đã thêm vào danh sách yêu thích');
        dispatch(getPlacesFavorite());
        setIsFavorite(true);
      } else {
        await placeApi.removePlaceFavorite({
          placeId: id
        });
        message.info('Đã xóa khỏi danh sách yêu thích');
        dispatch(getPlacesFavorite());
        setIsFavorite(false);
      }
    } catch (err) {
      message.error(err.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const onBook = (data) => {
    const paymentMethod = data.paymentMethod;
    const placeId = currentHotel?.info?._id;

    const bookingPayload = {
      placeId,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      details: data.details
    };

    dispatch(createBooking(bookingPayload))
      .unwrap()
      .then(async (booking) => {
        const bookingId = booking?.booking?._id;
        if (!bookingId) {
          message.error('Không lấy được mã booking!');
          return;
        }
        try {
          const res = await paymentApi.createPayment({
            bookingId,
            deposit: paymentMethod === 'deposit',
            isOffline: paymentMethod === 'offline'
          });

          const { paymentUrl } = res;

          if (paymentUrl) {
            window.location.href = paymentUrl; // Chuyển hướng tới VNPAY
          } else {
            message.success(
              'Đặt phòng thành công (Thanh toán khi sử dụng dịch vụ)'
            );
          }
        } catch (error) {
          message.error('Lỗi khi tạo thanh toán!', error);
        }
      })
      .catch((err) => message.error(err?.message || 'Đặt phòng thất bại'));
  };

  useEffect(() => {
    if (checkIn && checkOut && guests) {
      const data = {
        hotelId: id,
        checkIn,
        checkOut,
        guests
      };
      dispatch(getDetailHotelByReqUser(data));
      return;
    } else {
      dispatch(getOneHotel(id));
    }
  }, [dispatch, id, checkIn, checkOut, guests]);

  useEffect(() => {
    if (user?.userId) {
      dispatch(getPlacesFavorite());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (placesFavorite && placesFavorite.length > 0) {
      const favoriteIds = placesFavorite.map((f) => f.placeId?._id.toString());
      setIsFavorite(favoriteIds.includes(id.toString()));
    } else {
      setIsFavorite(false);
    }
  }, [placesFavorite, id]);

  if (!currentHotel) {
    return <div>Loading...</div>;
  }

  const images = currentHotel?.info?.images?.length
    ? currentHotel.info.images
    : ['https://picsum.photos/800/400'];
  const items = [
    {
      key: '1',
      label: 'Thông tin',
      children: (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                currentHotel?.info?.description ||
                  'Chưa có mô tả về khách sạn này.'
              )
            }}
            style={{ fontSize: '16px', lineHeight: '1.6', color: '#333' }}
          />
          <div>
            <p
              style={{
                marginBottom: 5,
                fontSize: '16px',
                color: '#555',
                fontWeight: '500'
              }}
            >
              Các tiện ích mà địa điểm cung cấp:
            </p>
            {currentHotel?.hotelDetail?.facilities?.map((fa, i) => {
              return (
                <Tag bordered={false} color='geekblue' key={i}>
                  {fa}
                </Tag>
              );
            })}
          </div>

          <div>
            {currentHotel?.services?.length > 0 && (
              <ServiceOfPlace services={currentHotel?.services} isHotel />
            )}
          </div>
        </>
      )
    },
    {
      key: '2',
      label: 'Phòng',
      children: (
        <Row gutter={[24, 24]}>
          {currentHotel?.roomTypes?.map((room, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} key={idx}>
              <RoomCard
                room={{ ...room, services: currentHotel?.services }}
                onBook={onBook}
                facilities={currentHotel?.hotelDetail?.facilities}
              />
            </Col>
          ))}
        </Row>
      )
    }
  ];

  return (
    <Layout style={{ background: '#fff', padding: '20px', height: '100%' }}>
      <Row gutter={16}>
        {/* Gallery bên trái */}
        <Col span={16}>
          <Image.PreviewGroup>
            <Row gutter={[5, 5]}>
              <Col span={16}>
                <Image
                  src={
                    images[0]
                      ? `http://localhost:3000/${images[0]}`
                      : 'https://picsum.photos/800/400'
                  }
                  alt='main'
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </Col>
              <Col span={8}>
                <Row gutter={[5, 5]}>
                  {images.slice(1).map((img, index) => (
                    <Col span={12} key={index}>
                      <Image
                        src={`http://localhost:3000/${img}`}
                        alt={`sub-${index}`}
                        style={{
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px'
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Image.PreviewGroup>
        </Col>

        {/* Thông tin khách sạn bên phải */}
        <Col span={8} className={info}>
          <Title level={2}>
            {capitalizeName(currentHotel?.info?.name)}{' '}
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
          <Paragraph>
            <EnvironmentOutlined /> {currentHotel?.info?.address}
          </Paragraph>
          <Paragraph>
            Chủ địa điểm/Quản lý:{' '}
            {capitalizeName(currentHotel?.ownerInfo?.userId?.fullName)}
          </Paragraph>
          <Paragraph>
            Liên hệ: {currentHotel?.ownerInfo?.userId?.phone}
          </Paragraph>
          <Paragraph>
            Giá chỉ từ:{' '}
            <b style={{ color: 'red', fontSize: '20px' }}>
              {currentHotel?.minPricePerNight.toLocaleString() || 0}VNĐ / đêm
            </b>
          </Paragraph>
        </Col>
      </Row>

      <Tabs defaultActiveKey='1' style={{ marginTop: '20px' }} items={items} />
    </Layout>
  );
}

export default HotelDetail;
