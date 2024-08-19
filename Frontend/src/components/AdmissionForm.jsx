import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdmissionForm = () => {
  const [admissionID, setAdmissionID] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (admissionID) {
      navigate(`/room/${admissionID}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Enter Admission ID</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={admissionID}
          onChange={(e) => setAdmissionID(e.target.value)}
          placeholder="Enter your Admission ID"
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px 20px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
