// CartPage.jsx - Enhanced with buy now and payment
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton.jsx';
import { getCartItems, removeFromCart, updateCartQuantity, getCartTotal, clearCart } from '../services/cartService.js';
import PaymentModal from './PaymentModal.jsx';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

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
      setShowPayment(true);
    }
  };

  const handlePaymentComplete = (paymentData) => {
    // Save order
    const orders = JSON.parse(localStorage.getItem('posOrders') || '[]');
    orders.push({
      _id: 'order_' + Date.now(),
      orderNumber: 'ORD-' + String(orders.length + 1001),
      pricing: { total: getCartTotal(items) },
      status: 'pending',
      items: items.map(item => ({ ...item, quantity: item.quantity })),
      createdAt: new Date().toISOString(),
      paymentMethod: paymentData.method,
      transactionId: paymentData.transactionId
    });
    localStorage.setItem('posOrders', JSON.stringify(orders));
    
    // Clear cart
    clearCart();
    setItems([]);
    setShowPayment(false);
    alert('Order placed successfully!');
  };

  const total = getCartTotal(items);

  if (items.length === 0 && !showPayment) {
    return (
      <div className="min-h-screen bg-slate-100 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-xl">
            <BackButton fallback="/products" label="Back to products" />
            <div className="mt-5">
              <h1 className="text-3xl font-semibold text-slate-900">Your Cart</h1>
              <p className="text-sm text-slate-500">Review the items you saved and proceed to checkout.</p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
            <p className="text-xl font-semibold text-slate-900">Your cart is empty.</p>
            <p className="mt-3 text-slate-600">Add products from the catalog to see them here.</p>
            <Link to="/products" className="mt-6 inline-block rounded-3xl bg-slate-900 px-6 py-3 text-white hover:bg-slate-800">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-xl sm:flex-row sm:justify-between sm:items-center">
          <div>
            <BackButton fallback="/products" label="Back to products" />
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">Your Cart</h1>
            <p className="text-sm text-slate-500">You have {items.length} item(s) in your cart.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead className="border-b border-slate-200 text-slate-900">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item._id} className="border-b border-slate-200">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={`https://picsum.photos/seed/${item._id}_cart/50/50`} 
                            alt={item.name}
                            className="h-12 w-12 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-semibold text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-500">{item.category}</p>
                          </div>
                        </div>
                       </td>
                      <td className="px-4 py-4">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => handleQuantityChange(item._id, Number(e.target.value))}
                          className="w-20 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900"
                        />
                       </td>
                      <td className="px-4 py-4">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <button onClick={() => handleRemove(item._id)} className="rounded-2xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">
                          Remove
                        </button>
                       </td>
                     </tr>
                  ))}
                </tbody>
               </table>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-6 text-slate-700 shadow-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Cart total</p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">${total.toFixed(2)}</p>
              <p className="mt-1 text-xs text-slate-500">Including taxes and shipping</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={handleClear} className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Clear cart
              </button>
              <button onClick={handleCheckout} className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          total={total}
          onClose={() => setShowPayment(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default CartPage;