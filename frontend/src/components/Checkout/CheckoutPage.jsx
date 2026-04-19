import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartItems, getCartTotal, clearCart } from '../../services/cartService';
import PaymentModal from '../Common/PaymentModal';
import { ArrowLeft, MapPin, Phone, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const CheckoutPage = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const navigate = useNavigate();

  useEffect(() => {
    const items = getCartItems();
    if (items.length === 0) {
      navigate('/cart');
      toast.error('Your cart is empty');
    }
    setCartItems(items);
    setTotal(getCartTotal(items));
  }, [navigate]);

  const handleInputChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    // Validate shipping details
    if (!shippingDetails.fullName || !shippingDetails.address || !shippingDetails.city) {
      toast.error('Please fill in all shipping details');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentComplete = async (paymentInfo) => {
    const orderData = {
      items: cartItems,
      total: total + (total > 100 ? 0 : 10) + (total * 0.1),
      subtotal: total,
      tax: total * 0.1,
      shipping: total > 100 ? 0 : 10,
      paymentMethod: paymentInfo.method,
      transactionId: paymentInfo.transactionId,
      shippingDetails,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    try {
      const token = localStorage.getItem('posToken');
      const response = await axios.post('/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Save to localStorage for demo
      const existingOrders = JSON.parse(localStorage.getItem('posOrders') || '[]');
      existingOrders.unshift({ ...orderData, id: response.data.id });
      localStorage.setItem('posOrders', JSON.stringify(existingOrders));
      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  const subtotal = total;
  const tax = total * 0.1;
  const shipping = total > 100 ? 0 : 10;
  const grandTotal = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
          Back to Cart
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={shippingDetails.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 focus:border-primary-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={shippingDetails.email}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 focus:border-primary-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 focus:border-primary-500 focus:outline-none"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 focus:border-primary-500 focus:outline-none"
                      placeholder="123 Main St"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingDetails.state}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingDetails.zipCode}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingDetails.country}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary-500 focus:outline-none"
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-lg sticky top-24">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Order Summary</h2>
              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary-600">${grandTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 py-3 font-semibold text-white transition-all hover:shadow-lg"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          total={grandTotal}
          onClose={() => setShowPayment(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default CheckoutPage;