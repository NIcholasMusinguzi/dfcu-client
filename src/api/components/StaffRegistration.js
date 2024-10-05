import React, { useState } from 'react';
import { registerStaff } from '../api';
import './StaffRegistration.css'; // Add some custom CSS styles

const StaffRegistration = () => {
  const [staff, setStaff] = useState({
    surname: '',
    otherNames: '',
    dob: '',
    idPhoto: '',
    uniqueCode: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle text field changes
  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  // Handle photo upload
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
      setStaff({ ...staff, idPhoto: reader.result }); // Set base64-encoded image
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if ID photo is uploaded
    if (!staff.idPhoto) {
      setMessage('Please upload an ID photo.');
      return;
    }

    setIsLoading(true);
    setMessage(''); // Clear previous messages

    try {
      const response = await registerStaff(staff);
      setMessage(`Staff Registered Successfully! Employee No: ${response.employee_number}`);
    } catch (error) {
      // Check if error response is defined and has a detail field
      const errorMessage = error?.detail || 'An unexpected error occurred. Please try again.';
      setMessage(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container container">
      <h2 className="registration-title">Register Staff</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            type="text"
            name="surname"
            value={staff.surname}
            placeholder="Surname"
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="otherNames">Other Names</label>
          <input
            id="otherNames"
            type="text"
            name="otherNames"
            value={staff.otherNames}
            placeholder="Other Names"
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={staff.dob}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="idPhoto">Upload ID Photo</label>
          <input
            id="idPhoto"
            type="file"
            onChange={handlePhotoChange}
            className="input-field file-input"
            accept="image/*" // Allow only image files
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="uniqueCode">Unique Code</label>
          <input
            id="uniqueCode"
            type="text"
            name="uniqueCode"
            value={staff.uniqueCode}
            placeholder="Unique Code"
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <button className="registration-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && (
        <p className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default StaffRegistration;
