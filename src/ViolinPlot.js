import React from 'react';
import Plot from 'react-plotly.js';

const ViolinPlot = ({ data }) => {
    const trace = {
        y: data,
        type: 'violin',
        box: {
            visible: true
        },
        line: {
            color: 'blue'
        },
        meanline: {
            visible: true
        }
    };

    return (
        <Plot
            data={[trace]}
            layout={{
                title: 'Violin Plot',
                yaxis: {
                    title: 'Values'
                }
            }}
        />
    );
};

export default ViolinPlot;
