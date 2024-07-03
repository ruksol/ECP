import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IndustryNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/news', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>Industry News</h1>
      <ul>
        {news.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <p>Author: {article.author}</p>
            <p>Source: {article.source}</p>
            <p>Published: {new Date(article.publishedAt).toLocaleString()}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustryNews;