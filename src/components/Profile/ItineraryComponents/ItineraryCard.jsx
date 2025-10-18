import { useEffect, useState } from 'react';
import { Card, Tag, Spin, Tooltip, Typography } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  LineOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import styles from '../style.module.css';
import dayjs from 'dayjs';
const UNSPLASH_KEY = '553eU4V8AG8l8WrGcyX_rD8K0lc2Wen7cNhKerqzUDg';
const { Title } = Typography;
export default function ItineraryCard({ item, onSelect, isTemplate }) {
  const { hoverImageInItineraryCard } = styles;
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const today = dayjs();
  const isTrueDay = today.isAfter(dayjs(item?.startDate));

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            item.destination || 'travel'
          )}&orientation=landscape&per_page=1&client_id=${UNSPLASH_KEY}`
        );
        const data = await res.json();
        const imgUrl =
          data.results?.[0]?.urls?.regular ||
          'http://localhost:3000/uploads/default-travel.jpg';

        // preload ảnh trước khi hiển thị
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
          if (isMounted) {
            setImage(imgUrl);
            setLoading(false);
          }
        };
        img.onerror = () => {
          if (isMounted) {
            setImage('http://localhost:3000/uploads/default-travel.jpg');
            setLoading(false);
          }
        };
      } catch (err) {
        console.error('Lỗi khi tải ảnh:', err);
        if (isMounted) setLoading(false);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [item.destination]);

  return (
    <Tooltip title={'Nhấn để xem chi tiết lịch trình'}>
      <Card
        hoverable
        cover={
          <div style={{ position: 'relative', height: 180 }}>
            {loading && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Spin />
              </div>
            )}
            {!loading && (
              <img
                className={hoverImageInItineraryCard}
                alt={item.title}
                src={image}
              />
            )}
          </div>
        }
        onClick={() => onSelect(item)}
        style={{ height: '100%' }}
      >
        <Card.Meta
          title={<Title level={4}>{item.title}</Title>}
          description={
            <span style={{ color: '#06b6d4', fontWeight: 500 }}>
              <EnvironmentOutlined /> {item.destination}
            </span>
          }
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ marginTop: 12, color: '#3b82f6', fontWeight: 500 }}>
            <ClockCircleOutlined /> {item.numDays} ngày, {item.numDays - 1} đêm
          </div>
          {!isTemplate && (
            <div style={{ color: '#8fe624ff', fontWeight: 500 }}>
              <CalendarOutlined /> {dayjs(item.startDate).format('DD/MM/YYYY')}{' '}
              <LineOutlined /> {dayjs(item.endDate).format('DD/MM/YYYY')}
            </div>
          )}

          <div style={{ color: '#9333ea', fontWeight: 500 }}>
            <UserOutlined /> Người tạo: {item?.creatorName}
          </div>
          {isTemplate && (
            <>
              {' '}
              <div style={{ color: '#e72b4bff', fontWeight: 500 }}>
                <DollarOutlined /> Chi phí:{' '}
                {item?.priceForItinerary?.toLocaleString() || 'Chưa cung cấp'}{' '}
                {item?.priceForItinerary ? 'VNĐ' : ''}
              </div>
              <div style={{ color: '#8fe624ff', fontWeight: 500 }}>
                <TeamOutlined /> Số người tương ứng với chi phí:{' '}
                {item?.people || 'Chưa cung cấp'} {item?.people ? 'người' : ''}
              </div>{' '}
            </>
          )}

          {!isTemplate && (
            <Tag
              color={
                item?.status === 'completed'
                  ? 'cyan'
                  : item?.status === 'upcoming' && !isTrueDay
                  ? 'gold'
                  : 'blue'
              }
              style={{
                width: '100%',
                textAlign: 'center',
                marginTop: 8,
                padding: 3,
                fontWeight: 600
              }}
            >
              {item?.status === 'completed'
                ? 'Đã hoàn thành'
                : item?.status === 'upcoming' && !isTrueDay
                ? 'Sắp tới'
                : 'Đang thực hiện...'}
            </Tag>
          )}
        </div>
      </Card>
    </Tooltip>
  );
}
