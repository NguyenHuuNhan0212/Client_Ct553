import { Card, Tag, Button } from 'antd';
import { DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HotelCard({ hotel }) {
  const { checkIn, checkOut } = useSelector((state) => state.hotel);
  const firstImage =
    hotel.images && hotel.images.length > 0
      ? `http://localhost:3000/${hotel.images[0]}`
      : 'https://via.placeholder.com/400x250?text=No+Image';

  return (
    <Card
      hoverable
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
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        height: '100%'
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{hotel.name}</div>
          <div
            style={{
              color: '#555',
              fontSize: 14,
              marginBottom: 10,
              maxHeight: 50,
              overflow: 'hidden'
            }}
          >
            <EnvironmentOutlined /> {hotel.address}
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
              <DollarOutlined /> {hotel.minPricePerNight.toLocaleString()}{' '}
              VNĐ/đêm
            </Tag>
            {checkIn && checkOut && (
              <span style={{ fontWeight: 600 }}>
                Tổng: {hotel.minTotal.toLocaleString()}VNĐ ({hotel.nights} đêm)
              </span>
            )}
          </div>

          <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
            <Tag color='blue'>
              {hotel.availableRoomTypesCount} loại phòng còn trống
            </Tag>
          </div>
        </div>

        <Link to={`/hotel/${hotel.hotelId}`}>
          <Button type='primary' block style={{ marginTop: 12 }}>
            Xem chi tiết
          </Button>
        </Link>
      </div>
    </Card>
  );
}
