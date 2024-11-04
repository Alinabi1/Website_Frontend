import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import Modal
import TimestampUpdate from './TimestampUpdate';

// Set the app element for React Modal
Modal.setAppElement('#root');

function Timestamp() {
  const [timestamps, setTimestamps] = useState([]);
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);
  const [error, setError] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Define state variables for notes, startTime, endTime, and date
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchTimestamps = async () => {
      try {
        const response = await axios.get('http://localhost:8080/timestamp/allTimestamps');
        setTimestamps(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch timestamps');
        console.error('Failed to fetch timestamps', error);
      }
    };

    fetchTimestamps();

    return () => {};
  }, []);

  const handleTimestampClick = (timestamp) => {
    setSelectedTimestamp(timestamp);
  };

  const handleDeleteTimestamp = async () => {
    if (selectedTimestamp) {
      try {
        await axios.delete(`http://localhost:8080/timestamp/${selectedTimestamp.id}/delete`);
        const response = await axios.get('http://localhost:8080/timestamp/allTimestamps');
        setTimestamps(response.data);
        setSelectedTimestamp(null);
      } catch (error) {
        console.error('Failed to delete timestamp', error);
      }
    }
  };

  // const handleUpdateTimestamp = () => {
  //   setIsUpdateModalOpen(true);
  // };

  const handleUpdate = async () => {
    try {
        // Ensure all variables are initialized before using them
        const updatedData = {
            notes: notes,
            startTime: startTime,
            endTime: endTime,
            date: date
        };

        // Extract individual properties from updatedData
        const { notes: updatedNotes, startTime: updatedStartTime, endTime: updatedEndTime, date: updatedDate } = updatedData;

        // Send updatedData as query parameters
        await axios.put(
            `http://localhost:8080/timestamp/${selectedTimestamp.id}/update`,
            {
                notes: updatedNotes,
                startTime: updatedStartTime,
                endTime: updatedEndTime,
                date: updatedDate
            }
        );

        // Update timestamps after successful update
        const response = await axios.get('http://localhost:8080/timestamp/allTimestamps');
        setTimestamps(response.data);
        setSelectedTimestamp(null);
        setIsUpdateModalOpen(false);
    } catch (error) {
        console.error('Failed to update timestamp', error);
    }
};

  
  

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div>
      <h2>Timestamps</h2>
      <div>
        <button onClick={handleDeleteTimestamp} disabled={!selectedTimestamp}>Delete Timestamp</button>
        {/* <button onClick={handleUpdateTimestamp} disabled={!selectedTimestamp}>Update Timestamp</button> */}
      </div>
      {error && <p>{error}</p>}
      <ul>
        {timestamps.map((timestampMap, index) => (
          <li
            key={index}
            onClick={() => handleTimestampClick({ id: Object.keys(timestampMap)[0], details: Object.values(timestampMap)[0] })}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: selectedTimestamp && selectedTimestamp.id === Object.keys(timestampMap)[0] ? '#e0f0ff' : 'transparent',
            }}
          >
            {Object.values(timestampMap)[0]}
          </li>
        ))}
      </ul>
      <TimestampUpdate
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onUpdate={handleUpdate}
        timestamp={selectedTimestamp}
        // Pass state variables and setters as props to TimestampUpdate
        notes={notes}
        setNotes={setNotes}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        date={date}
        setDate={setDate}
      />
    </div>
  );
}

export default Timestamp;
