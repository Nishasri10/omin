import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Heart, ShoppingBag, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onLogout, user }) => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist' },
    { path: '/orders', icon: ShoppingBag, label: 'Orders' },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col`}>
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-primary-400" />
          {isOpen && (
            <div>
              <h1 className="font-bold text-lg">RetailPOS</h1>
              <p className="text-xs text-slate-400">Complete POS System</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-6 py-3 my-1 transition-colors
              ${isActive ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-700'}
              ${!isOpen && 'justify-center'}
            `}
          >
            <item.icon className="h-5 w-5" />
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        {isOpen && (
          <div className="mb-4 px-2">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="text-sm font-semibold truncate">{user?.name || 'Admin'}</p>
          </div>
        )}
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors ${!isOpen && 'justify-center'}`}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;