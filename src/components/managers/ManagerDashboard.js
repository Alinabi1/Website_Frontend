import './ManagerDashboard.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

function ManagerDashboard() {
  const history = useHistory();
  const managerName = localStorage.getItem('managerName');  // Retrieve the manager's name from local storage

  const handleMission = () => {
    history.push('mission');
  };

  const handleCompany = () => {
    history.push('company');
  };

  const handleTimestamps = () => {
    history.push('timestamp');
  };

  return (
    <div className="manager-dashboard">
      <h2>Welcome{managerName}</h2>  
      <button onClick={handleMission}>Mission</button>
      <button onClick={handleCompany}>Company</button>
      <button onClick={handleTimestamps}>Timestamp</button>
    </div>
  );
}

export default ManagerDashboard;
