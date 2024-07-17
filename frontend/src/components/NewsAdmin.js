// NewsAdmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsAdmin = () => {
  const token = localStorage.getItem('token');

  const [news, setNews] = useState([]);
  const [newNewsItem, setNewNewsItem] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    publishedAt: '',
  });
  const [editingNews, setEditingNews] = useState(null);
  const [updatedNews, setUpdatedNews] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    publishedAt: '',
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleAddNews = async () => {
    try {
      await axios.post('http://localhost:5000/api/news', newNewsItem, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNews();
      setNewNewsItem({
        title: '',
        content: '',
        category: '',
        author: '',
        publishedAt: '',
      });
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setUpdatedNews(newsItem);
  };

  const handleCancelEdit = () => {
    setEditingNews(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/news/${updatedNews._id}`, updatedNews, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNews();
      setEditingNews(null);
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedNews((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteNews = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  return (
    <div className="news-admin">
      <h2>News</h2>

      {/* Add New News Item Form */}
      <h3>Add New News Item</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleAddNews(); }}>
        <input
          type="text"
          name="title"
          value={newNewsItem.title}
          onChange={(e) => setNewNewsItem({ ...newNewsItem, title: e.target.value })}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={newNewsItem.content}
          onChange={(e) => setNewNewsItem({ ...newNewsItem, content: e.target.value })}
          placeholder="Content"
          required
        />
        <select
          name="category"
          value={newNewsItem.category}
          onChange={(e) => setNewNewsItem({ ...newNewsItem, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Construction">Construction</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Real Estate">Real Estate</option>
        </select>
            
        <input
          type="text"
          name="author"
          value={newNewsItem.author}
          onChange={(e) => setNewNewsItem({ ...newNewsItem, author: e.target.value })}
          placeholder="Author"
          required
        />
        <input
          type="date"
          name="publishedAt"
          value={newNewsItem.publishedAt}
          onChange={(e) => setNewNewsItem({ ...newNewsItem, publishedAt: e.target.value })}
          required
        />
        <button type="submit">Add News</button>
      </form>

      {/* News List */}
      <h3>News List</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Published At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((newsItem) => (
            <tr key={newsItem._id}>
              <td>{newsItem.title}</td>
              <td>{newsItem.category}</td>
              <td>{newsItem.author}</td>
              <td>{new Date(newsItem.publishedAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(newsItem)}>Edit</button>
                <button onClick={() => handleDeleteNews(newsItem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit News Item Modal */}
      {editingNews && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelEdit}>&times;</span>
            <h3>Edit News Item</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <input
                type="text"
                name="title"
                value={updatedNews.title}
                onChange={handleInputChange}
                placeholder="Title"
                required
              />
              <textarea
                name="content"
                value={updatedNews.content}
                onChange={handleInputChange}
                placeholder="Content"
                required
              />
              <select
                name="category"
                value={updatedNews.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Construction">Construction</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Real Estate">Real Estate</option>
              </select>
              <input
                type="text"
                name="author"
                value={updatedNews.author}
                onChange={handleInputChange}
                placeholder="Author"
                required
              />
              <input
                type="date"
                name="publishedAt"
                value={updatedNews.publishedAt}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAdmin;