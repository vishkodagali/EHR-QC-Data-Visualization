import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ data, selectedColumn, divisions }) => {
  const [rangeData, setRangeData] = useState([]);

  useEffect(() => {
    if (!selectedColumn || !divisions) return; // Ensure column and divisions are selected

    const validData = data.map(item => parseFloat(item[selectedColumn])).filter(item => !isNaN(item));
    const max = Math.max(...validData);
    const min = Math.min(...validData);
    const rangeSize = (max - min) / divisions;
    const ranges = Array.from({ length: divisions }, (_, i) => ({
      range: `${(min + i * rangeSize).toFixed(1)}-${(min + (i + 1) * rangeSize).toFixed(1)}`,
      count: 0
    }));

    validData.forEach(value => {
      const index = Math.min(Math.floor((value - min) / rangeSize), divisions - 1);
      ranges[index].count++;
    });

    setRangeData(ranges);
  }, [data, selectedColumn, divisions]);

  return (
    <Plot
      data={[{
        x: rangeData.map(item => item.range),
        y: rangeData.map(item => item.count),
        type: 'bar',
        marker: { color: 'blue' }
      }]}
      layout={{
        title: 'Data Distribution',
        xaxis: { title: 'Range' },
        yaxis: { title: 'Count' },
        width: 600,
        height: 400
      }}
    />
  );
};

export default BarChart;
