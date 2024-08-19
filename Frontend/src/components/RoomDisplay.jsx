import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomDisplay = () => {
  const { admissionID } = useParams();
  const [roomID, setRoomID] = useState('');
  const [name, setName] = useState('')
  const [error, setError] = useState('');
  const [baseURL, setBaseURL] = useState('https://krmu-induction.vercel.app')
  useEffect(() => {

    const fetchRoom = async () => {
        console.log(
            `Trying for the Admission ID : ${admissionID}`
        )
      try {
        setBaseURL('') //For Development
        const response = await fetch(`http://localhost:3000/students/${admissionID}`);
        
        if (response.ok) {
          const data = await response.json();

          if (data.room) {
            setRoomID(data.room.roomID);
            setName()
          } else {
            setError('This student has not been assigned a room yet.');
          }
        } else if (response.status === 404) {
          setError('Student not found. Please check the Admission ID.');
        } else {
          setError('An error occurred while fetching the data.');
        }
      } catch (err) {
        setError('Failed to fetch room data. Please try again later.');
        console.log(err)
      }
    };

    fetchRoom();
  }, [admissionID]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Room Assignment</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Your room is: <strong>{roomID}</strong></p>
      )}
    </div>
  );
};

export default RoomDisplay;
