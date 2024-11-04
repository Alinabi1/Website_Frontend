import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for the modal

function TimestampManage({ isOpen, onRequestClose, onDelete, onUpdate}) {
  const handleDelete = () => {
    onDelete();
  };

  const handleUpdate = () => {
    onUpdate(); // Pass selectedTimestamp to onUpdate
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Manage Timestamp"
    >
      <h2>Manage Timestamp</h2>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </Modal>
  );
}

export default TimestampManage;
