// MedicationFrequencyChart.jsx
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getColors } from '../helperfunctions/getColors';
import 'chartjs-adapter-moment';
import axios from 'axios';

const MedicationFrequencyChart = () => {
    const [medicationData, setMedicationData] = useState([]);

    useEffect(() => {
        const fetchMedicationData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/getFrequency');
                setMedicationData(response.data);
            } catch (error) {
                console.error('Error fetching medication frequency data:', error);
            }
        };

        fetchMedicationData();
    }, []);

    // Extract the medication names and times taken
    const medicationNames = medicationData.map((medication) => medication.medication_name);
    const timesTaken = medicationData.map((medication) => medication.taken_count);

    // Use getColors to generate different colors for each bar
    const backgroundColors = getColors(timesTaken, [180, 127, 127], [225, 106, 106], 1);

    const chartData = {
        labels: medicationNames,
        datasets: [
            {
                data: timesTaken,
                backgroundColor: backgroundColors,
            },
        ],
    };

    const options = {
        aspectRatio: 2 / 1.33,
        plugins: {
            title: {
                display: true,
                text: 'Medicine Access Frequency',
                color: 'rgb(80,80,80)',
                font: {
                    size: 18,
                    weight: 'bold',
                    family: 'Poppins, sans-serif', // Add Poppins font family
                },
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Medication',
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
                    text: 'Times Taken',
                    font: {
                        size: 14,
                        weight: 'bold',
                        family: 'Poppins, sans-serif', // Add Poppins font family
                    },
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
}

export default MedicationFrequencyChart;
