import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ data, xAxis, yAxis }) => {
    const trace = {
        x: data.map(item => item[xAxis]),
        y: data.map(item => item[yAxis]),
        type: 'scatter',
        mode: 'lines+markers',
        name: `${yAxis} over ${xAxis}`
    };

    return (
        <Plot
            data={[trace]}
            layout={{
                title: `${yAxis} over ${xAxis}`,
                xaxis: {
                    title: xAxis
                },
                yaxis: {
                    title: yAxis
                }
            }}
        />
    );
};

export default LineChart;
