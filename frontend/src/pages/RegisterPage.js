// pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

import '../styles/Register.css'; // Import the CSS file

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
        role: 'user', // Set the role to 'user' regardless of the user's input
      });

      // Store the token in local storage or session storage
      localStorage.setItem('token', response.data.token);

      // Redirect the user to the login page or the desired page (e.g., the dashboard)
      window.location.href = '/login';
    } catch (error) {
      console.error('Error registering user:', error);
      // Display an error message to the user
      alert('Error registering user');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-header">Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label className="register-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
          />
        </label>
        <label className="register-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
          />
        </label>
        <label className="register-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
          />
        </label>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;