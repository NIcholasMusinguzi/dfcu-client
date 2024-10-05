import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/hr'; // Your Django server API base URL

// Staff Registration
// api.js
export const registerStaff = async (staffData) => {
  const response = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN_HERE', // Replace with actual token logic
    },
    body: JSON.stringify(staffData),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.detail || 'Failed to register staff.');
  }

  return response.json();
};


// Staff Retrieval
export const retrieveStaff = async (employeeNumber = null) => {
  try {
    const url = employeeNumber ? `${BASE_URL}/retrieve/${employeeNumber}/` : `${BASE_URL}/retrieve/`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Staff Update
export const updateStaff = async (employeeNumber, updateData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update/${employeeNumber}/`, updateData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};