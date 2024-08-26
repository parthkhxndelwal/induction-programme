import React, { useState, useEffect, useCallback } from 'react';
import { SignOutButton, UserButton } from "@clerk/clerk-react";

import data from './data.json';
import logoGroup from '/src/assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';

interface Student {
  name: string;
  studentID: string;
  programme: string;
  room: string;
}

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-danger m-2 w-30 text-center" role="alert">
    {message}
  </div>
);

const Loader: React.FC = () => (
  <div className="d-flex justify-content-center align-items-center bg-dark text-light " style={{ height: '100vh' }}>
    <div className="spinner-grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const RoomFinder: React.FC = () => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [studentID, setStudentID] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [inputLabel, setInputLabel] = useState<string>('Enter Your Name or KRMU Application ID');
  const [promptForID, setPromptForID] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      const uniqueCourses = [...new Set((data as { Data: Student[] }).Data.map(student => student.programme))];
      setCourses(uniqueCourses);
      setLoading(false);
    }, 2500);
  }, []);

  const isApplicationID = useCallback((value: string): boolean => /^KRMU\d{7}$/.test(value), []);

  const findStudent = useCallback((): Student[] => {
    if (!selectedCourse || !input) {
      setError('Please select a course and enter your name or KRMU Application ID.');
      return [];
    }

    if (isApplicationID(input)) {
      return (data as { Data: Student[] }).Data.filter(
        student => student.programme === selectedCourse && student.studentID === input
      );
    } else {
      return (data as { Data: Student[] }).Data.filter(
        student => student.programme === selectedCourse && student.name.toLowerCase() === input.toLowerCase()
      );
    }
  }, [selectedCourse, input, isApplicationID]);

  const handleSearch = () => {
    setError('');
    setRoom('');
    setPromptForID(false);
    setButtonLoading(true);

    setTimeout(() => {
      const filteredStudents = findStudent();

      if (filteredStudents.length === 0) {
        setError('No student found with the provided details.');
      } else if (filteredStudents.length === 1) {
        setRoom(filteredStudents[0].room);
        setShowForm(false);
      } else {
        setInput('');
        setInputLabel('Enter KRMU Application ID to Continue');
        setPromptForID(true);
        setError('Multiple students found with the same name. Please enter your KRMU Application ID.');
      }

      setButtonLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setShowForm(true);
    setSelectedCourse('');
    setInput('');
    setStudentID('');
    setRoom('');
    setError('');
    setPromptForID(false);
    setInputLabel('Enter Your Name or KRMU Application ID');
  };

  if (loading) return <Loader />;

  return (
    <>
    <div className='col-12 d-flex flex-row justify-content-end'>
        <UserButton/>
        <SignOutButton>
          <button className='btn btn-secondary m-2'>Sign Out</button>
        </SignOutButton>
    </div> 
    <div className="fluid-container d-flex flex-column align-items-center justify-content-center bg-dark text-light " style={{borderRadius:'40px', padding:'6% 10%', margin: '20px'}}>
      <img
        style={{ width: '100px', marginBottom: '20px' }}
        src={logoGroup}
        alt=""
        className="d-block mx-auto"
      />
      <h1 className="text-center mb-4">Induction 2024 - SOET</h1>
      <h4 className="text-center">Find Your Allocated Room</h4>


      {showForm && (
        <>
          <div className="mb-3 col-12 col-md-4 col-lg-5">
            <label htmlFor="courseSelect" className="form-label">Select Your Course</label>
            <select
              id="courseSelect"
              className="form-select bg-dark text-light"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>{course}</option>
              ))}
            </select>
          </div>

          {!promptForID && (
            <div className="mb-3 col-12 col-md-4 col-lg-5">
              <label htmlFor="inputField" className="form-label">{inputLabel}</label>
              <input
                type="text"
                id="inputField"
                className="form-control bg-dark text-light border-secondary"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          )}

          {promptForID && (
            <div className="mb-4 col-12 col-md-4 col-lg-5">
              <label htmlFor="idInput" className="form-label">Enter Your KRMU Application ID</label>
              <input
                type="text"
                id="idInput"
                className="form-control bg-dark text-light border-secondary"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
              />
            </div>
          )}

          <button className="btn btn-primary btn-md d-flex align-items-center" onClick={handleSearch} disabled={buttonLoading}>
            Find Room
            {buttonLoading && (
              <div className='ms-2'>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </div>
            )}
          </button>
        </>
      )}

      {error && <ErrorMessage message={error} />}
      
      {room && (
        <div className="mt-4 col-12 text-center">
          <h3>Your Allotted Room: <strong>{room}</strong></h3>
          <p>Instructions:</p>
          Upon arriving at the College, you're requested to locate <strong>{room[0]} Block</strong>.
          Proceed to the <strong>{room[1]}{room[1] === '1' ? 'st' : room[1] === '2' ? 'nd' : room[1] === '3' ? 'rd' : 'th'} floor</strong>.
          Find <strong>Room Number {room}</strong> on that floor. <br />
          An Escort Team will be there to help you out in case you are unable to find the room. All the best!
          <br />
          <button className="btn btn-link mt-3" onClick={handleReset}>Search Another</button>
        </div>
      )}
    </div>
    </>
  );
};

export default RoomFinder;
