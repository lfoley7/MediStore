import React, { useState, useEffect } from 'react';
import { Table, Dropdown, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import './Homepage.css';

const PrescriptionDashboard = () => {
    const [selectedMedication, setSelectedMedication] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [medications, setMedications] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/getPrescriptions');
                const uniqueMedications = Array.from(new Set(response.data.map(prescription => prescription.prescription_name)));
                setMedications(uniqueMedications);
                setPrescriptions(formatPrescriptions(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatPrescriptions = (data) => {
        return data.map((prescription) => {
            const formattedTimeAndDate = formatTimeAndDate(prescription.time_of_day, prescription.days_of_week);
            return {
                ...prescription,
                time_and_date: formattedTimeAndDate,
            };
        });
    };

    const formatTimeAndDate = (time, dayOfWeek) => {
        const nextDate = getNextDate(dayOfWeek);
        const formattedTime = formatTime(time);
        const formattedDate = formatDate(nextDate);
        return `${formattedTime} ${formattedDate}`;
    };

    const stringDayToVal = (day) => {
        switch (day) {
            case "Sunday":
                return 0;
            case "Monday":
                return 1;
            case "Tuesday":
                return 2;
            case "Wednesday":
                return 3;
            case "Thursday":
                return 4;
            case "Friday":
                return 5;
            case "Saturday":
                return 6;
        }
    }

    const getNextDate = (dayOfWeek) => {
        const today = new Date();
        const daysUntilNext = (stringDayToVal(dayOfWeek) - today.getDay() + 7) % 7;
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + daysUntilNext);
        return nextDate;
    };

    const formatTime = (time) => {
        const formattedTime = new Date(`2000-01-01T${time}`);
        return formattedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '');
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    };

    const handleMedicationSelect = (medication) => {
        setSelectedMedication(medication);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMedications = medications.filter(medication =>
        medication.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTimeColor = (timeC) => {
        if (!timeC) {
            return '';
        }

        const [time, date] = timeC.split(" ");
        const [hours, minutes] = time.slice(0, -2).split(":").map(Number);
        const meridian = time.slice(-2);
        const [month, day] = date.split("/").map(Number);
        const utcDate = new Date();
        utcDate.setUTCHours(meridian === "PM" ? hours + 12 : hours, minutes);
        utcDate.setUTCMonth(month - 1, day);

        const now = new Date();
        const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);

        if (utcDate > threeHoursFromNow) {
            return 'green';
        } else if (utcDate > now) {
            return 'rgb(255,200,0)';
        } else {
            return 'red';
        }
    };

    const handleSubmit = () => {
        if (selectedMedication) {
            window.alert(`Selected Medication: ${selectedMedication}`);
        } else {
            window.alert('Please select a medication first.');
        }
    };

    return (
        <div>
            <h2 className="mt-5" style={{ color: 'rgb(43,48,53)', marginBottom: '1rem', position: 'relative', left: '10%' }}>Upcoming Medications</h2>
            <div className="text-center">
                <Table bordered hover className="m-auto table-hover" style={{ width: '90%' }}>
                    <thead className="table-dark">
                        <tr>
                            <th>Prescription Name</th>
                            <th>Time and Date</th>
                            <th>Amount</th>
                            <th>Prescriber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.map((prescription, index) => (
                            <tr key={index}>
                                <td>{prescription.prescription_name}</td>
                                <td style={{ color: getTimeColor(prescription.time_and_date) }}>
                                    {prescription.time_and_date}
                                </td>
                                <td>{`${prescription.amount_mg}mg`}</td>
                                <td>{prescription.prescribing_doctor}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <h2 style={{ color: 'rgb(43,48,53)', marginTop: '2rem', position: 'relative', left: '10%' }}>Medication Selection</h2>
            <div className="d-flex justify-content-center mt-4">
                <label className="mr-2" style={{ color: 'rgb(43,48,53)', marginRight: '1rem', marginTop: '.4rem' }}>Select Medication:</label>

                <Dropdown style={{ marginRight: '1rem' }}>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        {selectedMedication || medications[0]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <FormControl
                            autoFocus
                            placeholder="Search Medication"
                            onChange={handleSearchChange}
                        />
                        <Dropdown.Divider />
                        {filteredMedications.map((medication, index) => (
                            <Dropdown.Item key={index} onClick={() => handleMedicationSelect(medication)}>
                                {medication}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                <Button variant="secondary" onClick={handleSubmit} className="ml-2">
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default PrescriptionDashboard;
