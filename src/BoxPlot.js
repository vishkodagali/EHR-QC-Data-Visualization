import React from 'react';
import Plot from 'react-plotly.js';

const BoxPlot = ({ data }) => {
    const trace = {
        y: data,
        type: 'box',
        name: 'Data Distribution',
        boxpoints: 'all'
    };

    return (
        <Plot
            data={[trace]}
            layout={{
                title: 'Box Plot',
                yaxis: {
                    title: 'Values'
                }
            }}
        />
    );
};

export default BoxPlot;
