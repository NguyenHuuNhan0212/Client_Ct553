import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Typography } from 'antd';
import { Bar } from 'react-chartjs-2';
const { Title: AntTitle } = Typography;
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueByLocationBarChart = ({ data }) => {
  const chartData = {
    labels: data?.labels,
    datasets: data?.datasets
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
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
      <AntTitle level={4}>Doanh thu theo địa điểm (Ngày)</AntTitle>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueByLocationBarChart;
