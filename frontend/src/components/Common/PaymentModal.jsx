import { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentModal = ({ total, onClose, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [cardName, setCardName] = useState('');

  const banks = ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank', 'Yes Bank', 'PNB', 'Bank of Baroda'];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Pay with card' },
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
    { id: 'cod', name: 'Cash on Delivery', icon: Wallet, description: 'Pay when you receive' },
  ];

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Demo: 95% success rate
    const paymentSuccess = Math.random() > 0.05;
    
    if (paymentSuccess) {
      const transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8).toUpperCase();
      
      onPaymentComplete({
        success: true,
        transactionId: transactionId,
        method: paymentMethod,
        amount: total,
        timestamp: new Date().toISOString()
      });
      toast.success(`Payment successful! Transaction ID: ${transactionId}`);
      onClose();
    } else {
      toast.error('Payment failed. Please try again.');
    }
    
    setProcessing(false);
  };

  const renderPaymentForm = () => {
    switch(paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="1234 5678 9012 3456"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Cardholder Name</label>
              <input
                type="text"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                <input
                  type="password"
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  maxLength="3"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );
      
      case 'upi':
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={e => setUpiId(e.target.value)}
              placeholder="username@bankname"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
            />
            <p className="mt-2 text-xs text-slate-500">Demo UPI: user@okhdfcbank, user@ybl, user@paytm</p>
          </div>
        );
      
      case 'netbanking':
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Bank</label>
            <select
              value={selectedBank}
              onChange={e => setSelectedBank(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-400 focus:outline-none"
            >
              <option value="">Select a bank</option>
              {banks.map(bank => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
        );
      
      case 'cod':
        return (
          <div className="rounded-lg bg-slate-50 p-4 text-center">
            <Wallet className="h-12 w-12 mx-auto text-slate-400 mb-3" />
            <p className="text-sm text-slate-600 font-medium">Pay with cash when your order is delivered</p>
            <p className="mt-2 text-xs text-slate-500">Free shipping on orders over $50</p>
            <p className="mt-1 text-xs text-slate-500">No extra charges for COD</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Payment Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Amount Display */}
        <div className="mb-6 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white">
          <p className="text-sm opacity-80">Total Amount</p>
          <p className="text-3xl font-bold">${total.toFixed(2)}</p>
        </div>

        {/* Payment Methods */}
        <div className="mb-6 space-y-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Payment Method</label>
          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map(method => {
              const IconComponent = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === method.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-5 w-5 ${paymentMethod === method.id ? 'text-primary-600' : 'text-slate-400'}`} />
                    <div>
                      <p className={`text-sm font-semibold ${paymentMethod === method.id ? 'text-primary-700' : 'text-slate-700'}`}>
                        {method.name}
                      </p>
                      <p className="text-xs text-slate-500">{method.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Form */}
        {renderPaymentForm()}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={processing}
            className="flex-1 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 text-white transition hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>
        </div>

        {/* Secure Payment Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
            🔒 Secure payment powered by RetailPOS
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;