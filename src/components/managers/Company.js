import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddCompany from './AddCompany'; // Import the modal component

function Company() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false); // State to toggle displaying add modal
  const { managerId } = useParams(); // Get manager ID from URL parameters

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/company/allCompanies');
        setCompanies(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch companies');
        console.error('Failed to fetch companies', error);
      }
    };
    fetchCompanies();
  
    return () => {}; // Cleanup function
  }, []); // Dependency array
  

  const handleAddClick = () => {
    setShowAddModal(true); // Show add modal when "Add Company" is clicked
  };

  const handleAddClose = () => {
    setShowAddModal(false); // Close add modal
  };

  const handleCompanyClick = (companyDetails) => {
    setSelectedCompany(companyDetails);
  };

  const handleDeleteClick = async () => {
    if (selectedCompany) {
      try {
        await axios.delete(`http://localhost:8080/company/${selectedCompany.id}/delete`);
        // Remove the deleted company from the list
        setCompanies(companies.filter(company => company.id !== selectedCompany.id));
        setSelectedCompany(null); // Clear selected company
      } catch (error) {
        console.error('Failed to delete company', error);
        // Handle error
      }
    }
  };
  

  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]); // Add the newly added company to the list
  };

  return (
    <div>
      <h2>Company Management</h2>
      <button onClick={handleDeleteClick} disabled = {!selectedCompany}>Delete Company</button>
      <button onClick={handleAddClick}>Add Company</button>

      {(
        <div>
          <h3>Companies</h3>
          {error && <p>{error}</p>}
          <ul>
            {companies.map((companyMap, index) => (
              <li
                key={index}
                onClick={() => handleCompanyClick({ id: Object.keys(companyMap)[0], details: Object.values(companyMap)[0] })}
                style={{
                  cursor: 'pointer',
                  marginBottom: '10px',
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: selectedCompany && selectedCompany.id === Object.keys(companyMap)[0] ? '#e0f0ff' : 'transparent',
                }}
              >
                {Object.values(companyMap)[0]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showAddModal && (
        <AddCompany managerId={managerId} onClose={handleAddClose} onAdd={handleAddCompany} />
      )}
    </div>
  );
}

export default Company;
