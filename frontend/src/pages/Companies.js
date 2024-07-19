// // import React, { useState, useEffect } from 'react';

// // const Companies = () => {
// //   const [companies, setCompanies] = useState([]);

// //   useEffect(() => {
// //     // Fetch company data from an API or your own data source
// //     const fetchCompanies = async () => {
// //       try {
// //         const response = await fetch('http://localhost:5000/api/companies', {
// //           headers: {
// //             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgyNmUyOGMzOWI3MzI0MWJhMzRmYmMiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTgzMzk4MSwiZXhwIjoxNzIwNDM4NzgxfQ.gd5i3XAKczQBegrM5Qn74ylXOTagXd7G-54hP9-RV40'
// //           }
// //         });

// //         if (!response.ok) {
// //           throw new Error(`HTTP error ${response.status}`);
// //         }

// //         const data = await response.json();
// //         setCompanies(data);
// //       } catch (error) {
// //         console.error('Error fetching companies:', error);
// //       }
// //     };
// //     fetchCompanies();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Companies</h1>
// //       <ul>
// //         {companies.map((company) => (
// //           <li key={company.id}>
// //             <h3>{company.name}</h3>
// //             <p>{company.description}</p>
// //             {/* Add more company details as needed */}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Companies;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Companies = () => {
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/companies', {
//           headers: {
//             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjgyNmUyOGMzOWI3MzI0MWJhMzRmYmMiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxOTgzMzk4MSwiZXhwIjoxNzIwNDM4NzgxfQ.gd5i3XAKczQBegrM5Qn74ylXOTagXd7G-54hP9-RV40'
//           }
//         });
//         setCompanies(response.data);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   return (
//     <div>
//       <h1>Companies</h1>
//       <ul>
//         {companies.map((company) => (
//           <li key={company._id}>
//             <h3>{company.name}</h3>
//             <p>{company.description}</p>
//             <p>Email: {company.email}</p>
//             <p>Phone: {company.phone}</p>
//             <p>
//               Address: {company.address.street}, {company.address.city}, {company.address.region}, {company.address.country}, {company.address.postalCode}
//             </p>
//             <p>Website: {company.website}</p>
//             <p>Category: {company.category}</p>
//             <p>Created: {new Date(company.createdAt).toLocaleString()}</p>
//             <p>Updated: {new Date(company.updatedAt).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Companies;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Companies.css'; // Import the CSS file

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/companies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="companies-container">
      <h1 className="companies-title">Companies</h1>
      <ul className="companies-list">
        {companies.map((company) => (
          <li key={company._id} className="company-item">
            <h3 className="company-name">{company.name}</h3>
            <p className="company-detail">{company.description}</p>
            <p className="company-detail">
              <span className="company-detail-label">Email:</span> {company.email}
            </p>
            <p className="company-detail">
              <span className="company-detail-label">Phone:</span> {company.phone}
            </p>
            <p className="company-detail">
              <span className="company-detail-label">Address:</span> {company.address.street}, {company.address.city}, {company.address.region}, {company.address.country}, {company.address.postalCode}
            </p>
            <p className="company-detail">
              <span className="company-detail-label">Website:</span> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
            </p>
            <p className="company-detail">
              <span className="company-detail-label">Category:</span> {company.category}
            </p>
            <p className="company-detail">
              <span className="company-detail-label">Created:</span> {new Date(company.createdAt).toLocaleString()}
            </p>
            <p className="company-detail">
              <span className="company-detail-label">Updated:</span> {new Date(company.updatedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Companies;
