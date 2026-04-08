import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { getCartItems, removeFromCart, updateCartQuantity, getCartTotal, clearCart } from '../services/cartService';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const handleRemove = id => setItems(removeFromCart(id));
  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setItems(updateCartQuantity(id, newQty));
  };
  const handleClear = () => setItems(clearCart());

  const handleCheckout = () => {
    if (items.length > 0) {
      toast.success('Proceeding to checkout...');
      navigate('/checkout');
    }
  };

  const total = getCartTotal(items);
  const subtotal = total;
  const tax = total * 0.1;
  const shipping = total > 100 ? 0 : 10;
  const grandTotal = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-white p-12 text-center shadow-xl">
            <div className="inline-flex items-center justify-center rounded-full bg-gray-100 p-4 mb-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Your cart is empty</h1>
            <p className="mt-3 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="mt-6 inline-block rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-white font-semibold hover:shadow-lg transition-all">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Shopping Cart</h1>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item._id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-lg">
                <img 
                  src={`https://picsum.photos/seed/${item._id}/100/100`} 
                  alt={item.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <button onClick={() => handleRemove(item._id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        className="rounded-lg border border-gray-200 p-1 hover:bg-gray-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                        className="rounded-lg border border-gray-200 p-1 hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-primary-600">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
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
                onClick={handleCheckout}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 py-3 font-semibold text-white transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Checkout
              </button>
              <button
                onClick={handleClear}
                className="mt-3 w-full rounded-xl border border-gray-200 py-3 font-semibold text-gray-600 transition-all hover:bg-gray-50"
              >
                Clear Cart
              </button>
              <Link to="/products" className="mt-3 block text-center text-sm text-primary-600 hover:underline">
                Continue Shopping →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;