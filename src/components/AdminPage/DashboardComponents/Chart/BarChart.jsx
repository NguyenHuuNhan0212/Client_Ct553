// src/components/charts/TopPopularPlacesChart.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Empty, Select } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function TopPopularPlacesChart({
  data,
  title,
  unit,
  isManage = false,
  onSetSelectedLocation
}) {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState(null);
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Số lượt đặt',
        data: data.map((item) => item.value),
        backgroundColor: ['#4F46E5', '#22C55E', '#F97316', '#EAB308', '#3B82F6']
      }
    ]
  };
  const handleChangeLocation = (value) => {
    setLocation(value);
    if (onSetSelectedLocation) onSetSelectedLocation(value);
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        font: { size: 16, weight: 'bold' },
        color: '#111827'
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.parsed.y} ${unit || ''}`
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#374151' },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#374151' },
        grid: { color: '#E5E7EB' }
      }
    }
  };
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch('https://provinces.open-api.vn/api/v2');
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error('Lỗi khi load tỉnh thành:', err);
      }
    };
    fetchCities();
  }, []);

  return (
    <Card
      title={title}
      style={{
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        height: '100%'
      }}
      extra={
        isManage && (
          <Select
            showSearch
            allowClear
            placeholder='Chọn Tỉnh/Thành phố'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={cities.map((city) => ({
              label: city.name,
              value: city.name
            }))}
            size='large'
            style={{ width: 200 }}
            value={location}
            onChange={(value) => handleChangeLocation(value)}
          />
        )
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>
          {!data.length ? (
            <Empty description={'Không có địa điểm nào'} />
          ) : (
            <Bar data={chartData} height={300} options={options}></Bar>
          )}
        </div>
      </div>
    </Card>
  );
}

export default TopPopularPlacesChart;
