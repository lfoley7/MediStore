import { React, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import medistoreLogo from './medistore-logo.svg';
import MSNavbar from './msnavbar/MSNavbar';
import Medications from './medications/Medications';
import Analytics from './analytics/Analytics';
import About from './about/About';
import MeetTheTeam from './meettheteam/MeetTheTeam';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <div className="App">
      <MSNavbar />
      <Routes>
        <Route path='/medications' element={<Medications />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/about' element={<About />} />
        <Route path='/meettheteam' element={<MeetTheTeam />} />
      </Routes>
    </div>
  );
}

export default App;
