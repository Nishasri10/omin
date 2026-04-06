// src/components/PaymentModal.jsx
import { useState } from 'react';

const PaymentModal = ({ total, onClose, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const banks = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank', 'Yes Bank'];

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real implementation, integrate with actual payment gateways
    const paymentSuccess = Math.random() > 0.1; // 90% success rate for demo
    
    if (paymentSuccess) {
      onPaymentComplete({
        success: true,
        transactionId: 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8),
        method: paymentMethod,
        amount: total,
        timestamp: new Date().toISOString()
      });
      onClose();
    } else {
      alert('Payment failed. Please try again.');
    }
    
    setProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Payment Details</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        
        <div className="mb-6 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white">
          <p className="text-sm opacity-80">Total Amount</p>
          <p className="text-3xl font-bold">${total.toFixed(2)}</p>
        </div>

        <div className="mb-4 space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50">
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={() => setPaymentMethod('online')}
              className="h-4 w-4 text-slate-900"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Online Payment</p>
              <p className="text-sm text-slate-500">Credit/Debit Card, UPI, Net Banking</p>
            </div>
            <div className="flex gap-1">
              <span className="text-xs">💳</span>
              <span className="text-xs">📱</span>
              <span className="text-xs">🏦</span>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="h-4 w-4 text-slate-900"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Cash on Delivery</p>
              <p className="text-sm text-slate-500">Pay when you receive the product</p>
            </div>
            <span className="text-xs">💰</span>
          </label>
        </div>

        {paymentMethod === 'online' && (
          <div className="space-y-4">
            <div className="flex gap-2 border-b pb-3">
              <button 
                onClick={() => setUpiId('')}
                className={`flex-1 rounded-lg px-3 py-2 text-sm ${!upiId && !cardNumber ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                💳 Card
              </button>
              <button 
                onClick={() => { setUpiId('user@okhdfcbank'); setCardNumber(''); }}
                className={`flex-1 rounded-lg px-3 py-2 text-sm ${upiId === 'user@okhdfcbank' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                📱 UPI
              </button>
              <button 
                onClick={() => setSelectedBank('HDFC Bank')}
                className={`flex-1 rounded-lg px-3 py-2 text-sm ${selectedBank ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                🏦 NetBanking
              </button>
            </div>

            {upiId === 'user@okhdfcbank' ? (
              <div>
                <label className="block text-sm font-medium text-slate-700">UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="username@bankname"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
                />
                <p className="mt-2 text-xs text-slate-500">Demo UPI: user@okhdfcbank, user@ybl, user@paytm</p>
              </div>
            ) : selectedBank ? (
              <div>
                <label className="block text-sm font-medium text-slate-700">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={e => setSelectedBank(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
                >
                  <option value="">Select a bank</option>
                  {banks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Expiry Date</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={e => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={e => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength="3"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {paymentMethod === 'cod' && (
          <div className="rounded-lg bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-600">Pay with cash when your order is delivered</p>
            <p className="mt-2 text-xs text-slate-500">Free shipping on orders over $50</p>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={processing}
            className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;