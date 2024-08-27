import React, { useState } from 'react';
import CourseWiseRooms from './CourseWiseRoom.json';
import logoGroup from '/src/assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RoomMessageProps {
  course: string;
}

const RoomMessage: React.FC<RoomMessageProps> = ({ course }) => {
  const courseData = CourseWiseRooms.data.find(item => item.course === course);

  if (!courseData) {
    return null;
  }

  if (courseData.room.length === 0) {
    return (
      <p>
        You have your documentation scheduled for 27-August. Please report to Library to get your documentation completed.
        Upon completing the document verification you shall depart from the university. (Those who have buses shall wait for the buses till 4 pm)
      </p>
    );
  } else if (courseData.room.length === 1) {
    return (
      <p>
        You are requested to report to Room <strong>{courseData.room[0]}</strong> for tomorrow's Induction program. All the very best!
      </p>
    );
  } else {
    return (
      <div>
        <p>You are requested to report to any of the rooms below for the Induction Programme:</p>
        <ul>
          {courseData.room.map((room, index) => (
            <li key={index}>{room}</li>
          ))}
        </ul>
      </div>
    );
  }
};

const CourseRoomFinder: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
    setShowMessage(false);
  };

  const handleFindRoom = () => {
    if (selectedCourse) {
      setShowMessage(true);
    }
  };

  return (
    <div className="fluid-container d-flex flex-column align-items-center justify-content-center bg-dark text-light" style={{ borderRadius: '40px', padding: '6% 10%', margin: '20px' }}>
      <img
        style={{ width: '100px', marginBottom: '20px' }}
        src={logoGroup}
        alt="University Logo"
        className="d-block mx-auto"
      />
      <h1 className="text-center mb-4">Induction 2024 - SOET</h1>
      <h4 className="text-center mb-4">Course wise Instructions - 27 August</h4>

      <div className="mb-3 col-12 col-md-4 col-lg-5">
        <label htmlFor="courseSelect" className="form-label">Select Your Course</label>
        <select
          id="courseSelect"
          className="form-select bg-dark text-light"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">Select Course</option>
          {CourseWiseRooms.data.map((item, index) => (
            <option key={index} value={item.course}>{item.course}</option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary btn-md d-flex align-items-center" onClick={handleFindRoom} disabled={!selectedCourse}>
        View
      </button>

      {showMessage && (
        <div className="mt-4 col-12 text-center">
          <RoomMessage course={selectedCourse} />
        </div>
      )}
    </div>
  );
};

export default CourseRoomFinder;
