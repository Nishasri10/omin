// src/components/OrderPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton.jsx';
import { fetchOrders } from '../services/api.js';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('posToken');
        let ordersData = [];
        
        // Try to fetch from API first
        try {
          const result = await fetchOrders(token);
          ordersData = result.data || [];
        } catch (apiError) {
          console.log('Using local orders data');
        }
        
        // If no orders from API, load from localStorage
        if (ordersData.length === 0) {
          const savedOrders = JSON.parse(localStorage.getItem('posOrders') || '[]');
          ordersData = savedOrders;
        }
        
        // If still no orders, create demo orders
        if (ordersData.length === 0) {
          ordersData = [
            {
              _id: 'demo_1',
              orderNumber: 'ORD-1001',
              pricing: { total: 189.95 },
              status: 'delivered',
              cashierId: { name: 'John Doe' },
              items: [{ name: 'Product 1', price: 89.99, quantity: 1 }, { name: 'Product 2', price: 99.96, quantity: 2 }],
              createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
              paymentMethod: 'online',
              transactionId: 'TXN_123456'
            },
            {
              _id: 'demo_2',
              orderNumber: 'ORD-1002',
              pricing: { total: 72.20 },
              status: 'shipped',
              cashierId: { name: 'Jane Smith' },
              items: [{ name: 'Product 3', price: 72.20, quantity: 1 }],
              createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
              paymentMethod: 'cod'
            },
            {
              _id: 'demo_3',
              orderNumber: 'ORD-1003',
              pricing: { total: 259.10 },
              status: 'pending',
              cashierId: { name: 'Mike Johnson' },
              items: [{ name: 'Product 4', price: 259.10, quantity: 1 }],
              createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
              paymentMethod: 'online',
              transactionId: 'TXN_789012'
            },
            {
              _id: 'demo_4',
              orderNumber: 'ORD-1004',
              pricing: { total: 45.50 },
              status: 'completed',
              cashierId: { name: 'Sarah Wilson' },
              items: [{ name: 'Product 5', price: 45.50, quantity: 1 }],
              createdAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
              paymentMethod: 'online'
            }
          ];
        }
        
        setOrders(ordersData);
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Unable to load orders');
      } finally {
        setLoading(false);
      }
    };
    
    loadOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-700',
      'processing': 'bg-blue-100 text-blue-700',
      'shipped': 'bg-purple-100 text-purple-700',
      'delivered': 'bg-green-100 text-green-700',
      'completed': 'bg-emerald-100 text-emerald-700',
      'cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status?.toLowerCase()] || 'bg-slate-100 text-slate-700';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': '⏳',
      'processing': '🔄',
      'shipped': '🚚',
      'delivered': '✅',
      'completed': '🎉',
      'cancelled': '❌'
    };
    return icons[status?.toLowerCase()] || '📦';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
            <div className="animate-pulse">
              <p className="text-slate-600">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 rounded-[2rem] bg-white p-8 shadow-xl">
          <div className="mb-5">
            <BackButton fallback="/dashboard" label="← Back to dashboard" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">📦 My Orders</h1>
          <p className="mt-3 text-slate-500">
            Track your order history, status, and payment details.
            {orders.length === 0 && " Start shopping to see your orders here!"}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 px-5 py-4 text-red-700 shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-12 text-center shadow-xl">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl font-semibold text-slate-900">No orders yet</p>
            <p className="mt-3 text-slate-600">You haven't placed any orders. Browse our products and make your first purchase!</p>
            <div className="mt-6">
              <Link to="/products" className="inline-block rounded-3xl bg-slate-900 px-6 py-3 text-white hover:bg-slate-800">
                Start Shopping →
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={order._id || index} className="overflow-hidden rounded-[2rem] bg-white shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Order #{order.orderNumber}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">${order.pricing?.total?.toFixed(2) || '0.00'}</p>
                    {order.paymentMethod && (
                      <p className="text-xs text-slate-500 mt-1">
                        {order.paymentMethod === 'online' ? '💳 Online Payment' : '💰 Cash on Delivery'}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status?.toUpperCase() || 'PENDING'}
                    </span>
                    {order.transactionId && (
                      <span className="text-xs text-slate-400 font-mono">Txn: {order.transactionId}</span>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="mb-4 font-semibold text-slate-900">🛍️ Items Ordered</h3>
                  <div className="space-y-3">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3 flex-1">
                          <img 
                            src={`https://picsum.photos/id/${(idx + 1) * 50}/40/40`}
                            alt={item.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center border-t border-slate-200 pt-4">
                    <span className="font-semibold text-slate-900">Total Amount</span>
                    <span className="text-xl font-bold text-slate-900">${order.pricing?.total?.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
                    <span>Order placed: {new Date(order.createdAt).toLocaleDateString()}</span>
                    <span>Order ID: {order.orderNumber}</span>
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

export default OrderPage;