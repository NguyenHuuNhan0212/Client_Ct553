// src/components/charts/TopPopularPlacesChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';
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

function TopPopularPlacesChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Số lượt đặt',
        data: data.map((item) => item.totalBookings),
        backgroundColor: ['#4F46E5', '#22C55E', '#F97316', '#EAB308', '#3B82F6']
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Top 5 địa điểm phổ biến nhất',
        font: { size: 16, weight: 'bold' },
        color: '#111827'
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.parsed.y} lượt đặt`
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

  return (
    <Card
      title='Top 5 địa điểm phổ biến nhất'
      style={{
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <Bar data={chartData} options={options} height={100} />
    </Card>
  );
}

export default TopPopularPlacesChart;
