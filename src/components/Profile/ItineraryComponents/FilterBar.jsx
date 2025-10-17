import React from 'react';
import { Input, Segmented, Typography } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';

export default function FilterBar({
  selectedFilter,
  setSelectedFilter,
  searchQuery,
  setSearchQuery
}) {
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
