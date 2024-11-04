import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './ConsultLogin.css';

function ConsultLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:8080/consult/login', { email, password });
        
        console.log('Login successful', response.data);
        
        const consultId = response.data.consultId; // Correctly extract consultId from response data
        
        // Redirect to the missions page upon successful login
        history.push(`/consult/${consultId}/mission`);
        
    } catch (error) {
        setErrorMessage('Invalid email or password. Please try again.');
        console.error('Login failed', error);
    }
};

  return (
    <div className="consult-login-container">
      <h2>Consultant Login</h2>
      <input 
        type="text" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ConsultLogin;
