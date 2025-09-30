import { Row, Col, Empty } from 'antd';
import HotelCard from './HotelCard';

export default function HotelList({ hotels }) {
  if (!hotels || hotels.length === 0) {
    return <Empty description='Không tìm thấy khách sạn phù hợp' />;
  }

  return (
    <Row gutter={[16, 16]}>
      {hotels.map((hotel) => (
        <Col xs={24} sm={12} md={8} lg={6} key={hotel.hotelId}>
          <HotelCard hotel={hotel} />
        </Col>
      ))}
    </Row>
  );
}
