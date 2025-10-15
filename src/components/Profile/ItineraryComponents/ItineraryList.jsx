import React from 'react';
import { Card, Tag } from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined
} from '@ant-design/icons';

export default function ItineraryList({ itineraries, onSelect }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}
    >
      {itineraries.map((item) => (
        <Card
          key={item.id}
          hoverable
          cover={
            <img
              alt={item.title}
              src={item.image}
              style={{ height: 180, objectFit: 'cover' }}
            />
          }
          onClick={() => onSelect(item)}
        >
          <Card.Meta title={item.title} description={item.destination} />
          <div style={{ marginTop: 12 }}>
            <div>
              <ClockCircleOutlined /> {item.duration}
            </div>
            <div>
              <TeamOutlined /> {item.travelers} người
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            {item.status === 'upcoming' ? (
              <Tag color='blue'>Sắp tới</Tag>
            ) : (
              <Tag color='gray'>Đã hoàn thành</Tag>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
