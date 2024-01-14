import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

const MedicationAccuracyChart = () => {
    const [accuracyData, setAccuracyData] = useState({ on_time: 0, late: 0, missed: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/getAccuracy');
                setAccuracyData(response.data[0]);
            } catch (error) {
                console.error('Error fetching accuracy data:', error);
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: ['On Time', 'Late', 'Missed'],
        datasets: [
            {
                data: [accuracyData.on_time_count, accuracyData.late_count, accuracyData.missed_count],
                backgroundColor: ['rgb(15, 130, 40)', 'rgb(255, 200, 0)', 'rgb(170, 20, 45)'],
            },
        ],
    };

    const options = {
        aspectRatio: 2 / 1.33,
        responsive: true,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    let label = data.labels[tooltipItem.index];
                    let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return label + ': ' + value;
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Medication Accuracy',
                color: 'rgb(80, 80, 80)',
                font: {
                    size: 18,
                    weight: 'bold',
                    family: 'Poppins, sans-serif',
                },
            },
            datalabels: {
                display: true,
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 16,
                    family: 'Poppins, sans-serif',
                },
                formatter: (value, context) => {
                    return context.chart.data.labels[context.dataIndex];
                },
            },
            legend: {
                display: true,
                labels: {
                    boxWidth: 13,
                    boxHeight: 13,
                    font: {
                        size: 10,
                        family: 'Poppins, sans-serif',
                    },
                },
            },
        },
        cutout: '60%',
    };

    return <Doughnut data={data} plugins={[ChartDataLabels]} options={options} style={{ padding: "0 2vw 1rem" }} />;
};

export default MedicationAccuracyChart;