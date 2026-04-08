// src/components/Layout.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, Heart, 
  LogOut, Menu, X, Bell, User, ShoppingBag, 
  CheckCircle, Clock, Truck, AlertCircle, XCircle
} from 'lucide-react';
import { getCartCount } from '../services/cartService';
import toast from 'react-hot-toast';

const Layout = ({ children, onLogout, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  // Load notifications from localStorage
  useEffect(() => {
    // Load saved notifications
    const savedNotifications = localStorage.getItem('posNotifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed);
      setUnreadCount(parsed.filter(n => !n.read).length);
    } else {
      // Initialize with sample notifications
      const initialNotifications = [
        {
          id: 1,
          type: 'order',
          title: 'New Order Received',
          message: 'Order #ORD-1001 has been placed by John Doe',
          time: new Date(Date.now() - 5 * 60000).toISOString(),
          read: false,
          icon: 'shopping-bag',
          color: 'blue'
        },
        {
          id: 2,
          type: 'stock',
          title: 'Low Stock Alert',
          message: 'Nike Air Max shoes are running low (Only 3 left)',
          time: new Date(Date.now() - 30 * 60000).toISOString(),
          read: false,
          icon: 'alert',
          color: 'red'
        },
        {
          id: 3,
          type: 'delivery',
          title: 'Order Delivered',
          message: 'Order #ORD-0998 has been successfully delivered',
          time: new Date(Date.now() - 2 * 3600000).toISOString(),
          read: true,
          icon: 'truck',
          color: 'green'
        },
        {
          id: 4,
          type: 'payment',
          title: 'Payment Received',
          message: 'Payment of $189.95 received for Order #ORD-1001',
          time: new Date(Date.now() - 3 * 3600000).toISOString(),
          read: true,
          icon: 'payment',
          color: 'purple'
        },
        {
          id: 5,
          type: 'review',
          title: 'New Product Review',
          message: '5-star review received for iPhone 15 Pro',
          time: new Date(Date.now() - 5 * 3600000).toISOString(),
          read: false,
          icon: 'star',
          color: 'yellow'
        }
      ];
      setNotifications(initialNotifications);
      localStorage.setItem('posNotifications', JSON.stringify(initialNotifications));
      setUnreadCount(initialNotifications.filter(n => !n.read).length);
    }

    // Update cart count
    setCartCount(getCartCount());
    const cartInterval = setInterval(() => setCartCount(getCartCount()), 1000);
    
    // Simulate real-time notifications
    const notificationInterval = setInterval(() => {
      addRandomNotification();
    }, 30000); // Add random notification every 30 seconds

    return () => {
      clearInterval(cartInterval);
      clearInterval(notificationInterval);
    };
  }, []);

  // Add random notification for demo
  const addRandomNotification = () => {
    const notificationTypes = [
      { type: 'order', title: 'New Order', message: 'A new order has been placed!', icon: 'shopping-bag', color: 'blue' },
      { type: 'stock', title: 'Low Stock', message: 'Product stock is running low', icon: 'alert', color: 'red' },
      { type: 'delivery', title: 'Order Shipped', message: 'Order has been shipped', icon: 'truck', color: 'green' },
      { type: 'payment', title: 'Payment Received', message: 'Payment received successfully', icon: 'payment', color: 'purple' },
    ];
    
    const random = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const newNotification = {
      id: Date.now(),
      type: random.type,
      title: random.title,
      message: random.message,
      time: new Date().toISOString(),
      read: false,
      icon: random.icon,
      color: random.color
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    // Save to localStorage
    const updated = [newNotification, ...notifications];
    localStorage.setItem('posNotifications', JSON.stringify(updated));
    
    // Show toast for new notification
    toast.success(random.title, {
      duration: 4000,
      position: 'top-right',
      icon: '🔔'
    });
  };

  const markAsRead = (notificationId) => {
    const updated = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    localStorage.setItem('posNotifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem('posNotifications', JSON.stringify(updated));
    toast.success('All notifications marked as read');
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.setItem('posNotifications', JSON.stringify([]));
    toast.success('All notifications cleared');
  };

  const getNotificationIcon = (type, color) => {
    const iconClasses = `h-5 w-5 text-${color}-500`;
    switch(type) {
      case 'shopping-bag':
        return <ShoppingBag className={iconClasses} />;
      case 'alert':
        return <AlertCircle className={iconClasses} />;
      case 'truck':
        return <Truck className={iconClasses} />;
      case 'payment':
        return <CheckCircle className={iconClasses} />;
      case 'star':
        return <Star className={iconClasses} />;
      default:
        return <Bell className={iconClasses} />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-blue-500' },
    { path: '/products', icon: Package, label: 'Products', color: 'text-purple-500' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', color: 'text-green-500', badge: cartCount },
    { path: '/wishlist', icon: Heart, label: 'Wishlist', color: 'text-red-500' },
    { path: '/orders', icon: ShoppingBag, label: 'Orders', color: 'text-orange-500' },
  ];

  // Star icon component
  const Star = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} relative bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col shadow-2xl z-20`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-2">
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
        
        <nav className="flex-1 py-6 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-6 py-3 my-1 transition-all duration-200
                ${isActive ? 'bg-white/10 border-r-4 border-blue-500' : 'hover:bg-white/5'}
                ${!sidebarOpen && 'justify-center'}
              `}
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
              {sidebarOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs font-bold">
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
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition group"
                >
                  <Bell className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notification Dropdown */}
                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50">
                        <div>
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <p className="text-xs text-gray-500">You have {unreadCount} unread notifications</p>
                        </div>
                        <div className="flex gap-2">
                          {unreadCount > 0 && (
                            <button 
                              onClick={markAllAsRead}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Mark all read
                            </button>
                          )}
                          {notifications.length > 0 && (
                            <button 
                              onClick={clearAllNotifications}
                              className="text-xs text-red-600 hover:text-red-700"
                            >
                              Clear all
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No notifications</p>
                            <p className="text-xs text-gray-400 mt-1">New notifications will appear here</p>
                          </div>
                        ) : (
                          notifications.map(notification => (
                            <div 
                              key={notification.id}
                              onClick={() => markAsRead(notification.id)}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer ${
                                !notification.read ? 'bg-blue-50/30' : ''
                              }`}
                            >
                              <div className="flex gap-3">
                                <div className={`p-2 rounded-lg bg-${notification.color}-100 flex-shrink-0`}>
                                  {getNotificationIcon(notification.icon, notification.color)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                      {notification.title}
                                    </p>
                                    <span className="text-xs text-gray-400 flex-shrink-0">
                                      {formatTime(notification.time)}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                    {notification.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      
                      <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                        <button 
                          onClick={() => {
                            setShowNotifications(false);
                            navigate('/notifications');
                          }}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
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