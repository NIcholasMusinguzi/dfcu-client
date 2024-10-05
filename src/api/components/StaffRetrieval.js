import React, { useState } from 'react';
import { retrieveStaff } from '../api';
import './StaffRetrieval.css'; // Import CSS for styling

const StaffRetrieval = () => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [staffData, setStaffData] = useState(null);
  const [message, setMessage] = useState('');

  const handleRetrieve = async () => {
    try {
      const response = await retrieveStaff(employeeNumber);
      setStaffData(response);
      setMessage('');
    } catch (error) {
      setMessage(`Error: ${error.detail}`);
      setStaffData(null);
    }
  };

  return (
    <div className="retrieval-container">
      <h2 className="retrieval-title">Retrieve Staff</h2>
      <div className="retrieval-form">
        <input
          type="text"
          value={employeeNumber}
          placeholder="Enter Employee Number"
          onChange={(e) => setEmployeeNumber(e.target.value)}
          className="input-field"
        />
        <button onClick={handleRetrieve} className="retrieve-button">Retrieve</button>
      </div>
      {staffData && (
        <div className="staff-details">
          <h3>Staff Details:</h3>
          <p><strong>Surname:</strong> {staffData.surname}</p>
          <p><strong>Other Names:</strong> {staffData.otherNames}</p>
          <p><strong>Date of Birth:</strong> {staffData.dob}</p>
          {/* Add more fields as needed */}
        </div>
      )}
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default StaffRetrieval;
