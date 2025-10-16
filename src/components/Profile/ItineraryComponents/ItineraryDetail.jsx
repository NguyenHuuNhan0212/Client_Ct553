import React, { useEffect, useState } from 'react';
import { Button, Card, List, Typography, Row, Col, Tag, Tooltip } from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
const UNSPLASH_KEY = '553eU4V8AG8l8WrGcyX_rD8K0lc2Wen7cNhKerqzUDg';
export default function ItineraryDetail({ itinerary, onBack }) {
  const [image, setImage] = useState('');
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            itinerary.destination || 'travel'
          )}&orientation=landscape&per_page=1&client_id=${UNSPLASH_KEY}`
        );
        const data = await res.json();
        setImage(
          data.results?.[0]?.urls?.regular ||
            'http://localhost:3000/uploads/default-travel.jpg'
        );
      } catch (err) {
        console.error('Lỗi khi tải ảnh:', err);
      }
    };
    fetchImage();
  }, [itinerary.destination]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Tooltip title={'Trở lại xem danh sách lịch trình'}>
        <Button onClick={onBack} style={{ marginBottom: 16 }}>
          ← Quay lại
        </Button>
      </Tooltip>

      <Card
        cover={
          <img
            alt={itinerary.title}
            src={image}
            style={{ height: 300, objectFit: 'cover' }}
          />
        }
      >
        <Typography.Title level={3}>{itinerary.title}</Typography.Title>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12
          }}
        >
          <EnvironmentOutlined />
          <Typography.Text>{itinerary.destination}</Typography.Text>
        </div>
        <Tag color={itinerary.status === 'upcoming' ? 'blue' : 'gray'}>
          {itinerary.status === 'upcoming' ? 'Sắp tới' : 'Đã hoàn thành'}
        </Tag>

        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
          <Col span={8}>
            <Card>
              <CalendarOutlined /> {itinerary.duration}
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <TeamOutlined /> {itinerary.travelers} người
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <DollarOutlined /> {itinerary.budget}
            </Card>
          </Col>
        </Row>

        <Typography.Title level={4} style={{ marginTop: 24 }}>
          Hoạt động
        </Typography.Title>
        <List
          dataSource={itinerary.activities}
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text>
                {index + 1}. {item}
              </Typography.Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
