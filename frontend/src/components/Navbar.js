// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');
  let isAdmin = false;

  if (isLoggedIn) {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    isAdmin = decoded.role === 'admin';
  }

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {!isAdmin && (
          <li className="navbar-item">
            <Link to="/" className="navbar-link">ECP</Link>
          </li>
        )}
      </ul>
      <ul className="navbar-list">
        {!isAdmin && (
          <>
            <li className="navbar-item">
              <Link to="/companies" className="navbar-link">Companies</Link>
            </li>
            <li className="navbar-item">
              <Link to="/news" className="navbar-link">Industry News</Link>
            </li>
            <li className="navbar-item">
              <Link to="/tenders" className="navbar-link">Tenders</Link>
            </li>
            <li className="navbar-item">
              <Link to="/tools" className="navbar-link">Tools</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="navbar-list">
        {!isLoggedIn && (
          <>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            {/* <li className="navbar-item">
              <Link to="/register" className="navbar-link">Register</Link>
            </li> */}
          </>
        )}
        {isLoggedIn && (
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;