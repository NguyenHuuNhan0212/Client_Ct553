import { Row, Col } from 'antd';
import ServiceCard from './ServiceCard';

export default function ServiceList({ places }) {
  return (
    <Row gutter={[16, 16]}>
      {places?.map((s) => (
        <Col key={s._id} xs={24} sm={12} md={8} lg={6}>
          <ServiceCard {...s} />
        </Col>
      ))}
    </Row>
  );
}
