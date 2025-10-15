import React from 'react';
import { Button, Card, List, Typography, Row, Col, Tag } from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

export default function ItineraryDetail({ itinerary, onBack }) {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Button onClick={onBack} style={{ marginBottom: 16 }}>
        ← Quay lại
      </Button>

      <Card
        cover={
          <img
            alt={itinerary.title}
            src={itinerary.image}
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
