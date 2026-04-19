import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Clock, Truck, XCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('posToken');
      const response = await axios.get('/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'processing': return <Package className="h-5 w-5 text-purple-500" />;
      case 'shipped': return <Truck className="h-5 w-5 text-indigo-500" />;
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-purple-100 text-purple-700';
      case 'shipped': return 'bg-indigo-100 text-indigo-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-xl">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl font-semibold text-gray-900">No orders yet</p>
            <p className="mt-3 text-gray-600">Start shopping to see your orders here!</p>
            <Link to="/products" className="mt-6 inline-block rounded-xl bg-primary-600 px-6 py-3 text-white font-semibold hover:bg-primary-700">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={order.id || index} className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="flex flex-col gap-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <p className="text-2xl font-bold text-gray-900">${order.total?.toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status?.toUpperCase() || 'PENDING'}
                    </span>
                    <span className="text-xs text-gray-400">{order.paymentMethod}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="mb-3 font-semibold text-gray-900">Items Ordered</h3>
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={`https://picsum.photos/id/${(idx + 1) * 50}/40/40`}
                            alt={item.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="text-xl font-bold text-primary-600">${order.total?.toFixed(2)}</span>
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