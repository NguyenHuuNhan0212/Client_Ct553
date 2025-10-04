import { Layout, Typography, Row, Col, Tabs, Image, message, Tag } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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
const { Title, Paragraph } = Typography;

function HotelDetail() {
  const { info } = styles;
  const dispatch = useDispatch();
  const { currentHotel, checkIn, checkOut, guests } = useSelector(
    (state) => state.hotel
  );
  const { loading } = useSelector((state) => state.booking); //eslint-disable-line
  const { id } = useParams();

  const onBook = (data) => {
    const bookingPayload = {
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      details: data.details
    };
    dispatch(createBooking(bookingPayload))
      .unwrap()
      .then(() => message.success('Đặt phòng thành công!'))
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
              <ServiceOfPlace services={currentHotel?.services} />
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
          {currentHotel?.hotelDetail?.roomTypes?.map((room, idx) => (
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
          <Title level={2}>{capitalizeName(currentHotel?.info?.name)}</Title>
          <Paragraph>
            <EnvironmentOutlined /> {currentHotel?.info?.address}
          </Paragraph>
          <Paragraph>
            Chủ địa điểm:{' '}
            {capitalizeName(currentHotel?.ownerInfo?.userId?.fullName)}
          </Paragraph>
          <Paragraph>Liên hệ: {currentHotel?.ownerInfo?.phone}</Paragraph>
          <Paragraph>
            Giá chỉ từ:{' '}
            <b style={{ color: 'red', fontSize: '20px' }}>
              {currentHotel?.minPricePerNight}K/đêm
            </b>
          </Paragraph>
        </Col>
      </Row>

      <Tabs defaultActiveKey='1' style={{ marginTop: '20px' }} items={items} />
    </Layout>
  );
}

export default HotelDetail;
