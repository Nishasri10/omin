import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ShoppingBag, AlertCircle, Truck, CheckCircle, Star, Trash2, CheckCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const ArrowLeft = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedNotifications = localStorage.getItem('posNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    } else {
      const sampleNotifications = [
        { id: 1, title: 'New Order Received', message: 'Order #ORD-1001 has been placed', type: 'shopping-bag', color: 'blue', read: false, time: new Date().toISOString() },
        { id: 2, title: 'Low Stock Alert', message: 'iPhone 15 Pro Max is running low on stock', type: 'alert', color: 'red', read: false, time: new Date().toISOString() },
        { id: 3, title: 'Order Shipped', message: 'Your order #ORD-0999 has been shipped', type: 'truck', color: 'green', read: true, time: new Date(Date.now() - 86400000).toISOString() },
      ];
      setNotifications(sampleNotifications);
      localStorage.setItem('posNotifications', JSON.stringify(sampleNotifications));
    }
  }, []);

  const markAsRead = (notificationId) => {
    const updated = notifications.map(n => n.id === notificationId ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('posNotifications', JSON.stringify(updated));
    toast.success('Marked as read');
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('posNotifications', JSON.stringify(updated));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (notificationId) => {
    const updated = notifications.filter(n => n.id !== notificationId);
    setNotifications(updated);
    localStorage.setItem('posNotifications', JSON.stringify(updated));
    toast.success('Notification deleted');
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('posNotifications', JSON.stringify([]));
    toast.success('All notifications cleared');
  };

  const getFilteredNotifications = () => {
    if (filter === 'unread') return notifications.filter(n => !n.read);
    if (filter === 'read') return notifications.filter(n => n.read);
    return notifications;
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'shopping-bag': return <ShoppingBag className="h-5 w-5" />;
      case 'alert': return <AlertCircle className="h-5 w-5" />;
      case 'truck': return <Truck className="h-5 w-5" />;
      case 'payment': return <CheckCircle className="h-5 w-5" />;
      case 'star': return <Star className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getColorClass = (color) => {
    const colors = { blue: 'bg-blue-100 text-blue-600', red: 'bg-red-100 text-red-600', green: 'bg-green-100 text-green-600', purple: 'bg-purple-100 text-purple-600', yellow: 'bg-yellow-100 text-yellow-600' };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-sm text-gray-500 mt-1">Stay updated with your store activities</p>
            </div>
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={deleteAllNotifications} className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 border-b border-gray-200">
          {['all', 'unread', 'read'].map((filterType) => (
            <button key={filterType} onClick={() => setFilter(filterType)} className={`px-4 py-2 text-sm font-medium transition ${filter === filterType ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              {filterType === 'unread' && unreadCount > 0 && <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">{unreadCount}</span>}
            </button>
          ))}
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
            <p className="text-sm text-gray-500 mt-2">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map(notification => (
              <div key={notification.id} className={`bg-white rounded-xl shadow-sm border transition hover:shadow-md ${!notification.read ? 'border-l-4 border-l-blue-500' : 'border-gray-100'}`}>
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-xl ${getColorClass(notification.color)} flex-shrink-0`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <p className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>{notification.title}</p>
                          <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{formatTime(notification.time)}</p>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && <button onClick={() => markAsRead(notification.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><CheckCheck className="h-4 w-4" /></button>}
                          <button onClick={() => deleteNotification(notification.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;