// AdminPage.js
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import CompaniesAdmin from '../components/CompaniesAdmin';
import NewsAdmin from '../components/NewsAdmin';
import TendersAdmin from '../components/TendersAdmin';
import ToolsAdmin from '../components/ToolsAdmin';
import UsersAdmin from '../components/UsersAdmin';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <aside className="sidebar">
        <nav>
          <ul>
            <li><Link to="/dashboard/companies">Companies</Link></li>
            <li><Link to="/dashboard/news">News</Link></li>
            <li><Link to="/dashboard/tenders">Tenders</Link></li>
            <li><Link to="/dashboard/tools">Tools</Link></li>
            <li><Link to="/dashboard/users">Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-content">
        <Routes>
          <Route path="companies" element={<CompaniesAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="tenders" element={<TendersAdmin />} />
          <Route path="tools" element={<ToolsAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPage;