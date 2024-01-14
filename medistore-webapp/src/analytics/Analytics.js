import React from 'react';
import MedicationAccuracyChart from './charts/MedicationAccuracyChart';
import PrescriptionTimelineChart from './charts/PrescriptionTimelineChart';
import DailyAdherenceChart from './charts/DailyAdherenceChart';
import FrequentMedicationsChart from './charts/FrequentMedicationsChart';
import './Analytics.css';

function ChartContainer({ children }) {
    return <div className="chart-container">{children}</div>;
}

function Analytics() {
    return (
        <div className="analytics-container">
            <ChartContainer>
                <MedicationAccuracyChart />
                <PrescriptionTimelineChart />
            </ChartContainer>
            <ChartContainer>
                <DailyAdherenceChart />
                <FrequentMedicationsChart />
            </ChartContainer>
        </div>
    );
}

export default Analytics;
