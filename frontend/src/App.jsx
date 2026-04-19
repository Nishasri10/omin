import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import ProductPage from './components/Products/ProductPage';
import ProductDetailPage from './components/Products/ProductDetailPage';
import CartPage from './components/Cart/CartPage';
import OrderPage from './components/Orders/OrderPage';
import WishlistPage from './components/Wishlist/WishlistPage';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import ProfilePage from './components/Profile/ProfilePage';
import NotificationsPage from './components/Notifications/NotificationsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('posToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
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

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading RetailPOS...</p>
        </div>
      </div>
    );
  }

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
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;