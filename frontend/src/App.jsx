import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PosPage from './pages/PosPage';
import InventoryPage from './pages/InventoryPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
};

export default App;