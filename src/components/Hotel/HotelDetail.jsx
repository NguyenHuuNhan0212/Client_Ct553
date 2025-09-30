import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Rate,
  Button,
  Tabs,
  Tag,
  Carousel,
  Image,
  Divider,
  List
} from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOneHotel } from '../../redux/slices/hotelSlice';
import DOMPurify from 'dompurify';
import { capitalizeName } from '../../utils/capitalize';
import styles from './style.module.css';
import RoomCard from './RoomCard';
const { Title, Paragraph } = Typography;

function HotelDetail() {
  const { info } = styles;
  const dispatch = useDispatch();
  const { currentHotel } = useSelector((state) => state.hotel);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneHotel(id));
  }, [dispatch, id]);

  if (!currentHotel) {
    return <div>Loading...</div>;
  }

  // fallback: nếu không có ảnh thì dùng ảnh mặc định
  const images = currentHotel?.info.images?.length
    ? currentHotel.info.images
    : ['https://picsum.photos/800/400'];

  return (
    <Layout style={{ background: '#fff', padding: '20px', height: '100%' }}>
      <Row gutter={16}>
        {/* Gallery bên trái */}
        <Col span={16}>
          <Image.PreviewGroup>
            <Row gutter={[5, 5]}>
              {/* Ảnh chính */}
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
                  {images.slice(1, images.length).map((img, index) => (
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

      {/* Tabs */}
      <Tabs defaultActiveKey='1' style={{ marginTop: '20px' }}>
        <Tabs.TabPane tab='Thông tin' key='1'>
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
            {/* Dịch vụ */}
            {currentHotel?.services?.length > 0 && (
              <>
                <Divider style={{ fontSize: '20px' }}>
                  Các dịch vụ địa điểm cung cấp
                </Divider>
                <List
                  dataSource={currentHotel?.services}
                  bordered
                  renderItem={(s) => (
                    <List.Item>
                      <span>{s.name}</span> -{' '}
                      <b>{s.price.toLocaleString()} VND</b>
                    </List.Item>
                  )}
                />
              </>
            )}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab='Phòng' key='2'>
          <Row gutter={[24, 24]}>
            {currentHotel?.roomTypes?.map((room, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <RoomCard room={room} />
              </Col>
            ))}
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default HotelDetail;
