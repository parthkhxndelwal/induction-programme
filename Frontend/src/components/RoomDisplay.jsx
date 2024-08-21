import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RoomDisplay = () => {
  const { admissionID } = useParams();
  const [roomID, setRoomID] = useState("");
  const [error, setError] = useState("");
  const baseURL = "http://induction-backend.vercel.app";
  useEffect(() => {
    const fetchRoom = async () => {
      console.log(`Trying for the Admission ID : ${admissionID}`);
      console.log(`Trying to run for backend: ${baseURL}`);
      try {
        const response = await fetch(`${baseURL}/students/${admissionID}`);

        if (response.ok) {
          const data = await response.json();

          if (data.room) {
            setRoomID(data.room.roomID);
          } else {
            setError("This student has not been assigned a room yet.");
          }
        } else if (response.status === 404) {
          setError("Student not found. Please check the Admission ID.");
        } else {
          setError("An error occurred while fetching the data.");
        }
      } catch (err) {
        setError("Failed to fetch room data. Please try again later.");
        console.log(err);
      }
    };

    fetchRoom();
  }, [admissionID]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Room Assignment</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>
          Your room is: <strong>{roomID}</strong>
        </p>
      )}
    </div>
  );
};

export default RoomDisplay;
