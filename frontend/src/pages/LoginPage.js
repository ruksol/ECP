// // pages/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/login', {
//         username,
//         password,
//       });

//       // Store the token in local storage or session storage
//       localStorage.setItem('token', response.data.token);

//       // Redirect the user to the desired page (e.g., the dashboard)
//       window.location.href = '/home';
//     } catch (error) {
//       console.error('Error logging in:', error);
//       // Display an error message to the user
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
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
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// // pages/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/login', {
//         username,
//         password,
//       });

//       // Store the token and role in local storage or session storage
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('role', response.data.role);

//       // Redirect the user based on their role
//       if (response.data.role === 'admin') {
//         window.location.href = '/dashboard';
//       } else {
//         window.location.href = '/home';
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       // Display an error message to the user
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
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
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });

      // Store the token in local storage or session storage
      localStorage.setItem('token', response.data.token);

      // Decode the token to get the user's role
      const decoded = jwtDecode(response.data.token);
      const role = decoded.role;

      // Redirect the user based on their role
      if (role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Display an error message to the user
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
