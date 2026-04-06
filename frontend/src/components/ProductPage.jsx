// src/components/ProductPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api.js';
import { getProducts, searchProducts } from '../services/productCatalog.js';
import { addToCart } from '../services/cartService.js';
import { addToWishlist, getWishlistItems } from '../services/wishlistService.js';
import BackButton from './BackButton.jsx';
import PaymentModal from './PaymentModal.jsx';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [feedback, setFeedback] = useState('');
  const [wishlistMap, setWishlistMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('posToken');
        const result = await fetchProducts(token);
        setProducts(result.data);
      } catch (err) {
        console.log('Using demo products');
        setError(err.response?.data?.message || 'Unable to load products from server. Showing demo products.');
      } finally {
        setLoading(false);
      }
    };
    load();
    setWishlistMap(Object.fromEntries(getWishlistItems().map(item => [item._id, true])));
  }, []);

  const allProducts = useMemo(() => {
    if (products.length > 0) return products;
    return getProducts(); // Returns 120+ products
  }, [products]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allProducts.map(product => product.category || 'Other')));
    return ['All', ...uniqueCategories];
  }, [allProducts]);

  const filtered = useMemo(() => {
    let result = allProducts;
    
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (search) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase()) ||
        product.sku?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return result;
  }, [allProducts, search, selectedCategory]);

  const isUsingDemo = products.length === 0;

  const handleAddToCart = (product) => {
    addToCart(product);
    setFeedback(`✅ Added ${product.name} to cart.`);
    setTimeout(() => setFeedback(''), 2500);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setWishlistMap(prev => ({ ...prev, [product._id]: true }));
    setFeedback(`❤️ Saved ${product.name} to wishlist.`);
    setTimeout(() => setFeedback(''), 2500);
  };

  const handleBuyNow = (product) => {
    if (product.quantity === 0) {
      setFeedback(`❌ ${product.name} is out of stock!`);
      setTimeout(() => setFeedback(''), 2500);
      return;
    }
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentData) => {
    // Add to cart first
    addToCart(selectedProduct);
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('posOrders') || '[]');
    orders.unshift({
      _id: 'order_' + Date.now(),
      orderNumber: 'ORD-' + String(orders.length + 1001),
      pricing: { total: selectedProduct.price },
      status: 'pending',
      items: [{ ...selectedProduct, quantity: 1 }],
      createdAt: new Date().toISOString(),
      paymentMethod: paymentData.method,
      transactionId: paymentData.transactionId,
      cashierId: { name: localStorage.getItem('userName') || 'Customer' }
    });
    localStorage.setItem('posOrders', JSON.stringify(orders));
    
    setFeedback(`🎉 Order placed successfully! Transaction ID: ${paymentData.transactionId}`);
    setTimeout(() => setFeedback(''), 5000);
    setShowPayment(false);
  };

  const handleView = (productId) => navigate(`/product/${productId}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading {allProducts.length} products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="mb-6 flex flex-col gap-4 rounded-[2rem] bg-white p-8 shadow-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-4">
              <BackButton fallback="/dashboard" label="← Back to dashboard" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-900">🛍️ Product Catalog</h1>
            <p className="mt-2 text-slate-500">
              Browse <span className="font-semibold text-slate-900">{allProducts.length}+ products</span> across all categories. 
              Shop, wishlist, or buy instantly.
            </p>
          </div>
          <div className="w-full sm:w-80">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search by name, brand, or SKU..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'bg-white text-slate-700 shadow-sm hover:bg-slate-100'
              }`}
            >
              {category} {category !== 'All' && `(${allProducts.filter(p => p.category === category).length})`}
            </button>
          ))}
        </div>

        {/* Demo Notice */}
        {isUsingDemo && !error && (
          <div className="mb-6 rounded-[2rem] bg-sky-50 px-6 py-4 text-sky-900 shadow-sm border border-sky-200">
            <p className="text-sm flex items-center gap-2">
              <span>✨</span> 
              Showing <strong>{allProducts.length} demo products</strong> with Lorem Picsum images. 
              Connect your backend for real products.
            </p>
          </div>
        )}
        
        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 px-5 py-4 text-red-700 shadow-sm border border-red-200">
            ⚠️ {error}
          </div>
        )}
        
        {feedback && (
          <div className="mb-6 rounded-2xl bg-emerald-50 px-5 py-4 text-emerald-700 shadow-sm animate-in fade-in slide-in-from-top-2 border border-emerald-200">
            {feedback}
          </div>
        )}

        {/* Products Grid - 100+ Products */}
        {filtered.length === 0 ? (
          <div className="col-span-full rounded-[2rem] bg-white p-12 text-center shadow-xl">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-slate-900">No products found</p>
            <p className="mt-3 text-slate-600">
              No products match your search "{search}" in category "{selectedCategory}".
            </p>
            <button 
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
              className="mt-4 rounded-3xl bg-slate-900 px-6 py-2 text-white hover:bg-slate-800"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product, index) => {
                // Generate unique Lorem Picsum image for each product
                const imageId = (parseInt(product._id.split('_')[1]) || index) + 100;
                const imageUrl = `https://picsum.photos/id/${imageId}/400/300`;
                
                return (
                  <div key={product._id} className="group overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                    {/* Product Image */}
                    <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => handleView(product._id)}>
                      <img 
                        src={imageUrl} 
                        alt={product.name} 
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = `https://picsum.photos/id/${(index % 200) + 1}/400/300`;
                        }}
                      />
                      {product.discount > 0 && (
                        <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                          -{product.discount}% OFF
                        </span>
                      )}
                      {product.quantity < 10 && product.quantity > 0 && (
                        <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                          ⚡ Low Stock
                        </span>
                      )}
                      {product.quantity === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                          <span className="text-white font-bold text-lg px-3 py-1 rounded-full bg-red-500">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                          {product.brand}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-amber-500">★</span>
                          <span className="text-sm text-slate-600">{product.rating}</span>
                          <span className="text-xs text-slate-400">({product.reviews})</span>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-slate-900 line-clamp-1 text-lg">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                          {product.discount > 0 && (
                            <span className="ml-2 text-sm text-slate-400 line-through">
                              ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          product.quantity > 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                        }`}>
                          {product.quantity > 0 ? `${product.quantity} in stock` : 'Sold out'}
                        </span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={() => handleAddToCart(product)} 
                          disabled={product.quantity === 0}
                          className="flex-1 rounded-full bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        >
                          🛒 Add
                        </button>
                        <button 
                          onClick={() => handleBuyNow(product)} 
                          disabled={product.quantity === 0}
                          className="flex-1 rounded-full bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        >
                          💳 Buy
                        </button>
                        <button
                          onClick={() => handleAddToWishlist(product)}
                          disabled={wishlistMap[product._id]}
                          className="rounded-full border border-slate-200 bg-white px-3 py-2.5 text-lg font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                          title={wishlistMap[product._id] ? 'In Wishlist' : 'Add to Wishlist'}
                        >
                          {wishlistMap[product._id] ? '❤️' : '♡'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Pagination Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of{' '}
                <span className="font-semibold text-slate-900">{allProducts.length}</span> products
              </p>
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="mt-2 text-sm text-sky-600 hover:text-sky-700"
                >
                  Clear search
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showPayment && selectedProduct && (
        <PaymentModal
          total={selectedProduct.price}
          onClose={() => setShowPayment(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default ProductPage;