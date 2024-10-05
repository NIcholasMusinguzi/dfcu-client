import React, { useState } from 'react';
import { updateStaff } from '../api';
import './StaffUpdate.css';

const StaffUpdate = () => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [dob, setDob] = useState('');
  const [idPhoto, setIdPhoto] = useState(null); // Set to null instead of base64 initially
  const [message, setMessage] = useState('');

  // Handles photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Ensure it's an image file
    if (!file.type.startsWith('image/')) {
      setMessage('Please upload a valid image file.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setIdPhoto(reader.result);  // Converting to base64
    };
    
    reader.readAsDataURL(file); // Convert file to base64 string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if ID photo is uploaded
    if (!idPhoto) {
      setMessage('Please upload an ID photo.');
      return;
    }

    const updateData = { dob, idPhoto };

    try {
      const response = await updateStaff(employeeNumber, updateData);
      setMessage('Staff Updated Successfully!');
    } catch (error) {
      setMessage(`Error: ${error.detail}`);
    }
  };

  return (
    <div className="update-container">
      <h2 className="update-title">Update Staff</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Number</label>
          <input
            type="text"
            value={employeeNumber}
            placeholder="Enter Employee Number"
            onChange={(e) => setEmployeeNumber(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label>Upload ID Photo</label>
          <input
            type="file"
            onChange={handlePhotoChange}
            className="input-field"
            accept="image/*"  // Accept only image files
          />
        </div>
        <button className="update-button" type="submit">Update</button>
      </form>
      <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>
    </div>
  );
};

export default StaffUpdate;
