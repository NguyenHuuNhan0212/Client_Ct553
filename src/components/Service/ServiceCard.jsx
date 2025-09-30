import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { capitalizeName } from '../../utils/capitalize';
import { EnvironmentOutlined } from '@ant-design/icons';
const { Meta } = Card;

export default function ServiceCard({
  _id,
  name,
  images,
  address,
  type,
  isHotel = false
}) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={name}
          src={`http://localhost:3000/${images[0]}`}
          style={{ height: 180, objectFit: 'cover' }}
        />
      }
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Meta
        style={{ fontSize: '16px' }}
        title={capitalizeName(name)}
        description={
          <>
            <div>
              <EnvironmentOutlined /> {address}
            </div>
            <div>
              Loại:{' '}
              {type === 'touristSpot'
                ? 'Địa điểm du lịch'
                : type === 'cafe'
                ? 'Quán cafe'
                : type === 'restaurant'
                ? 'Địa điểm ăn uống'
                : 'Khách sạn, nhà nghĩ'}
            </div>
          </>
        }
      />
      <Link to={isHotel ? `/hotel/${_id}` : `/place/${_id}`}>
        <Button type='primary' block style={{ marginTop: 12 }}>
          Xem chi tiết
        </Button>
      </Link>
    </Card>
  );
}
