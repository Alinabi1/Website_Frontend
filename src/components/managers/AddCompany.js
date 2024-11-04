import React, { useState } from 'react';
import axios from 'axios';

function AddCompany({ managerId, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleAddCompany = async () => {
    try {
      const response = await axios.post('http://localhost:8080/company/register', {
        name,
        location,
        manager: { id: managerId }
      });
      onAdd(response.data); // Pass the newly added company data back to the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error('Failed to add company', error);
      // Handle error
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Company</h2>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <button onClick={handleAddCompany}>Add Company</button>
      </div>
    </div>
  );
}

export default AddCompany;
