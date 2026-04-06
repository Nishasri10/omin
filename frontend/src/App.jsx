// App.jsx (updated with better routing)
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import LoginScreen from './components/LoginScreen.jsx';
import SignupScreen from './components/SignupScreen.jsx';
import Dashboard from './components/Dashboard.jsx';
import ProductPage from './components/ProductPage.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import CartPage from './components/CartPage.jsx';
import WishlistPage from './components/WishlistPage.jsx';
import OrderPage from './components/OrderPage.jsx';

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('posToken');
    if (token) {
      // You could verify token with backend here
      setUser({ name: localStorage.getItem('userName') || 'User' });
    }
    setLoading(false);
  }, []);

  const handleLogin = userData => {
    setUser(userData);
    localStorage.setItem('userName', userData.name);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('posToken');
    localStorage.removeItem('userName');
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/dashboard" className="text-2xl font-semibold tracking-tight">
              OmniRetail POS
            </Link>
            <p className="text-sm text-slate-300">Modern omnichannel point-of-sale for stores and teams</p>
          </div>
          {user && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-100">
                <Link to="/dashboard" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20">Dashboard</Link>
                <Link to="/products" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20">Products</Link>
                <Link to="/orders" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20">Orders</Link>
                <Link to="/wishlist" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20">Wishlist</Link>
                <Link to="/cart" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20">Cart</Link>
              </nav>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-700/70 px-3 py-1 text-sm">{user?.role || 'Cashier'}</span>
                <button onClick={handleLogout} className="rounded-full bg-white px-4 py-2 text-slate-900 transition hover:bg-slate-200">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
          <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupScreen onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute user={user}>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute user={user}>
                <ProductDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute user={user}>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute user={user}>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;