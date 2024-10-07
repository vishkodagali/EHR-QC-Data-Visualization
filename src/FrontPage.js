import React, { useState } from 'react';
import "./FrontPage.css"
import ScatterPlotDataHandler from './Components/ScatterChartDataHandler';
import BarChartDataHandler from './Components/BarChartDataHandler';
import BoxChartDataHandler from './Components/BoxChartDataHandler';
import PieChartDataHandler from './Components/PieChartDataHandler';
import LineChartDataHandler from './Components/LineChartDataHandler';
import ViolinPlotDataHandler from './Components/ViolinPlotDataHandler'; 
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FrontPage = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [charts, setCharts] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        setFileNames([...fileNames, ...files.map(file => file.name)]);

        files.forEach(file => {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    setCsvData(prevData => [...prevData, ...results.data]);
                }
            });
        });
    };

    const removeFile = (index) => {
        const updatedFiles = [...selectedFiles];
        const updatedFileNames = [...fileNames];
        updatedFiles.splice(index, 1);
        updatedFileNames.splice(index, 1);
        setSelectedFiles(updatedFiles);
        setFileNames(updatedFileNames);
    };

    const handleGraphSelect = (selectedGraph) => {
        const newChart = {
            type: selectedGraph,
            data: csvData
        };
        setCharts([...charts, newChart]);
    };

    const handleExportPDF = async () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        let yOffset = 10;

        for (let i = 0; i < charts.length; i++) {
            const chartElement = document.getElementById(`chart-${i}`);
            if (!chartElement) continue;

            await html2canvas(chartElement, { scrollY: -window.scrollY }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                if (yOffset + pdfHeight > pdf.internal.pageSize.getHeight()) {
                    pdf.addPage();
                    yOffset = 10;
                }
                pdf.addImage(imgData, 'PNG', 10, yOffset, pdfWidth - 20, pdfHeight);
                yOffset += pdfHeight + 10;
            }).catch(error => {
                console.error("Error generating PDF: ", error);
            });
        }

        pdf.save("charts.pdf");
    };

    return (
        <div className="container">
           
            <section className="content">
                <h2>Import Your CSV Files</h2>
                <p>Click the button below to import your CSV files:</p>
                <div className="button-container">
                    <label htmlFor="file-input" className="file-label">Import</label>
                    <input id="file-input" type="file" accept=".csv" multiple className="file-input"
                           onChange={handleFileChange} />
                </div>
                <div>
                    {fileNames.map((fileName, index) => (
                        <div key={index} className="file-info">
                            <span>{fileName}</span>
                            <button onClick={() => removeFile(index)}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="graph-dropdown">
                    <label htmlFor="graph-select">Select Graph:</label>
                    <select id="graph-select" onChange={(e) => handleGraphSelect(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="ScatterPlot">Scatter Plot</option>
                        <option value="BarChart">Bar Chart</option>
                        <option value="BoxPlot">Box Plot</option>
                        <option value="PieChart">Pie Chart</option>
                        <option value="LineChart">Line Chart</option>
                        <option value="ViolinPlot">Violin Plot</option>
                    </select>
                </div>

                <button className="export-button" onClick={handleExportPDF}>Export to PDF</button>

                <div className="charts-container">
                    {charts.map((chart, index) => (
                        <div key={index} className="chart">
                            {chart.type === 'ScatterPlot' && <ScatterPlotDataHandler csvData={chart.data} />}
                            {chart.type === 'BarChart' && <BarChartDataHandler csvData={chart.data} />}
                            {chart.type === 'BoxPlot' && <BoxChartDataHandler csvData={chart.data} />}
                            {chart.type === 'PieChart' && <PieChartDataHandler csvData={chart.data} />}
                            {chart.type === 'LineChart' && <LineChartDataHandler csvData={chart.data} />}
                            {chart.type === 'ViolinPlot' && <ViolinPlotDataHandler csvData={chart.data} />}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FrontPage;
