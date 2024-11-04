import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Consult() {
  const [consults, setConsults] = useState([]);
  const [selectedConsult, setSelectedConsult] = useState(null);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State variable for success modal
  const [showErrorModal, setShowErrorModal] = useState(false); // State variable for error modal
  const { missionId } = useParams();

  useEffect(() => {
    const fetchConsults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/consult/allConsultants');
        setConsults(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch Consults');
        console.error('Failed to fetch Consults', error);
      }
    };

    fetchConsults();

    return () => {};
  }, []);

  const handleConsultClick = (consultDetails) => {
    setSelectedConsult(consultDetails);
  };

  const handleConfirmConsult = async () => {
    if (selectedConsult) {
      try {
        await axios.put(`http://localhost:8080/mission/${missionId}/${selectedConsult.id}/assignConsult`);
        setShowSuccessModal(true); // Show success modal on successful assignment
      } catch (error) {
        console.error('Failed to confirm consult', error);
        setShowErrorModal(true); // Show error modal on failed assignment
      }
    }
  };

  return (
    <div>
      <h2>Consults</h2>
      {error && <p>{error}</p>}
      <ul>
        {consults.map((consultMap, index) => (
          <li
            key={index}
            onClick={() => handleConsultClick({ id: Object.keys(consultMap)[0], details: Object.values(consultMap)[0] })}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: selectedConsult && selectedConsult.id === Object.keys(consultMap)[0] ? '#e0f0ff' : 'transparent',
            }}
          >
            {Object.values(consultMap)[0]}
          </li>
        ))}
      </ul>

      <button onClick={handleConfirmConsult} disabled = {!selectedConsult}>Confirm Consult</button>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSuccessModal(false)}>&times;</span>
            <p>Successfully assigned the consult to the mission!</p>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowErrorModal(false)}>&times;</span>
            <p>The consult is already assigned to the mission.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Consult;