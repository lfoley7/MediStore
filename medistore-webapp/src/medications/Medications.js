import React, { useState, useEffect } from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Medications.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const Medications = () => {
    const [medications, setMedications] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/getMedications');
                setMedications(response.data);
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        };

        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/getPrescriptions');
                setPrescriptions(response.data);
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        };

        fetchMedications();
        fetchPrescriptions();
    }, []);

    const renderTooltip = (medication) => {
        if (medication.amount <= medication.maxCapacity / 5) {
            return (
                <Tooltip id={`tooltip-${medication.name}`}>
                    {medication.amount <= 0
                        ? 'Refill required immediately!'
                        : 'Refill needed soon'}
                </Tooltip>
            );
        }
        return null; // Return null to avoid rendering an empty Tooltip
    };

    const getBackgroundColor = (amount, maxCapacity) => {
        const percentage = (amount / maxCapacity) * 100;
        if (percentage <= 20 && percentage > 0) {
            return 'bg-warning'; // Yellow for low capacity
        } else if (amount === 0) {
            return 'bg-danger'; // Red for no capacity
        }
        return '';
    };

    const medicationsByRowAndColumn = medications.reduce((acc, medication) => {
        if (!acc[medication.med_row]) {
            acc[medication.med_row] = {};
        }

        // Fix the property name to match the data
        const colKey = `col_${medication.med_column}`;

        if (!acc[medication.med_row][colKey]) {
            acc[medication.med_row][colKey] = [];
        }

        acc[medication.med_row][colKey].push(medication);
        return acc;
    }, {});

    const localizer = momentLocalizer(moment);

    // Dynamically generate calendar events for prescriptions
    const calendarEvents = prescriptions.map((prescription) => {
        const { time_of_day, days_of_week, name } = prescription;
        const daysOfWeekArray = days_of_week.split(',');

        // Updated line to set the currentDate to the start of the current ISO week
        const currentDate = moment().startOf('isoWeek');

        let upcomingDay = null;

        for (let i = 0; i < daysOfWeekArray.length; i++) {
            // Updated line to add 7 days to the current day, ensuring it's in the upcoming week
            const currentDay = moment(currentDate).isoWeekday(daysOfWeekArray[i]).add(7, 'days');

            if (currentDay.isAfter(currentDate) && (!upcomingDay || currentDay.isBefore(upcomingDay))) {
                upcomingDay = currentDay;
            }
        }

        if (!upcomingDay) {
            // If no upcoming day is found, default to the first day of the week
            upcomingDay = moment(currentDate).isoWeekday(daysOfWeekArray[0]).add(7, 'days');
        }

        const startDate = upcomingDay.set({
            hours: parseInt(time_of_day),
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
        });
        const endDate = moment(startDate).add(1, 'hour');

        return {
            title: name,
            start: startDate.toDate(),
            end: endDate.toDate(),
        };
    });

    const emptyCell = (
        <td key={-1} className="text-center bg-light">
            {' '}
        </td>
    );

    return (
        <div className="medications-container">
            <Table bordered className="medications-table">
                <thead className="table-dark">
                    <tr>
                        <th></th>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        {/* Add more column headings as needed */}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(medicationsByRowAndColumn).map((rowKey, rowIndex) => (
                        <tr key={rowIndex}>
                            <th className="font-weight-bold table-dark">Row {rowIndex + 1}</th>
                            {Object.keys(medicationsByRowAndColumn[rowKey]).map((colKey, colIndex) => (
                                <OverlayTrigger
                                    key={colKey}
                                    placement="top"
                                    overlay={renderTooltip(medicationsByRowAndColumn[rowKey][colKey][0]) || <div></div>}
                                >
                                    <td
                                        key={colIndex}
                                        className={`text-center ${getBackgroundColor(
                                            medicationsByRowAndColumn[rowKey][colKey][0].amount,
                                            medicationsByRowAndColumn[rowKey][colKey][0].maxCapacity
                                        ) || 'bg-light'}`}
                                    >
                                        {medicationsByRowAndColumn[rowKey][colKey][0].amount}mg
                                    </td>
                                </OverlayTrigger>
                            ))}
                            {/* Add empty cells to fill the row */}
                            {Array.from({ length: 2 - Object.keys(medicationsByRowAndColumn[rowKey]).length }, (_, index) =>
                                emptyCell
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Calendar component integrated here */}
            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={calendarEvents}
                    startAccessor="start"
                    endAccessor="end"
                    views={['week']}
                    defaultView="week"
                    defaultDate={moment().toDate()} // Set the default date to the start of the current week
                />
            </div>
        </div>
    );
};

export default Medications;
