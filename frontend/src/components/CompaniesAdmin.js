import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const CompaniesAdmin = () => {
  const token = localStorage.getItem('token');

  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      region: '',
      country: '',
      postalCode: '',
    },
    website: '',
    category: '',
    image: '', // Add image field
  });
  const [editingCompany, setEditingCompany] = useState(null);
  const [updatedCompany, setUpdatedCompany] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      region: '',
      country: '',
      postalCode: '',
    },
    website: '',
    category: '',
    image: '', // Add image field
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/companies', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleAddCompany = async () => {
    try {
      await axios.post('http://localhost:5000/api/companies', newCompany, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCompanies();
      setNewCompany({
        name: '',
        description: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          region: '',
          country: '',
          postalCode: '',
        },
        website: '',
        category: '',
        image: '', // Reset image field
      });
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setUpdatedCompany(company); // Set initial values for editing
  };

  const handleCancelEdit = () => {
    setEditingCompany(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/companies/${updatedCompany._id}`, updatedCompany, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCompanies();
      setEditingCompany(null); // Exit editing mode
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCompany((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleDeleteCompany = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/companies/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleImageUpload = (file) => {
    setNewCompany({ ...newCompany, image: file.base64 });
  };

  const handleUpdatedImageUpload = (file) => {
    setUpdatedCompany({ ...updatedCompany, image: file.base64 });
  };

  return (
    <div className="companies-admin">
      <h2>Companies</h2>

      {/* Add New Company Form */}
      <h3>Add New Company</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleAddCompany(); }}>
        <input
          type="text"
          name="name"
          value={newCompany.name}
          onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newCompany.description}
          onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
          placeholder="Description"
          required
        />
        <input
          type="email"
          name="email"
          value={newCompany.email}
          onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={newCompany.phone}
          onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
          placeholder="Phone"
          required
        />
        <input
          type="text"
          name="street"
          value={newCompany.address.street}
          onChange={(e) => setNewCompany({ ...newCompany, address: { ...newCompany.address, street: e.target.value } })}
          placeholder="Street"
          required
        />
        <input
          type="text"
          name="city"
          value={newCompany.address.city}
          onChange={(e) => setNewCompany({ ...newCompany, address: { ...newCompany.address, city: e.target.value } })}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="region"
          value={newCompany.address.region}
          onChange={(e) => setNewCompany({ ...newCompany, address: { ...newCompany.address, region: e.target.value } })}
          placeholder="Region"
          required
        />
        <input
          type="text"
          name="country"
          value={newCompany.address.country}
          onChange={(e) => setNewCompany({ ...newCompany, address: { ...newCompany.address, country: e.target.value } })}
          placeholder="Country"
          required
        />
        <input
          type="text"
          name="postalCode"
          value={newCompany.address.postalCode}
          onChange={(e) => setNewCompany({ ...newCompany, address: { ...newCompany.address, postalCode: e.target.value } })}
          placeholder="Postal Code"
          required
        />
        <input
          type="text"
          name="website"
          value={newCompany.website}
          onChange={(e) => setNewCompany({ ...newCompany, website: e.target.value })}
          placeholder="Website"
        />
        <input
          type="text"
          name="category"
          value={newCompany.category}
          onChange={(e) => setNewCompany({ ...newCompany, category: e.target.value })}
          placeholder="Category"
          required
        />
        <FileBase64
          multiple={false}
          onDone={handleImageUpload}
        />
        <button type="submit">Add Company</button>
      </form>

      {/* List of Companies */}
      <h3>Existing Companies</h3>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            {editingCompany === company ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={updatedCompany.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  required
                />
                <input
                  type="text"
                  name="description"
                  value={updatedCompany.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={updatedCompany.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={updatedCompany.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  required
                />
                <input
                  type="text"
                  name="street"
                  value={updatedCompany.address.street}
                  onChange={handleAddressChange}
                  placeholder="Street"
                  required
                />
                <input
                  type="text"
                  name="city"
                  value={updatedCompany.address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  required
                />
                <input
                  type="text"
                  name="region"
                  value={updatedCompany.address.region}
                  onChange={handleAddressChange}
                  placeholder="Region"
                  required
                />
                <input
                  type="text"
                  name="country"
                  value={updatedCompany.address.country}
                  onChange={handleAddressChange}
                  placeholder="Country"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  value={updatedCompany.address.postalCode}
                  onChange={handleAddressChange}
                  placeholder="Postal Code"
                  required
                />
                <input
                  type="text"
                  name="website"
                  value={updatedCompany.website}
                  onChange={handleInputChange}
                  placeholder="Website"
                />
                <input
                  type="text"
                  name="category"
                  value={updatedCompany.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  required
                />
                <FileBase64
                  multiple={false}
                  onDone={handleUpdatedImageUpload}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{company.name}</h3>
                <p>{company.description}</p>
                <p>Email: {company.email}</p>
                <p>Phone: {company.phone}</p>
                <p>
                  Address: {company.address.street}, {company.address.city}, {company.address.region}, {company.address.country}, {company.address.postalCode}
                </p>
                <p>Website: {company.website}</p>
                <p>Category: {company.category}</p>
                {company.image && <img src={company.image} alt={`${company.name}`} style={{ width: '100px', height: '100px' }} />}
                <p>Created: {new Date(company.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(company.updatedAt).toLocaleString()}</p>
                <div>
                  <button onClick={() => handleDeleteCompany(company._id)}>Delete</button>
                  <button onClick={() => handleEdit(company)}>Edit</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompaniesAdmin;
