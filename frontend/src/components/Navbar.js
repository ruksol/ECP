// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Perform logout logic, e.g., clear token from local storage
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const isLoggedIn = !!localStorage.getItem('token');

//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/companies">Companies</Link></li>
//         <li><Link to="/news">Industry News</Link></li>
//         <li><Link to="/tenders">Tenders</Link></li>
//         <li><Link to="/tools">Tools</Link></li>
//         {!isLoggedIn && (
//           <>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//           </>
//         )}
//         {isLoggedIn && (
//           <li><button onClick={handleLogout}>Logout</button></li>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic, e.g., clear token from local storage
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');
  let isAdmin = false;

  if (isLoggedIn) {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    isAdmin = decoded.role === 'admin';
  }

  return (
    <nav>
      <ul>
        {!isAdmin && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/companies">Companies</Link></li>
            <li><Link to="/news">Industry News</Link></li>
            <li><Link to="/tenders">Tenders</Link></li>
            <li><Link to="/tools">Tools</Link></li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {isLoggedIn && (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;