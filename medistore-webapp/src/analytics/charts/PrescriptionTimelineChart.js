import React from 'react';
import { Line } from 'react-chartjs-2';
import { getColors } from '../helperfunctions/getColors';
import ChartJS from 'chart.js/auto';
import 'chartjs-adapter-moment';

const PrescriptionTimelineChart = () => {
  const data = {
    time: [
      new Date('2024-01-01'),
      new Date('2024-01-02'),
      new Date('2024-01-03'),
      new Date('2024-01-04'),
      new Date('2024-01-05'),
    ],
    datasets: [
      {
        dosage: [10, 15, 20, 18, 25],
      },
      {
        dosage: [5, 12, 15, 22, 28],
      },
    ],
  };

  const backgroundColors = getColors(data.datasets, [180, 127, 127], [225, 106, 106], 1);

  const chartData = {
    labels: data.time,
    datasets: data.datasets.map((medication, index) => ({
      label: `Medication ${index + 1}`,
      data: medication.dosage,
      borderColor: backgroundColors,
      backgroundColor: backgroundColors,
      fill: false,
      stepped: 'before',
      pointRadius: 4,
    })),
  };

  const options = {
    aspectRatio: 2 / 1.33,
    plugins: {
      title: {
        display: true,
        text: 'Dosage Over Time',
        color: `rgb(80,80,80)`,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D',
          },
        },
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          display: false
        },
      },
      y: {
        title: {
          display: true,
          text: 'Dosage',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          callback: function (value) {
            return value + 'mg';
          },
        }
      },
    },
  };

  return <Line data={chartData} options={options} />
};

export default PrescriptionTimelineChart;
