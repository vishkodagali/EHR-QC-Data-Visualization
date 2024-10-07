import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

function generateUniqueColors(numColors) {
  const colors = new Set();

  while (colors.size < numColors) {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    colors.add(color);
  }

  return Array.from(colors);
}

function PieChart({ data, selectedColumn }) {
  const filteredData = data
    .map(record => record[selectedColumn])
    .filter(value => value !== null && value !== undefined);

  const counts = {};
  filteredData.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
  });

  const keys = Object.keys(counts);
  const uniqueColors = generateUniqueColors(keys.length);

  const chartData = {
    labels: keys,
    datasets: [
      {
        label: selectedColumn,
        data: Object.values(counts),
        backgroundColor: uniqueColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <div style={{ width: '800px', height: '800px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PieChart;
