// src/components/charts/PieChartPlaceType.jsx
import React from 'react';
import { Card } from 'antd';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data, title }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          '#22C55E',
          '#EF4444',
          '#0088FE',
          '#00C49F',
          '#FFBB28',
          '#FF8042',
          '#9E4AFF'
        ],
        borderColor: '#fff',
        borderWidth: 1,
        hoverOffset: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          font: { size: 13 }
        }
      },
      title: {
        display: true,
        text: title,
        font: { size: 16, weight: 'bold' },
        color: '#111827'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const value = context.parsed;
            const percent = ((value / total) * 100).toFixed(1);
            return ` ${context.label}: ${value} (${percent}%)`;
          }
        }
      }
    }
  };

  return (
    <Card
      title={title}
      style={{
        borderRadius: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        height: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ width: 350, height: 350 }}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </Card>
  );
}

export default PieChart;
