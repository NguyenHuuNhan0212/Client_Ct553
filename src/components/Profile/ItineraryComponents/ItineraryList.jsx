import React from 'react';
import { Card, Tag } from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined
} from '@ant-design/icons';
import ItineraryCard from './ItineraryCard';

export default function ItineraryList({ itineraries, onSelect }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 20,
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}
    >
      {itineraries.map((item, i) => (
        <div key={i}>
          <ItineraryCard item={item} onSelect={onSelect} />{' '}
        </div>
      ))}
    </div>
  );
}
