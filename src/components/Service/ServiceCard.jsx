import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { capitalizeName } from '../../utils/capitalize';
import { EnvironmentOutlined } from '@ant-design/icons';
const { Meta } = Card;

export default function ServiceCard({ _id, name, images, address, type }) {
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
              {type === 'hotel'
                ? 'Khách sạn, nhà nghĩ'
                : type === 'touristSpot'
                ? 'Địa điểm du lịch'
                : type === 'cafe'
                ? 'Quán cafe'
                : 'Địa điểm ăn uống'}
            </div>
          </>
        }
      />
      <Link
        to={`/place/${_id}`}
        style={{ color: '#1890ff', display: 'block', marginTop: 10 }}
      >
        Xem chi tiết
      </Link>
    </Card>
  );
}
