import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getColors } from '../helperfunctions/getColors';
import 'chartjs-adapter-moment';

const WeeklyAdherenceChart = () => {
    const data = {
        time: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        datasets: [
            {
                accuracy: [80, 90, 85, 75, 95, 92, 88], // Replace with your actual accuracy data
            },
            {
                accuracy: [70, 85, 80, 78, 92, 89, 86], // Replace with your actual accuracy data
            },
        ],
    };

    const backgroundColors = getColors(data.datasets, [180, 127, 127], [225, 106, 106], 1);

    const chartData = {
        labels: data.time,
        datasets: data.datasets.map((medication, index) => ({
            label: `Medication ${index + 1}`,
            data: medication.accuracy,
            backgroundColor: backgroundColors[index],
        })),
    };

    const options = {
        aspectRatio: 2 / 1.33,
        plugins: {
            title: {
                display: true,
                text: 'Accuracy By Day',
                color: 'rgb(80,80,80)',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Accuracy (%)',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
                ticks: {
                    callback: function (value) {
                        return value + '%';
                    },
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
}

export default WeeklyAdherenceChart;
