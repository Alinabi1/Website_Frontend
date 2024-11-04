import React, { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimestampUpdate = ({ isOpen, onClose, onUpdate, timestamp }) => {
  const [notes, setNotes] = useState(timestamp?.notes || '');
  const [startTime, setStartTime] = useState(timestamp?.startTime || new Date());
  const [endTime, setEndTime] = useState(timestamp?.endTime || new Date());
  const [date, setDate] = useState(timestamp?.date || new Date());

  // Ensure timestamp is not null before initializing state variables
  useEffect(() => {
    if (timestamp) {
      setNotes(timestamp.notes || '');
      setStartTime(timestamp.startTime || new Date());
      setEndTime(timestamp.endTime || new Date());
      setDate(timestamp.date || new Date());
    }
  }, [timestamp]);

  const handleUpdate = () => {
    onUpdate({ notes, startTime, endTime, date });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Update Timestamp</h2>
      <label>
        Notes:
        <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <label>
        Start Time:
        <DatePicker selected={startTime} onChange={setStartTime} showTimeSelect showTimeSelectOnly timeIntervals={15} dateFormat="h:mm aa" />
      </label>
      <label>
        End Time:
        <DatePicker selected={endTime} onChange={setEndTime} showTimeSelect showTimeSelectOnly timeIntervals={15} dateFormat="h:mm aa" />
      </label>
      <label>
        Date:
        <DatePicker selected={date} onChange={setDate} />
      </label>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </Modal>
  );
};

export default TimestampUpdate;
