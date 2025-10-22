// src/components/RevenueChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: data.map((item) => item.revenue),
        borderColor: '#1890ff',
        backgroundColor: 'rgba(24, 144, 255, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Biểu đồ doanh thu theo tháng' },
      tooltip: {
        callbacks: {
          label: (context) => context.parsed.y.toLocaleString('vi-VN') + ' ₫'
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => value / 1_000_000 + 'M'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default RevenueChart;
