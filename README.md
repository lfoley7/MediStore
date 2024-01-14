#MediStore
MediStore is a web application designed to manage medication-related data, track dosage changes, and provide insights into medication usage. It aims to simplify the process of tracking and analyzing medication data for both users and healthcare professionals.

MTable of Contents
Getting Started
Prerequisites
Installation
Usage
Running the Application
Accessing the Dashboard
Features
Technologies
Contributing
License
Getting Started
Prerequisites

Before running the application, ensure you have the following software installed:

Node.js
npm (Node Package Manager)
MongoDB
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/lfoley7/MediStore.git
Navigate to the project directory:

cd MediStore
Install dependencies:

npm install

#Usage

Running the Application

Start the backend server:

cd backend
node server.js

Start the frontend development server:

cd client
npm start

#Accessing the Dashboard
Once the application is running, you can access the dashboard by visiting http://localhost:3000 in your web browser.

#Features
Medication Dosage Tracking: Users can log changes in medication dosage, and the system maintains a historical record.

Prescription Timeline Chart: Visual representation of medication dosage changes over time using interactive charts.

Medication Frequency Chart: Analyze the frequency of medication access through a dynamic bar chart.

User-friendly Interface: Intuitive and easy-to-navigate interface for efficient medication management.

#Technologies
Frontend: React, Chart.js, Axios
Backend: Node.js, Express, MySql
Database: AWS RDS
Charting Library: Chart.js
Styling: CSS, Bootstrap