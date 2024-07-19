import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Tenders.css';

const Tenders = () => {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/tenders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTenders(response.data);
      } catch (error) {
        console.error('Error fetching tenders:', error);
      }
    };
    fetchTenders();
  }, []);

  return (
    <div className="tenders-container">
      <h1 className="tenders-header">Tenders</h1>
      <ul className="tenders-list">
        {tenders.map((tender) => (
          <li key={tender._id} className="tender-item">
            <h3 className="tender-title">{tender.title}</h3>
            <p className="tender-details">{tender.description}</p>
            <p className="tender-details"><strong>Deadline:</strong> {new Date(tender.deadline).toLocaleString()}</p>
            <p className="tender-details"><strong>Category:</strong> {tender.category}</p>
            <p className="tender-details"><strong>Status:</strong> {tender.status}</p>
            <p className="tender-details"><strong>Created:</strong> {new Date(tender.createdAt).toLocaleString()}</p>
            <p className="tender-details"><strong>Updated:</strong> {new Date(tender.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tenders;
