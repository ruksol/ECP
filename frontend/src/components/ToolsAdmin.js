// // ToolsAdmin.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ToolsAdmin = () => {
//   const token = localStorage.getItem('token');

//   const [tools, setTools] = useState([]);
//   const [newTool, setNewTool] = useState({
//     name: '',
//     description: '',
//     category: '',
//     price: 0,
//     supplier: '',
//   });
//   const [editingTool, setEditingTool] = useState(null); // Outil en cours d'édition
//   const [updatedTool, setUpdatedTool] = useState({
//     name: '',
//     description: '',
//     category: '',
//     price: 0,
//     supplier: '',
//   });

//   useEffect(() => {
//     fetchTools();
//   }, []);

//   const fetchTools = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/tools', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       setTools(response.data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des outils :', error);
//     }
//   };

//   const handleAddTool = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/tools', newTool, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       fetchTools();
//       setNewTool({
//         name: '',
//         description: '',
//         category: '',
//         price: 0,
//         supplier: '',
//       });
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout d\'un outil :', error);
//     }
//   };

//   const handleEdit = (tool) => {
//     setEditingTool(tool);
//     setUpdatedTool(tool); // Définir les valeurs initiales pour l'édition
//   };

//   const handleCancelEdit = () => {
//     setEditingTool(null);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/tools/${updatedTool._id}`, updatedTool, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       fetchTools();
//       setEditingTool(null); // Quitter le mode d'édition
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour de l\'outil :', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedTool((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDeleteTool = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tools/${id}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       fetchTools();
//     } catch (error) {
//       console.error('Erreur lors de la suppression de l\'outil :', error);
//     }
//   };

//   return (
//     <div className="tools-admin">
//       <h2>Outils</h2>

//       {/* Formulaire d'ajout d'un nouvel outil */}
//       <h3>Ajouter un nouvel outil</h3>
//       <form onSubmit={(e) => { e.preventDefault(); handleAddTool(); }}>
//         <input
//           type="text"
//           name="name"
//           value={newTool.name}
//           onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
//           placeholder="Nom"
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           value={newTool.description}
//           onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
//           placeholder="Description"
//           required
//         />
//         <select
//           name="category"
//           value={newTool.category}
//           onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
//           required
//         >
//           <option value="">Sélectionner une catégorie</option>
//           <option value="Equipment">Équipement</option>
//           <option value="Software">Logiciel</option>
//           <option value="Material">Matériel</option>
//         </select>
//         <input
//           type="number"
//           name="price"
//           value={newTool.price}
//           onChange={(e) => setNewTool({ ...newTool, price: parseFloat(e.target.value) })}
//           placeholder="Prix"
//           required
//         />
//         <input
//           type="text"
//           name="supplier"
//           value={newTool.supplier}
//           onChange={(e) => setNewTool({ ...newTool, supplier: e.target.value })}
//           placeholder="Fournisseur"
//           required
//         />
//         <button type="submit">Ajouter</button>
//       </form>

//       {/* Liste des outils */}
//       <h3>Liste des outils</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Description</th>
//             <th>Catégorie</th>
//             <th>Prix</th>
//             <th>Fournisseur</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tools.map((tool) => (
//             <tr key={tool._id}>
//               <td>{tool.name}</td>
//               <td>{tool.description}</td>
//               <td>{tool.category}</td>
//               <td>{tool.price}</td>
//               <td>{tool.supplier}</td>
//               <td>
//                 <button onClick={() => handleEdit(tool)}>Éditer</button>
//                 <button onClick={() => handleDeleteTool(tool._id)}>Supprimer</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Formulaire d'édition d'un outil */}
//       {editingTool && (
//         <div>
//           <h3>Éditer l'outil</h3>
//           <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
//             <input
//               type="text"
//               name="name"
//               value={updatedTool.name}
//               onChange={handleInputChange}
//               placeholder="Nom"
//               required
//             />
//             <input
//               type="text"
//               name="description"
//               value={updatedTool.description}
//               onChange={handleInputChange}
//               placeholder="Description"
//               required
//             />
//             <select
//               name="category"
//               value={updatedTool.category}
//               onChange={handleInputChange}
//               required
//             >
//               <option value="">Sélectionner une catégorie</option>
//               <option value="Equipment">Équipement</option>
//               <option value="Software">Logiciel</option>
//               <option value="Material">Matériel</option>
//             </select>
//             <input
//               type="number"
//               name="price"
//               value={updatedTool.price}
//               onChange={handleInputChange}
//               placeholder="Prix"
//               required
//             />
//             <input
//               type="text"
//               name="supplier"
//               value={updatedTool.supplier}
//               onChange={handleInputChange}
//               placeholder="Fournisseur"
//               required
//             />
//             <button type="submit">Enregistrer</button>
//             <button onClick={handleCancelEdit}>Annuler</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ToolsAdmin;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ToolsAdmin = () => {
  const token = localStorage.getItem('token');

  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    supplier: '',
  });
  const [editingTool, setEditingTool] = useState(null);
  const [updatedTool, setUpdatedTool] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    supplier: '',
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
        <select
          name="category"
          value={newTool.category}
          onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Equipment">Equipment</option>
          <option value="Software">Software</option>
          <option value="Material">Material</option>
        </select>
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
                    <select
                      name="category"
                      value={updatedTool.category}
                      onChange={handleInputChange}
                    >
                      <option value="Equipment">Equipment</option>
                      <option value="Software">Software</option>
                      <option value="Material">Material</option>
                    </select>
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