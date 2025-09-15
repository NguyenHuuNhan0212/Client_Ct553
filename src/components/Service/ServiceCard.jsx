import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function ServiceCard({ id, title, image, price }) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={title}
          src={image}
          style={{ height: 180, objectFit: 'cover' }}
        />
      }
      style={{ borderRadius: 10 }}
    >
      <Meta title={title} description={`Giá từ: ${price} VND`} />
      <Link
        to={`/service/${id}`}
        style={{ color: '#1890ff', display: 'block', marginTop: 10 }}
      >
        Xem chi tiết
      </Link>
    </Card>
  );
}
