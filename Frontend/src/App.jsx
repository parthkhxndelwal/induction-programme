import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdmissionForm from './components/AdmissionForm';
import RoomDisplay from './components/RoomDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdmissionForm />} />
        <Route path="/room/:admissionID" element={<RoomDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
