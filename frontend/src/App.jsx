// src/App.jsx (Add Notifications route)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Products from './components/ProductPage';
import Orders from './components/OrderPage';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ProductDetailPage from './components/ProductDetailPage';
import NotificationsPage from './components/NotificationsPage';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('posToken');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('posToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupScreen onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </>
    );
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Layout onLogout={handleLogout} user={user}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;