import { Menu, Bell, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCartCount } from '../../services/cartService';
import { useState, useEffect } from 'react';

const TopBar = ({ onMenuClick, user }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-4">
          <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="h-5 w-5" />
          </Link>
          
          <Link to="/profile" className="flex items-center gap-3 ml-2">
            <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'Admin'}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;