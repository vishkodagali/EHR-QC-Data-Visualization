
import React from 'react';
import Plot from 'react-plotly.js';

const ScatterPlot = ({ data, xColumn, yColumn }) => {
    const xData = data.map(item => parseFloat(item[xColumn])).filter(item => !isNaN(item));
    const yData = data.map(item => parseFloat(item[yColumn])).filter(item => !isNaN(item));

    return (
        <Plot
            data={[{
                x: xData,
                y: yData,
                mode: 'markers',
                type: 'scatter',
                marker: { color: 'blue' }
            }]}
            layout={{
                title: 'Scatter Plot',
                xaxis: { title: xColumn },
                yaxis: { title: yColumn },
                width: 600,
                height: 400
            }}
        />
    );
};

export default ScatterPlot;
 