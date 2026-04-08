import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, Heart, 
  LogOut, Menu, X, Bell, User, ShoppingBag 
} from 'lucide-react';
import { getCartCount } from '../services/cartService';

const Layout = ({ children, onLogout, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useState(() => {
    setCartCount(getCartCount());
    const interval = setInterval(() => setCartCount(getCartCount()), 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-blue-500' },
    { path: '/products', icon: Package, label: 'Products', color: 'text-purple-500' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', color: 'text-green-500', badge: cartCount },
    { path: '/wishlist', icon: Heart, label: 'Wishlist', color: 'text-red-500' },
    { path: '/orders', icon: ShoppingBag, label: 'Orders', color: 'text-orange-500' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} relative bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col shadow-2xl`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 p-2">
              <ShoppingBag className="h-6 w-6" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">RetailPOS</h1>
                <p className="text-xs text-gray-400">Enterprise Suite</p>
              </div>
            )}
          </div>
        </div>
        
        <nav className="flex-1 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-6 py-3 my-1 transition-all duration-200
                ${isActive ? 'bg-white/10 border-r-4 border-primary-500' : 'hover:bg-white/5'}
                ${!sidebarOpen && 'justify-center'}
              `}
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
              {sidebarOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="rounded-full bg-primary-500 px-2 py-0.5 text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          ))}
        </nav>
        
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 px-6 py-4 border-t border-gray-700 text-gray-400 hover:bg-white/5 hover:text-white transition-colors ${!sidebarOpen && 'justify-center'}`}
        >
          <LogOut className="h-5 w-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 hover:bg-gray-100 rounded-xl transition"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold shadow-lg">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;