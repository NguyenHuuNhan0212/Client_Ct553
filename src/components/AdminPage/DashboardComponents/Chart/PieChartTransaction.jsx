import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Card } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartTransactionStats({ data, title }) {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: ['#22C55E', '#EF4444'],
        borderWidth: 1,
        hoverOffset: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 14,
          color: '#374151',
          font: { size: 13 }
        }
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
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        height: '100%'
      }}
    >
      <div style={{ width: '100%', height: 300 }}>
        <Pie data={chartData} options={options} />
      </div>
    </Card>
  );
}

export default PieChartTransactionStats;
