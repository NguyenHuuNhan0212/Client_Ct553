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
        display: true,
        text: 'Doanh thu theo địa điểm (VNĐ)',
        font: {
          size: 18
        }
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
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueByLocationChart;
