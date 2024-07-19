import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Companies from './pages/Companies';
import IndustryNews from './pages/IndustryNews';
import Tenders from './pages/Tenders';
import Tools from './pages/Tools';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/news" element={<IndustryNews />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;