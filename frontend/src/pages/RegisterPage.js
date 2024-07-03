// // pages/Register.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function Register() {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/register', {
//         username,
//         email,
//         password,
//         role,
//       });

//       // Store the token in local storage or session storage
//       localStorage.setItem('token', response.data.token);

//       // Redirect the user to the login page or the desired page (e.g., the dashboard)
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Error registering user:', error);
//       // Display an error message to the user
//       alert('Error registering user');
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <label>
//           Role:
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </label>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;

// pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
        role: 'user', // Set the role to 'user' regardless of the user's input
      });

      // Store the token in local storage or session storage
      localStorage.setItem('token', response.data.token);

      // Redirect the user to the login page or the desired page (e.g., the dashboard)
      window.location.href = '/login';
    } catch (error) {
      console.error('Error registering user:', error);
      // Display an error message to the user
      alert('Error registering user');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* Remove the role selection dropdown */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;