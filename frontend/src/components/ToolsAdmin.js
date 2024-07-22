import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const ToolsAdmin = () => {
  const token = localStorage.getItem('token');

  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    supplier: '',
    image: '', // Add image field
  });
  const [editingTool, setEditingTool] = useState(null);
  const [updatedTool, setUpdatedTool] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    supplier: '',
    image: '', // Add image field
  });

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tools', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const handleAddTool = async () => {
    try {
      await axios.post('http://localhost:5000/api/tools', newTool, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTools();
      setNewTool({
        name: '',
        description: '',
        category: '',
        price: 0,
        supplier: '',
        image: '', // Reset image field
      });
    } catch (error) {
      console.error('Error adding tool:', error);
    }
  };

  const handleEdit = (tool) => {
    setEditingTool(tool);
    setUpdatedTool(tool);
  };

  const handleCancelEdit = () => {
    setEditingTool(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tools/${updatedTool._id}`, updatedTool, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTools();
      setEditingTool(null);
    } catch (error) {
      console.error('Error updating tool:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = ({ base64 }) => {
    setNewTool((prev) => ({
      ...prev,
      image: base64,
    }));
    setUpdatedTool((prev) => ({
      ...prev,
      image: base64,
    }));
  };

  const handleDeleteTool = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tools/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  return (
    <div className="tools-admin">
      <h2>Tools</h2>

      {/* Add New Tool Form */}
      <h3>Add New Tool</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleAddTool(); }}>
        <input
          type="text"
          name="name"
          value={newTool.name}
          onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newTool.description}
          onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="category"
          value={newTool.category}
          onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="price"
          value={newTool.price}
          onChange={(e) => setNewTool({ ...newTool, price: parseFloat(e.target.value) })}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="supplier"
          value={newTool.supplier}
          onChange={(e) => setNewTool({ ...newTool, supplier: e.target.value })}
          placeholder="Supplier"
          required
        />
        <div>
          <FileBase64
            multiple={false}
            onDone={handleImageUpload}
          />
        </div>
        <button type="submit">Add Tool</button>
      </form>

      {/* Tools List */}
      <h3>Tools</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool._id}>
              {editingTool === tool ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={updatedTool.name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={updatedTool.description}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="category"
                      value={updatedTool.category}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={updatedTool.price}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="supplier"
                      value={updatedTool.supplier}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <FileBase64
                      multiple={false}
                      onDone={({ base64 }) => handleImageUpload({ base64 })}
                    />
                    {updatedTool.image && <img src={updatedTool.image} alt="Tool" style={{ width: '100px' }} />}
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{tool.name}</td>
                  <td>{tool.description}</td>
                  <td>{tool.category}</td>
                  <td>{tool.price}</td>
                  <td>{tool.supplier}</td>
                  <td>
                    {tool.image && <img src={tool.image} alt="Tool" style={{ width: '100px' }} />}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(tool)}>Edit</button>
                    <button onClick={() => handleDeleteTool(tool._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToolsAdmin;
