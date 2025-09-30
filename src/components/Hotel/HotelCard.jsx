import { Card, Rate, Tag, Button } from 'antd';
import { DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function HotelCard({ hotel }) {
  const firstImage =
    hotel.images && hotel.images.length > 0
      ? `http://localhost:3000/${hotel.images[0]}`
      : 'https://via.placeholder.com/400x250?text=No+Image';

  return (
    <Card
      hoverable
      style={{
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
      cover={
        <img
          alt={hotel.name}
          src={firstImage}
          style={{
            height: 220,
            objectFit: 'cover'
          }}
        />
      }
    >
      <Meta
        title={
          <div style={{ fontSize: 18, fontWeight: 600 }}>{hotel.name}</div>
        }
        description={
          <div>
            <div
              style={{
                color: '#555',
                fontSize: 14,
                marginBottom: 10,
                maxHeight: 50,
                overflow: 'hidden'
              }}
            >
              <EnvironmentOutlined /> {hotel.address}{' '}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10
              }}
            >
              <Tag color='green' style={{ fontSize: 14 }}>
                <DollarOutlined /> {hotel.minPricePerNight}K/đêm
              </Tag>
              <span style={{ fontWeight: 600 }}>
                Tổng: {hotel.minTotal}K/ ({hotel.nights} đêm)
              </span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
              <Tag color='blue'>
                {hotel.availableRoomTypesCount} loại phòng còn trống
              </Tag>
            </div>
            <Link to={`/hotel/${hotel.hotelId}`}>
              <Button type='primary' block style={{ marginTop: 12 }}>
                Xem chi tiết
              </Button>
            </Link>
          </div>
        }
      />
    </Card>
  );
}
