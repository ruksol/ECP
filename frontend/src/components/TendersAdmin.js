import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const TendersAdmin = () => {
  const token = localStorage.getItem('token');

  const [tenders, setTenders] = useState([]);
  const [newTender, setNewTender] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    budget: '',
    status: 'Open',
    createdBy: '',
    image: '', // Add image field
  });
  const [editingTender, setEditingTender] = useState(null);
  const [updatedTender, setUpdatedTender] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    budget: '',
    status: '',
    createdBy: '',
    image: '', // Add image field
  });

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tenders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTenders(response.data);
    } catch (error) {
      console.error('Error fetching tenders:', error);
    }
  };

  const handleAddTender = async () => {
    try {
      await axios.post('http://localhost:5000/api/tenders', newTender, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTenders();
      setNewTender({
        title: '',
        description: '',
        category: '',
        deadline: '',
        budget: '',
        status: 'Open',
        createdBy: '',
        image: '', // Reset image field
      });
    } catch (error) {
      console.error('Error adding tender:', error);
    }
  };

  const handleEdit = (tender) => {
    setEditingTender(tender);
    setUpdatedTender(tender);
  };

  const handleCancelEdit = () => {
    setEditingTender(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tenders/${updatedTender._id}`, updatedTender, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTenders();
      setEditingTender(null);
    } catch (error) {
      console.error('Error updating tender:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTender((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteTender = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tenders/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTenders();
    } catch (error) {
      console.error('Error deleting tender:', error);
    }
  };

  const handleNewImageUpload = (file) => {
    setNewTender({ ...newTender, image: file.base64 });
  };

  const handleEditImageUpload = (file) => {
    setUpdatedTender({ ...updatedTender, image: file.base64 });
  };

  return (
    <div className="tenders-admin">
      <h2>Tenders</h2>

      {/* Add New Tender Form */}
      <h3>Add New Tender</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleAddTender(); }}>
        <input
          type="text"
          name="title"
          value={newTender.title}
          onChange={(e) => setNewTender({ ...newTender, title: e.target.value })}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={newTender.description}
          onChange={(e) => setNewTender({ ...newTender, description: e.target.value })}
          placeholder="Description"
          required
        ></textarea>
        <input
          type="text"
          name="category"
          value={newTender.category}
          onChange={(e) => setNewTender({ ...newTender, category: e.target.value })}
          placeholder="Category"
          required
        />
        <input
          type="date"
          name="deadline"
          value={newTender.deadline}
          onChange={(e) => setNewTender({ ...newTender, deadline: e.target.value })}
          placeholder="Deadline"
          required
        />
        <input
          type="number"
          name="budget"
          value={newTender.budget}
          onChange={(e) => setNewTender({ ...newTender, budget: e.target.value })}
          placeholder="Budget"
          required
        />
        <select
          name="status"
          value={newTender.status}
          onChange={(e) => setNewTender({ ...newTender, status: e.target.value })}
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Awarded">Awarded</option>
        </select>
        <input 
          name="createdBy"
          value={newTender.createdBy}
          onChange={(e) => setNewTender({ ...newTender, createdBy: e.target.value })}
          placeholder="Created By"
          required
        />
        <FileBase64
          multiple={false}
          onDone={handleNewImageUpload} // Handle image upload
        />
        <button type="submit">Add Tender</button>
      </form>

      {/* Tender List */}
      <h3>Tenders</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Deadline</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender._id}>
              <td>{tender.title}</td>
              <td>{tender.category}</td>
              <td>{new Date(tender.deadline).toLocaleString()}</td>
              <td>{tender.budget}</td>
              <td>{tender.status}</td>
              <td>{tender.createdBy}</td>
              <td>{tender.image && <img src={tender.image} alt={`${tender.name}`} style={{ width: '100px', height: '100px' }} />}</td>
              <td>
                <button onClick={() => handleEdit(tender)}>Edit</button>
                <button onClick={() => handleDeleteTender(tender._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Tender Form */}
      {editingTender && (
        <div className="edit-tender">
          <h3>Edit Tender</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <input
              type="text"
              name="title"
              value={updatedTender.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <textarea
              name="description"
              value={updatedTender.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
            ></textarea>
            <input
              type="text"
              name="category"
              value={updatedTender.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
            />
            <input
              type="date"
              name="deadline"
              value={updatedTender.deadline}
              onChange={handleInputChange}
              placeholder="Deadline"
              required
            />
            <input
              type="number"
              name="budget"
              value={updatedTender.budget}
              onChange={handleInputChange}
              placeholder="Budget"
              required
            />
            <select
              name="status"
              value={updatedTender.status}
              onChange={handleInputChange}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Awarded">Awarded</option>
            </select>
            <input 
              name="createdBy"
              value={updatedTender.createdBy}
              onChange={handleInputChange}
              placeholder="Created By"
              required
            />
            <FileBase64
              multiple={false}
              onDone={handleEditImageUpload} // Handle image upload
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TendersAdmin;
