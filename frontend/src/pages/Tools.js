import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Tools.css';

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
    <div className="tools-container">
      <h1 className="tools-heading">Tools</h1>
      <ul className="tools-list">
        {tools.map((tool) => (
          <li key={tool._id} className="tools-item">
            <h3 className="tool-name">{tool.name}</h3>
            <p className="tool-info">{tool.description}</p>
            <p className="tool-info">Category: {tool.category}</p>
            <p className="tool-info">Price: {tool.price}</p>
            <p className="tool-info">Link: <a href={tool.link} className="tool-link" target="_blank" rel="noopener noreferrer">{tool.link}</a></p>
            <p className="tool-info">Created: {new Date(tool.createdAt).toLocaleString()}</p>
            <p className="tool-info">Updated: {new Date(tool.updatedAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tools;
