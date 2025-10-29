// src/components/charts/PieChartPlaceType.jsx
import React from 'react';
import { Card } from 'antd';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChartPlaceType({ data }) {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Số lượng địa điểm',
        data: data.map((item) => item.value),
        backgroundColor: [
          '#0088FE',
          '#00C49F',
          '#FFBB28',
          '#FF8042',
          '#9E4AFF'
        ],
        borderColor: '#fff',
        borderWidth: 2
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
      tooltip: {
        callbacks: {
          label: (context) =>
            `Số lượng ${context.label}: ${context.formattedValue}`
        }
      }
    }
  };

  return (
    <Card
      title='Tỷ lệ địa điểm theo loại'
      style={{ borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <div
        style={{
          width: '100%',
          height: 320,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Pie data={chartData} options={options} />
      </div>
    </Card>
  );
}

export default PieChartPlaceType;
