import React from 'react';
import { Button, Input, Segmented, Typography } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function FilterBar({
  selectedFilter,
  setSelectedFilter,
  searchQuery,
  setSearchQuery
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        marginBottom: 24,
        background: '#fff',
        padding: 16,
        borderRadius: 12
      }}
    >
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button type='primary' onClick={() => navigate('/itinerary')}>
          <PlusCircleOutlined /> Tạo lịch trình ngay
        </Button>
        <Input
          prefix={<SearchOutlined />}
          placeholder='Tìm kiếm lịch trình...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, minWidth: 260 }}
        />
        <Segmented
          options={[
            {
              label: (
                <Typography.Text style={{ color: '#444', fontWeight: 500 }}>
                  Tất cả
                </Typography.Text>
              ),
              value: 'all'
            },
            {
              label: (
                <Typography.Text style={{ color: '#b67d00', fontWeight: 500 }}>
                  <ClockCircleOutlined /> Sắp tới / Đang diễn ra
                </Typography.Text>
              ),
              value: 'upcoming'
            },
            {
              label: (
                <Typography.Text style={{ color: '#08979c', fontWeight: 500 }}>
                  <CheckCircleOutlined /> Đã hoàn thành
                </Typography.Text>
              ),
              value: 'completed'
            }
          ]}
          value={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>
    </div>
  );
}
