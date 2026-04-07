// src/components/BarcodeScanner.jsx
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const BarcodeScanner = ({ onProductFound, onClose }) => {
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scanning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [scanning]);

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim()) {
      // Simulate product lookup by barcode
      const products = JSON.parse(localStorage.getItem('posProducts') || '[]');
      const product = products.find(p => p.sku === barcode || p.barcode === barcode);
      
      if (product) {
        onProductFound(product);
        toast.success(`Product found: ${product.name}`);
        setBarcode('');
      } else {
        toast.error('Product not found');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">📷 Scan Barcode</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
        </div>
        
        <div className="mb-6 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-center text-white">
          <div className="text-6xl mb-3">📱</div>
          <p className="text-sm">Position barcode in front of camera</p>
          <p className="text-xs mt-2 opacity-75">Or enter barcode number manually</p>
        </div>

        <form onSubmit={handleBarcodeSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Barcode Number</label>
            <input
              ref={inputRef}
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Enter or scan barcode"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-mono focus:border-slate-400 focus:outline-none"
              autoFocus
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-white hover:bg-slate-800"
            >
              Search Product
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-xs text-slate-500">
          <p>Try these demo barcodes: PROD-0001, ELEC-0002, APPAREL-0003</p>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;