// MedicationFrequencyChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getColors } from '../helperfunctions/getColors';
import 'chartjs-adapter-moment';

const MedicationFrequencyChart = () => {
    const data = {
        medications: ['Medication A', 'Medication B', 'Medication C', 'Medication D'],
        datasets: [
            {
                timesTaken: [15, 20, 10, 25], // Replace with your actual data
            },
        ],
    };

    // Calculate the total times taken for each medication
    const totalTimesTaken = data.medications.map((medication, index) => ({
        medication,
        total: data.datasets[0].timesTaken[index],
    }));

    // Sort the medications based on total times taken in descending order
    const sortedMedications = totalTimesTaken.sort((a, b) => b.total - a.total);

    // Extract the sorted medication names and times taken
    const sortedMedicationNames = sortedMedications.map((medication) => medication.medication);
    const sortedTimesTaken = sortedMedications.map((medication) => medication.total);

    // Use getColors to generate different colors for each bar
    const backgroundColors = getColors(sortedTimesTaken, [180, 127, 127], [225, 106, 106], 1);

    const chartData = {
        labels: sortedMedicationNames,
        datasets: data.datasets.map((medication, index) => ({
            label: `Medication ${index + 1}`,
            data: sortedTimesTaken,
            backgroundColor: backgroundColors,
        })),
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
                display: false
            }
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
