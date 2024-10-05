import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StaffRegistration from './api/components/StaffRegistration';
import StaffRetrieval from './api/components/StaffRetrieval';
import StaffUpdate from './api/components/StaffUpdate';
import logo from './dfcu_bank_logo.png'; // Update the path to your logo

import './App.css'; // Import CSS for styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <img src={logo} alt="DFCU Logo" className="logo" />
          <h1 className="app-title">DFCU Staff Management</h1>
        </header>
        <nav className="app-nav">
          <ul>
            <li>
              <Link to="/register">Register Staff</Link>
            </li>
            <li>
              <Link to="/retrieve">Retrieve Staff</Link>
            </li>
            <li>
              <Link to="/update">Update Staff</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<StaffRegistration />} />
          <Route path="/retrieve" element={<StaffRetrieval />} />
          <Route path="/update" element={<StaffUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
