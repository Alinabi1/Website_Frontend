import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Timestamp() {
  const { consultId, missionId } = useParams();
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTimestamp = async () => {
    try {
      const timestampData = {
        notes,
        startTime,
        endTime,
        date,
        consultId,
        missionId,
      };
      await axios.post('http://localhost:8080/timestamp/register', timestampData);
      // Optionally, you can redirect the user to another page after successful submission
    } catch (error) {
      setErrorMessage('Failed to add timestamp. Please try again.');
      console.error('Failed to add timestamp', error);
    }
  };

  return (
    <div>
      <h2>Add Timestamp</h2>
      <input 
        type="text" 
        placeholder="Notes" 
        value={notes} 
        onChange={(e) => setNotes(e.target.value)} 
      />
      <input 
        type="time" 
        placeholder="Start Time" 
        value={startTime} 
        onChange={(e) => setStartTime(e.target.value)} 
      />
      <input 
        type="time" 
        placeholder="End Time" 
        value={endTime} 
        onChange={(e) => setEndTime(e.target.value)} 
      />
      <input 
        type="date" 
        placeholder="Date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <button onClick={handleAddTimestamp}>Add Timestamp</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Timestamp;
