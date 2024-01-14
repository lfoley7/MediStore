import React from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Medications.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Medications = () => {
    const medications = [
        { name: 'Aspirin', row: 1, column: 1, amount: 15, maxCapacity: 100 },
        { name: 'Ibuprofen', row: 1, column: 2, amount: 5, maxCapacity: 50 },
        { name: 'Acetaminophen', row: 2, column: 1, amount: 25, maxCapacity: 30 },
        // Add more medications as needed
    ];

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

    // Group medications by row
    const medicationsByRow = medications.reduce((acc, medication) => {
        const rowKey = `row_${medication.row}`;
        if (!acc[rowKey]) {
            acc[rowKey] = [];
        }
        acc[rowKey].push(medication);
        return acc;
    }, {});

    const localizer = momentLocalizer(moment);

    // Dynamically generate calendar events for the current week
    const getStartOfWeek = (date) => {
        const startOfWeek = moment(date).startOf('week');
        return startOfWeek.toDate();
    };

    const getEndOfWeek = (date) => {
        const endOfWeek = moment(date).endOf('week');
        return endOfWeek.toDate();
    };

    const currentWeekStart = getStartOfWeek(new Date());
    const currentWeekEnd = getEndOfWeek(new Date());

    const calendarEvents = [
        {
            title: 'Medication Event',
            start: new Date(2024, 0, 13, 10, 0),
            end: new Date(2024, 0, 13, 20, 0), // Show 10 hours from 10 am to 8 pm
        },
    ];

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
                    {Object.keys(medicationsByRow).map((rowKey, rowIndex) => (
                        <tr key={rowIndex}>
                            <th className="font-weight-bold table-dark">Row {rowIndex + 1}</th>
                            {medicationsByRow[rowKey].map((medication, columnIndex) => (
                                <OverlayTrigger
                                    key={medication.name}
                                    placement="top"
                                    overlay={renderTooltip(medication) || <div></div>}
                                >
                                    <td
                                        key={columnIndex}
                                        className={`text-center ${getBackgroundColor(
                                            medication.amount,
                                            medication.maxCapacity
                                        ) || 'bg-light'}`}
                                    >
                                        {medication.amount} mg
                                    </td>
                                </OverlayTrigger>
                            ))}
                            {/* Add empty cells to fill the row */}
                            {Array.from({ length: 2 - medicationsByRow[rowKey].length }, (_, index) =>
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
                    defaultDate={currentWeekStart} // Set the default date to the start of the current week
                />
            </div>
        </div>
    );
};

export default Medications;
