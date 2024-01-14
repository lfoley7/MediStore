// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MSNavbar from './msnavbar/MSNavbar';
import Homepage from './homepage/Homepage';
import Medications from './medications/Medications';
import Analytics from './analytics/Analytics';
import About from './about/About';
import MeetTheTeam from './meettheteam/MeetTheTeam';
import MSFooter from './msfooter/MSFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div style={{ backgroundColor: 'rgb(190, 195, 200)' }}>
      <div className="App">
        <MSNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<About />} />
          <Route path="/meettheteam" element={<MeetTheTeam />} />
        </Routes>
      </div>
      <MSFooter />
    </div>
  );
}

export default App;
