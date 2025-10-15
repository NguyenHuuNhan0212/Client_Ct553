import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import FilterBar from './ItineraryComponents/FilterBar';
import ItineraryList from './ItineraryComponents/ItineraryList';
import ItineraryDetail from './ItineraryComponents/ItineraryDetail';

export default function ItineraryComponent() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  const itineraries = [
    {
      id: 1,
      title: 'Khám Phá Đà Lạt',
      destination: 'Đà Lạt, Lâm Đồng',
      startDate: '2025-11-10',
      endDate: '2025-11-15',
      duration: '5 ngày 4 đêm',
      travelers: 4,
      image:
        'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
      status: 'upcoming',
      activities: [
        'Tham quan hồ Xuân Hương',
        'Thác Datanla',
        'Đồi chè Cầu Đất',
        'Chợ đêm Đà Lạt'
      ],
      budget: '8,000,000 VNĐ'
    },
    {
      id: 2,
      title: 'Hà Nội - Sài Gòn',
      destination: 'Hà Nội & TP.HCM',
      startDate: '2025-10-20',
      endDate: '2025-10-25',
      duration: '5 ngày 4 đêm',
      travelers: 2,
      image:
        'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
      status: 'completed',
      activities: [
        'Phố cổ Hà Nội',
        'Chùa Một Cột',
        'Bến Nhà Rồng',
        'Dinh Độc Lập'
      ],
      budget: '12,000,000 VNĐ'
    }
  ];

  const filtered = itineraries.filter((i) => {
    const matchFilter = selectedFilter === 'all' || i.status === selectedFilter;
    const matchSearch =
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
      {!selectedItinerary ? (
        <>
          <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>
            Lịch trình của tôi
          </h1>
          <p style={{ color: '#777', marginBottom: 24 }}>
            Quản lý và theo dõi các chuyến đi
          </p>

          <FilterBar
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <ItineraryList
            itineraries={filtered}
            onSelect={setSelectedItinerary}
          />

          <FloatButton
            icon={<PlusOutlined />}
            type='primary'
            style={{ right: 24, bottom: 24 }}
            tooltip='Thêm lịch trình mới'
          />
        </>
      ) : (
        <ItineraryDetail
          itinerary={selectedItinerary}
          onBack={() => setSelectedItinerary(null)}
        />
      )}
    </div>
  );
}
