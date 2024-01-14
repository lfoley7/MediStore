import React, { useEffect } from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://iggshnplye.execute-api.us-east-2.amazonaws.com/Initial/'
});

const PrescriptionComponent = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/getPrescriptions');
        // Handle response data
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
    </div>
  );
};

export default PrescriptionComponent;