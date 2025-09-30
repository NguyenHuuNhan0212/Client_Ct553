import { Row, Col, Typography } from 'antd';
import DestinationCard from '../DestinationCard';

const { Title } = Typography;

const destinations = [
  { name: 'Hà Nội', image: 'https://picsum.photos/400/200?1' },
  { name: 'Đà Nẵng', image: 'https://picsum.photos/400/200?2' },
  { name: 'Hội An', image: 'https://picsum.photos/400/200?3' },
  { name: 'Tp. Hồ Chí Minh', image: 'https://picsum.photos/400/200?4' },
  { name: 'Phú Quốc', image: 'https://picsum.photos/400/200?5' },
  { name: 'Nha Trang', image: 'https://picsum.photos/400/200?6' },
  { name: 'Đà Lạt', image: 'https://picsum.photos/400/200?7' }
];

export default function PopularDestinations() {
  return (
    <div>
      <Title
        level={3}
        style={{ textAlign: 'center', marginBottom: 30, fontWeight: 'bold' }}
      >
        Điểm đến Việt Nam phổ biến
      </Title>
      <Row gutter={[24, 24]}>
        {destinations.map((d) => (
          <Col xs={24} sm={12} md={8} lg={6} key={d.name}>
            <DestinationCard {...d} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
