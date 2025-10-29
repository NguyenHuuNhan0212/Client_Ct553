import React from 'react';
import { Card } from 'antd';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

function LineChartNewUsers({ data }) {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Người dùng mới',
        data: data.map((item) => item.newUsers),
        fill: true,
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.2)',
        tension: 0.4,
        pointBackgroundColor: '#8884d8',
        pointRadius: 5,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { size: 13 }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} người`
        }
      }
    },
    scales: {
      x: {
        ticks: { font: { size: 12 } },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 12 } },
        grid: { color: 'rgba(200, 200, 200, 0.2)' }
      }
    }
  };

  return (
    <Card
      title='Người dùng mới trong 7 ngày qua'
      style={{ borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <div style={{ width: '100%', height: 320 }}>
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
}

export default LineChartNewUsers;
