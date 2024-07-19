import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../styles/IndustryNews.css';

const IndustryNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/news', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1 className="news-title">Industry News</h1>
      <ul className="news-list">
        {news.map((article) => (
          <li key={article._id} className="news-item">
            <h3 className="news-item-title">{article.title}</h3>
            <p className="news-item-text">{article.content}</p>
            <p className="news-item-text">Author: {article.author}</p>
            <p className="news-item-text">Source: {article.source}</p>
            <p className="news-item-text">
              Published: {new Date(article.publishedAt).toLocaleString()}
            </p>
            {/* <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-item-link"
            >
              Read More
            </a> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustryNews;
