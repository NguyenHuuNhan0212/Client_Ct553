import { Card, Typography, Tag, Button } from 'antd';
import { FaBed } from 'react-icons/fa';
import styles from './style.module.css';

const { Title, Paragraph } = Typography;

const RoomCard = ({ room }) => {
  const { roomCard, roomCover, roomIcon, roomOverlay } = styles;
  return (
    <Card
      className={roomCard}
      hoverable
      cover={
        <div className={roomCover}>
          <FaBed className={roomIcon} />
          <div className={roomOverlay}>
            <Button type='primary'>Đặt ngay</Button>
          </div>
        </div>
      }
    >
      <Title level={4}>{room.name}</Title>
      <Paragraph>
        <Tag color='blue'>{room.capacity} người</Tag>
        <Tag color='green'>{room.pricePerNight.toLocaleString()} K/đêm</Tag>
      </Paragraph>
    </Card>
  );
};

export default RoomCard;
