import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Tenders</h1>
      <ul>
        {tenders.map((tender) => (
          <li key={tender._id}>
            <h3>{tender.title}</h3>
            <p>{tender.description}</p>
            <p>Deadline: {new Date(tender.deadline).toLocaleString()}</p>
            <p>Category: {tender.category}</p>
            <p>Status: {tender.status}</p>
            <p>Created: {new Date(tender.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(tender.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tenders;