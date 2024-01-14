const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3001;

app.use(cors());

// MySQL database connection setup
const pool = mysql.createPool({
    host: 'aws-medistore.cd600eei0ej7.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Kodiak123!',
    database: 'MedistoreDB',
});

// API endpoint to get prescriptions
app.get('/api/getPrescriptions', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute('SELECT * FROM Prescription');
        connection.release();
        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getMedications', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute('SELECT * FROM MedicationTable');
        connection.release();
        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getAccuracy', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute('SELECT * FROM Accuracy');
        connection.release();
        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getAccuracyByDay', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute('SELECT * FROM MedicationAccuracy');
        connection.release();
        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getPrescriptionChanges', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute('SELECT * FROM MedicationDosageLog');
        connection.release();
        console.log(res.json(results))
        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getFrequency', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute('SELECT * FROM MedicationTaken');
        connection.release();
        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

