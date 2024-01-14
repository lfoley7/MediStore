import React, { useState, useEffect } from 'react';
import { Table, Dropdown, FormControl, Button } from 'react-bootstrap';
import './Homepage.css';

const PrescriptionDashboard = () => {
    const [selectedMedication, setSelectedMedication] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const medications = ['Dramamine', 'Ibuprofen', 'Acetaminophen']; // Replace with your medication array
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        // Function to append "mg" to amount values
        const formatPrescriptions = () => {
            const formattedPrescriptions = [
                { name: 'Prescription 1', time: new Date('2024-01-14T08:00:00'), amount: '10', prescriber: 'Dr. Smith' },
                { name: 'Prescription 2', time: new Date('2024-01-14T12:30:00'), amount: '20', prescriber: 'Dr. Johnson' },
                { name: 'Prescription 3', time: new Date('2024-01-13T11:45:00'), amount: '15', prescriber: 'Dr. Brown' },
            ].map(prescription => ({
                ...prescription,
                amount: `${prescription.amount}mg`,
            }));
            setPrescriptions(formattedPrescriptions);
        };

        formatPrescriptions();
    }, []);

    const handleMedicationSelect = (medication) => {
        setSelectedMedication(medication);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getTimeColor = (time) => {
        if (!time) {
            return '';
        }

        const now = new Date();
        const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);
        console.log(threeHoursFromNow)

        if (time > threeHoursFromNow) {
            return 'green';
        } else if (time > now) {
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
        <div className="text-center mt-5">
            <Table bordered hover className="m-auto table-hover" style={{ width: '90%' }}>
                <thead className="table-dark">
                    <tr>
                        <th>Prescription Name</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Prescriber</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((prescription, index) => (
                        <tr key={index}>
                            <td>{prescription.name}</td>
                            <td style={{ color: getTimeColor(prescription.time) }}>
                                {prescription.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).replace(' ', '')}
                                {' '}
                                {prescription.time.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
                            </td>
                            <td>{prescription.amount}</td>
                            <td>{prescription.prescriber}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

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
                        {medications.map((medication, index) => (
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
