import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tools = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/tools', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTools(response.data);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };
    fetchTools();
  }, []);

  return (
    <div>
      <h1>Tools</h1>
      <ul>
        {tools.map((tool) => (
          <li key={tool._id}>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <p>Category: {tool.category}</p>
            <p>Price: {tool.price}</p>
            <p>Link: <a href={tool.link} target="_blank" rel="noopener noreferrer">{tool.link}</a></p>
            <p>Created: {new Date(tool.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(tool.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tools;