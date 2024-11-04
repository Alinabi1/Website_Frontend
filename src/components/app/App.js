import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from '../../assets/images/Ekonomentesolutions-removebg-preview___serialized1.png'; // Ensure correct logo path
import './App.css';
import Home from '../home/Home';
import ConsultLogin from '../consults/ConsultLogin';
import ManagerLogin from '../managers/ManagerLogin';
import ManagerDashboard from '../managers/ManagerDashboard'; 
import ManagerMissions from '../managers/Mission';
import Consults from '../managers/Consult';
import Companies from '../managers/Company';
import ManagerTimestamps from '../managers/Timestamp';
import ConsultMissions from '../consults/Mission';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <img src={logo} alt="Logo" className="logo" />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/consult">Consultant</Link></li>
            <li><Link to="/manager">Manager</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/consult" component={ConsultLogin} />
          <Route exact path="/manager" component={ManagerLogin} />
          <Route path="/manager/:managerId/dashboard" component={ManagerDashboard} />
          <Route path="/manager/:managerId/mission" component={ManagerMissions} />
          <Route path="/manager/:managerId/company" component={Companies} />
          <Route path="/mission/:missionId/consult" component={Consults} />
          <Route path="/manager/:managerId/timestamp" component={ManagerTimestamps} />
          <Route path="/consult/:consultId/mission" component={ConsultMissions} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
