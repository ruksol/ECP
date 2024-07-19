// pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

import '../styles/Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      // Store the token in local storage or session storage
      localStorage.setItem('token', response.data.token);

      // Decode the token to get the user's role
      const decoded = jwtDecode(response.data.token);
      const role = decoded.role;

      // Redirect the user based on their role
      if (role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Display an error message to the user
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
        </label>
        <label className="login-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register" className="register-link-text">Register</Link>
      </p>
    </div>
  );
}

export default Login;