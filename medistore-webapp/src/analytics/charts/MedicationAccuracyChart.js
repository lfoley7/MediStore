import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const MedicationAccuracyChart = () => {
    const data = {
        labels: ['On Time', 'Late', 'Missed'],
        datasets: [
            {
                data: [70, 20, 10], // Adjust values based on your data
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
                }
            },
            titleFont: {
                family: 'Poppins, sans-serif'
            },
            bodyFont: {
                family: 'Poppins, sans-serif'
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Medication Accuracy',
                color: 'rgb(80, 80, 80)',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
            datalabels: {
                display: true,
                color: 'white',
                font: {
                    weight: 'bold',
                    size: 14,
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
                        family: 'Poppins, sans-serif',
                        size: 10
                    }
                },
            },
        },
        cutout: '60%',
    };

    return <Doughnut data={data} plugins={[ChartDataLabels]} options={options} style={{ padding: "0 2vw 1rem" }} />
};

export default MedicationAccuracyChart;
