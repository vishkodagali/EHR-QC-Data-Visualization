import React, { useEffect, useState } from 'react';
import ScatterPlot from '../ScatterPlot';

function ScatterPlotDataHandler({ csvData }) {
    const [data, setData] = useState([]);
    const [xColumn, setXColumn] = useState('');
    const [yColumn, setYColumn] = useState('');
    const [showChart, setShowChart] = useState(false);
    const [warning, setWarning] = useState('');

    useEffect(() => {
        if (csvData.length > 0) {
            setData(csvData);
        }
    }, [csvData]);

    const handleGenerateChart = () => {
        if (xColumn && yColumn && !warning) {
            setShowChart(true);
        } else {
            setShowChart(false);
            alert('Please select valid columns.');
        }
    };

    return (
        // <div>
        //     <h1>Scatter Plot Data Visualization</h1>
        //     {warning && <p style={{color: 'red'}}>{warning}</p>}
        //     <select value={xColumn} onChange={(e) => setXColumn(e.target.value)}>
        //         <option value="">Select X column</option>
        //         {data.length > 0 && Object.keys(data[0]).map(key => (
        //             <option key={key} value={key}>{key}</option>
        //         ))}
        //     </select>
        //     <select value={yColumn} onChange={(e) => setYColumn(e.target.value)}>
        //         <option value="">Select Y column</option>
        //         {data.length > 0 && Object.keys(data[0]).map(key => (
        //             <option key={key} value={key}>{key}</option>
        //         ))}
        //     </select>
        //     <button onClick={handleGenerateChart} disabled={!xColumn || !yColumn}>Generate Chart</button>

        //     {showChart && <ScatterPlot data={data} xColumn={xColumn} yColumn={yColumn} />}
        // </div>

        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto', marginTop: '40px' }}>
        <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2rem' }}>Scatter Plot Data Visualization</h1>
        {warning && <p style={{ color: 'red' }}>{warning}</p>}
        <div style={{ marginBottom: '20px' }}>
            <select
                value={xColumn}
                onChange={(e) => setXColumn(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', marginRight: '10px', transition: 'border-color 0.3s ease' }}
            >
                <option value="">Select X column</option>
                {data.length > 0 && Object.keys(data[0]).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
            <select
                value={yColumn}
                onChange={(e) => setYColumn(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '1rem', marginRight: '10px', transition: 'border-color 0.3s ease' }}
            >
                <option value="">Select Y column</option>
                {data.length > 0 && Object.keys(data[0]).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
        </div>
        <button
            onClick={handleGenerateChart}
            disabled={!xColumn || !yColumn}
            style={{
                padding: '10px 20px',
                backgroundColor: !xColumn || !yColumn ? '#ccc' : '#0063B2ff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: !xColumn || !yColumn ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease',
                fontWeight: 'bold',
                fontSize: '1rem'
            }}
        >
            Generate Chart
        </button>
    
        {showChart && (
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <ScatterPlot data={data} xColumn={xColumn} yColumn={yColumn} />
            </div>
        )}
    </div>
    

    );
}

export default ScatterPlotDataHandler;
