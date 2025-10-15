import React from 'react';
import { Input, Segmented } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

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
            { label: 'Tất cả', value: 'all' },
            { label: 'Sắp tới', value: 'upcoming' },
            { label: 'Đã hoàn thành', value: 'completed' }
          ]}
          value={selectedFilter}
          onChange={setSelectedFilter}
        />
      </div>
    </div>
  );
}
