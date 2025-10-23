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
import { Bar } from 'react-chartjs-2';

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
        position: 'top'
      },
      title: {
        display: true,
        text: 'Doanh thu theo địa điểm (ngày)',
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

  return <Bar data={chartData} options={options} />;
};

export default RevenueByLocationBarChart;
