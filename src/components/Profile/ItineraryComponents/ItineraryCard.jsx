import React from 'react';
import { Card, Tag, Space, Typography, Divider } from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  UserOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ItineraryCard({ itinerary, onSelect }) {
  const getStatusTag = (status) => {
    if (status === 'upcoming') {
      return <Tag color='blue'>Sắp tới</Tag>;
    }
    return <Tag color='default'>Đã hoàn thành</Tag>;
  };

  return (
    <Card
      hoverable
      cover={
        <img
          alt={itinerary.title}
          src={itinerary.image}
          style={{
            height: 200,
            objectFit: 'cover'
          }}
        />
      }
      onClick={() => onSelect(itinerary)}
      style={{
        borderRadius: 12,
        overflow: 'hidden'
      }}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        <Space
          align='start'
          style={{ justifyContent: 'space-between', width: '100%' }}
        >
          <Title level={4} style={{ margin: 0 }}>
            {itinerary.title}
          </Title>
          {getStatusTag(itinerary.status)}
        </Space>

        <Space direction='vertical' size={4}>
          <Text type='secondary'>
            <EnvironmentOutlined style={{ marginRight: 6 }} />
            {itinerary.destination}
          </Text>
          <Text type='secondary'>
            <ClockCircleOutlined style={{ marginRight: 6 }} />
            {itinerary.duration}
          </Text>
          <Text type='secondary'>
            <UserOutlined style={{ marginRight: 6 }} />
            {itinerary.travelers} người
          </Text>
        </Space>

        <Divider style={{ margin: '12px 0' }} />

        <Space
          align='center'
          style={{
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Text strong style={{ color: '#1677ff' }}>
            Xem chi tiết
          </Text>
          <RightOutlined style={{ color: '#1677ff', fontSize: 18 }} />
        </Space>
      </Space>
    </Card>
  );
}
