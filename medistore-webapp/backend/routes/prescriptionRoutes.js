const express = require('express');
const router = express.Router();

// Import your database connection or any utility functions needed
const { pool } = require('./db'); // Adjust the path based on your project structure

// Route to get all prescriptions
router.get('api/getPrescriptions', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM prescriptions');
    const prescriptions = result.rows;
    client.release();

    res.json({ success: true, prescriptions });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Other prescription-related routes can be added here

module.exports = router;