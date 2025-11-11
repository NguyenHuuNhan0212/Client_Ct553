// src/components/charts/TopPopularPlacesChart.jsx
import React from 'react';
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
import DateFilter from '../../Profile/RevenueChart/DateFilter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChartTwo({ data, title, unitTransaction, unitRevenue, onChange }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Số giao dịch',
        data: data.map((item) => item.valueTotalTransaction),
        backgroundColor: '#4F46E5',
        yAxisID: 'y'
      },
      {
        label: 'Doanh thu',
        data: data.map((item) => item.valueTotalRevenue),
        backgroundColor: '#F97316',
        yAxisID: 'y1'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: title,
        font: { size: 16, weight: 'bold' },
        color: '#111827'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.datasetIndex === 0)
              return ` ${context.parsed.y} ${unitTransaction || ''}`;
            if (context.datasetIndex === 1)
              return ` ${context.parsed.y} ${unitRevenue || ''}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#374151' },
        grid: { display: false }
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        position: 'left',
        ticks: { color: '#374151' },
        grid: { color: '#E5E7EB' },
        title: { display: true, text: unitTransaction || '' }
      },
      y1: {
        type: 'linear',
        beginAtZero: true,
        position: 'right',
        ticks: { color: '#F97316' },
        grid: { drawOnChartArea: false },
        title: { display: true, text: unitRevenue || '' }
      }
    }
  };
  return (
    <Card
      title={title}
      style={{
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        height: '100%'
      }}
      extra={<DateFilter isAdmin onChange={onChange} />}
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
            <Empty description={'Không có thống kê'} />
          ) : (
            <Bar data={chartData} height={350} width={500} options={options} />
          )}
        </div>
      </div>
    </Card>
  );
}

export default BarChartTwo;
