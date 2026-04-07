// src/components/ProductPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api.js';
import { getProducts, searchProducts, getNewArrivals, getTopRated, getTrendingProducts } from '../services/productCatalog.js';
import { addToCart } from '../services/cartService.js';
import { addToWishlist, getWishlistItems } from '../services/wishlistService.js';
import BackButton from './BackButton.jsx';
import PaymentModal from './PaymentModal.jsx';
import CategoryBar from './CategoryBar.jsx';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlistMap, setWishlistMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const itemsPerPage = 20;
  
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
        setError('Showing demo products. Connect backend for real data.');
      } finally {
        setLoading(false);
      }
    };
    load();
    setWishlistMap(Object.fromEntries(getWishlistItems().map(item => [item._id, true])));
  }, []);

  const allProducts = useMemo(() => {
    if (products.length > 0) return products;
    return getProducts();
  }, [products]);

  const newArrivals = useMemo(() => getNewArrivals(20), []);
  const topRated = useMemo(() => getTopRated(20), []);
  const trending = useMemo(() => getTrendingProducts(20), []);

  const getDisplayProducts = () => {
    let result = [];
    if (activeTab === 'all') {
      result = allProducts;
    } else if (activeTab === 'new') {
      result = newArrivals;
    } else if (activeTab === 'top') {
      result = topRated;
    } else if (activeTab === 'trending') {
      result = trending;
    }
    
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
    
    if (sortBy === 'price_low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return result;
  };

  const filtered = useMemo(() => getDisplayProducts(), [allProducts, search, selectedCategory, activeTab, sortBy]);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);
  
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`✅ Added ${product.name} to cart!`);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setWishlistMap(prev => ({ ...prev, [product._id]: true }));
    toast.success(`❤️ Saved ${product.name} to wishlist!`);
  };

  const handleBuyNow = (product) => {
    if (product.quantity === 0) {
      toast.error(`❌ ${product.name} is out of stock!`);
      return;
    }
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentData) => {
    addToCart(selectedProduct);
    
    const orders = JSON.parse(localStorage.getItem('posOrders') || '[]');
    orders.unshift({
      _id: 'order_' + Date.now(),
      orderNumber: 'ORD-' + String(orders.length + 1001),
      pricing: { total: selectedProduct.price, subtotal: selectedProduct.price, tax: selectedProduct.price * 0.1, shipping: 5 },
      status: 'confirmed',
      items: [{ ...selectedProduct, quantity: 1 }],
      createdAt: new Date().toISOString(),
      paymentMethod: paymentData.method,
      transactionId: paymentData.transactionId,
      cashierId: { name: localStorage.getItem('userName') || 'Customer' }
    });
    localStorage.setItem('posOrders', JSON.stringify(orders));
    
    toast.success(`🎉 Order placed successfully! Transaction ID: ${paymentData.transactionId}`);
    setShowPayment(false);
    navigate('/orders');
  };

  const handleView = (productId) => navigate(`/product/${productId}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
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
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-xl sm:flex-row sm:items-center sm:justify-between">
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
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-6 flex gap-2 border-b border-slate-200">
          <button
            onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'all' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            🔥 All Products
          </button>
          <button
            onClick={() => { setActiveTab('new'); setCurrentPage(1); }}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'new' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            🆕 New Arrivals
          </button>
          <button
            onClick={() => { setActiveTab('top'); setCurrentPage(1); }}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'top' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            ⭐ Top Rated
          </button>
          <button
            onClick={() => { setActiveTab('trending'); setCurrentPage(1); }}
            className={`px-6 py-3 font-semibold transition ${activeTab === 'trending' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            📈 Trending
          </button>
        </div>

        {/* Sort and Filter Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <CategoryBar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:outline-none"
            >
              <option value="default">Default</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Demo Notice */}
        {products.length === 0 && !error && (
          <div className="mb-6 rounded-xl bg-sky-50 px-6 py-4 text-sky-900 shadow-sm border border-sky-200">
            <p className="text-sm flex items-center gap-2">
              <span>✨</span> 
              Showing <strong>{allProducts.length} demo products</strong>. Connect your backend for real products.
            </p>
          </div>
        )}
        
        {error && (
          <div className="mb-6 rounded-xl bg-amber-50 px-5 py-4 text-amber-700 shadow-sm border border-amber-200">
            ⚠️ {error}
          </div>
        )}

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-xl">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-slate-900">No products found</p>
            <p className="mt-3 text-slate-600">
              No products match your search "{search}" in category "{selectedCategory}".
            </p>
            <button 
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setActiveTab('all');
              }}
              className="mt-4 rounded-xl bg-slate-900 px-6 py-2 text-white hover:bg-slate-800"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {paginatedProducts.map((product, index) => {
                const imageId = (parseInt(product._id.split('_')[1]) || index) % 1000;
                const imageUrl = `https://picsum.photos/id/${imageId}/400/300`;
                
                return (
                  <div key={product._id} className="group overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
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
                          {product.quantity > 0 ? `${product.quantity} left` : 'Sold out'}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <button 
                          onClick={() => handleAddToCart(product)} 
                          disabled={product.quantity === 0}
                          className="flex-1 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        >
                          🛒 Add
                        </button>
                        <button 
                          onClick={() => handleBuyNow(product)} 
                          disabled={product.quantity === 0}
                          className="flex-1 rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        >
                          💳 Buy
                        </button>
                        <button
                          onClick={() => handleAddToWishlist(product)}
                          disabled={wishlistMap[product._id]}
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-lg font-semibold text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 disabled:opacity-50 hover:bg-slate-50"
                >
                  ← Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`rounded-xl px-4 py-2 transition ${
                          currentPage === pageNum
                            ? 'bg-slate-900 text-white'
                            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 disabled:opacity-50 hover:bg-slate-50"
                >
                  Next →
                </button>
              </div>
            )}
            
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-500">
                Showing <span className="font-semibold text-slate-900">{paginatedProducts.length}</span> of{' '}
                <span className="font-semibold text-slate-900">{filtered.length}</span> products
              </p>
            </div>
          </>
        )}
      </div>

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