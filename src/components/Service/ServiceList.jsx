import { Row, Col } from 'antd';
import ServiceCard from './ServiceCard';

export default function ServiceList() {
  const fakeServices = [
    {
      id: 1,
      title: 'Khách sạn Luxury',
      image: 'https://source.unsplash.com/400x300/?hotel',
      price: '1,200,000'
    },
    {
      id: 2,
      title: 'Tour Hạ Long',
      image: 'https://source.unsplash.com/400x300/?beach',
      price: '800,000'
    },
    {
      id: 3,
      title: 'Resort Đà Nẵng',
      image: 'https://source.unsplash.com/400x300/?resort',
      price: '2,000,000'
    }
  ];

  return (
    <Row gutter={[16, 16]}>
      {fakeServices.map((s) => (
        <Col key={s.id} xs={24} sm={12} md={8}>
          <ServiceCard {...s} />
        </Col>
      ))}
    </Row>
  );
}
