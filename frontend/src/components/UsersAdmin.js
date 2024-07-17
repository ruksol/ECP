// // UsersAdmin.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UsersAdmin = () => {
//   const token = localStorage.getItem('token');

//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'user',
//   });
//   const [editingUser, setEditingUser] = useState(null);
//   const [updatedUser, setUpdatedUser] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'user',
//   });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/users', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleAddUser = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/users', newUser, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       fetchUsers();
//       setNewUser({
//         username: '',
//         email: '',
//         password: '',
//         role: 'user',
//       });
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setUpdatedUser(user); // Set initial values for editing
//   };

//   const handleCancelEdit = () => {
//     setEditingUser(null);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       fetchUsers();
//       setEditingUser(null); // Exit editing mode
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDeleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/users/${id}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <div className="users-admin">
//       <h2>Users</h2>

//       {/* Add New User Form */}
//       <h3>Add New User</h3>
//       <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
//         <input
//           type="text"
//           name="username"
//           value={newUser.username}
//           onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={newUser.password}
//           onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//           placeholder="Password"
//           required
//         />
//         <select
//           name="role"
//           value={newUser.role}
//           onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//         >
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button type="submit">Add User</button>
//       </form>

//       {/* Users List */}
//       <h3>Users</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td>
//                 {editingUser && editingUser._id === user._id ? (
//                   <input
//                     type="text"
//                     name="username"
//                     value={updatedUser.username}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   user.username
//                 )}
//               </td>
//               <td>
//                 {editingUser && editingUser._id === user._id ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={updatedUser.email}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   user.email
//                 )}
//               </td>
//               <td>
//                 {editingUser && editingUser._id === user._id ? (
//                   <select
//                     name="role"
//                     value={updatedUser.role}
//                     onChange={handleInputChange}
//                   >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 ) : (
//                   user.role
//                 )}
//               </td>
//               <td>
//                 {editingUser && editingUser._id === user._id ? (
//                   <>
//                     <button onClick={handleSave}>Save</button>
//                     <button onClick={handleCancelEdit}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     <button onClick={() => handleEdit(user)}>Edit</button>
//                     <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersAdmin;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersAdmin = () => {
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', newUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
      setNewUser({
        username: '',
        email: '',
        password: '',
        role: 'user',
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUpdatedUser(user); // Set initial values for editing
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
      setEditingUser(null); // Exit editing mode
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="users-admin">
      <h2>Users</h2>

      {/* Add New User Form */}
      <h3>Add New User</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Password"
          required
        />
        <select
          name="role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      {/* Users List */}
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="text"
                    name="username"
                    value={updatedUser.username}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="password"
                    name="password"
                    value={updatedUser.password}
                    onChange={handleInputChange}
                  />
                ) : (
                  '******'
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <select
                    name="role"
                    value={updatedUser.role}
                    onChange={handleInputChange}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersAdmin;