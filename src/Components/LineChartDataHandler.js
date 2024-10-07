import React, { useState, useEffect } from 'react';
import LineChart from '../LineChart';

function LineChartDataHandler({ csvData }) {
    const [data, setData] = useState([]);
    const [xAxis, setXAxis] = useState('');
    const [yAxis, setYAxis] = useState('');
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        setData(csvData);
    }, [csvData]);

    const handleGenerateChart = () => {
        if (xAxis && yAxis) {
            setShowChart(true);
        } else {
            setShowChart(false);
            alert('Please select an X and Y column to visualize');
        }
    };

    return (
        // <div>
        //     <h1>Line Chart Data Visualization</h1>
        //     <select value={xAxis} onChange={e => setXAxis(e.target.value)}>
        //         <option value="">Select X Axis</option>
        //         {data.length > 0 && Object.keys(data[0]).map(key => (
        //             <option key={key} value={key}>{key}</option>
        //         ))}
        //     </select>
        //     <select value={yAxis} onChange={e => setYAxis(e.target.value)}>
        //         <option value="">Select Y Axis</option>
        //         {data.length > 0 && Object.keys(data[0]).map(key => (
        //             <option key={key} value={key}>{key}</option>
        //         ))}
        //     </select>
        //     <button onClick={handleGenerateChart}>Generate Line Chart</button>

        //     {showChart && <LineChart data={data} xAxis={xAxis} yAxis={yAxis} />}
        // </div>

        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f4f4f9', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', maxWidth: '800px', margin: '0 auto', marginTop: '40px' }}>
            <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2.5rem', fontWeight: 'bold', transition: 'color 0.3s ease' }}>
                Line Chart Data Visualization
            </h1>
            <div style={{ marginBottom: '20px' }}>
                <select
                    value={xAxis}
                    onChange={e => setXAxis(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', marginRight: '10px', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                >
                    <option value="">Select X Axis</option>
                    {data.length > 0 && Object.keys(data[0]).map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
                <select
                    value={yAxis}
                    onChange={e => setYAxis(e.target.value)}
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                >
                    <option value="">Select Y Axis</option>
                    {data.length > 0 && Object.keys(data[0]).map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleGenerateChart}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#0063B2ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >
                Generate Line Chart
            </button>

            {showChart && (
                <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', transition: 'opacity 0.5s ease', opacity: showChart ? 1 : 0 }}>
                    <LineChart data={data} xAxis={xAxis} yAxis={yAxis} />
                </div>
            )}
        </div>
    );
}

export default LineChartDataHandler;
