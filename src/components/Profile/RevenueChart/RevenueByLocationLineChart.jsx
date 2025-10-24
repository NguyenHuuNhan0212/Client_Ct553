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
import { Typography } from 'antd';
import { Line } from 'react-chartjs-2';

const { Text, Title: AntTitle } = Typography;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueByLocationChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString('vi-VN') + ' ₫'
        }
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <AntTitle level={4}>Doanh thu theo địa điểm (Tháng)</AntTitle>
      <Text disabled style={{ fontWeight: 500 }}>
        Nhấn vào tên địa điểm để ẩn địa điểm đi
      </Text>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueByLocationChart;
