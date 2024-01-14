import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getColors } from '../helperfunctions/getColors';
import 'chartjs-adapter-moment';
import axios from 'axios';

const DailyAdherenceChart = () => {
    const [accuracyData, setAccuracyData] = useState({
        time: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ],
        datasets: [],
    });

    useEffect(() => {
        const fetchAccuracyData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/getAccuracyByDay');
                const formattedData = formatAccuracyData(response.data);
                setAccuracyData(formattedData);
            } catch (error) {
                console.error('Error fetching accuracy data:', error);
            }
        };

        fetchAccuracyData();
    }, []);

    const formatAccuracyData = (data) => {
        const uniqueMedications = [...new Set(data.map(item => item.medication_name))];
        const datasets = uniqueMedications.map(medication => {
            const accuracyArray = Array.from({ length: 7 }).fill(null);
            data
                .filter(item => item.medication_name === medication)
                .forEach(item => {
                    const index = accuracyData.time.indexOf(item.day_of_week);
                    if (index !== -1) {
                        accuracyArray[index] = parseFloat(item.accuracy_percentage);
                    }
                });
            return {
                label: medication,
                accuracy: accuracyArray,
            };
        });

        return {
            time: accuracyData.time,
            datasets,
        };
    };

    const backgroundColors = getColors(accuracyData.datasets, [180, 127, 127], [225, 106, 106], 1);

    const chartData = {
        labels: accuracyData.time,
        datasets: accuracyData.datasets.map((medication, index) => ({
            label: medication.label,
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
                    family: 'Poppins, sans-serif', // Add Poppins font family
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
                        family: 'Poppins, sans-serif', // Add Poppins font family
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
                        family: 'Poppins, sans-serif', // Add Poppins font family
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
};

export default DailyAdherenceChart;
