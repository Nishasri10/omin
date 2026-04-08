import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, searchProducts, getNewArrivals, getTopRated, getTrendingProducts } from '../services/productCatalog.js';
import { addToCart } from '../services/cartService.js';
import { addToWishlist, getWishlistItems } from '../services/wishlistService.js';
import { Filter, Grid3x3, List, ChevronDown, Star, TrendingUp, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlistMap, setWishlistMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 24;
  
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const allProducts = getProducts();
        setProducts(allProducts);
      } catch (err) {
        console.error('Error loading products:', err);
        toast.error('Error loading products');
      } finally {
        setLoading(false);
      }
    };
    load();
    setWishlistMap(Object.fromEntries(getWishlistItems().map(item => [item._id, true])));
  }, []);

  const allProducts = products;
  const newArrivals = useMemo(() => getNewArrivals(30), []);
  const topRated = useMemo(() => getTopRated(30), []);
  const trending = useMemo(() => getTrendingProducts(30), []);

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
    
    result = result.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
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
    } else if (sortBy === 'popularity') {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    }
    
    return result;
  };

  const filtered = useMemo(() => getDisplayProducts(), [allProducts, search, selectedCategory, activeTab, sortBy, priceRange]);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);
  
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const categories = useMemo(() => {
    const cats = [...new Set(allProducts.map(p => p.category))];
    return ['All', ...cats];
  }, [allProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`✅ Added ${product.name} to cart!`, {
      icon: '🛒',
      style: { background: '#10b981', color: '#fff' }
    });
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setWishlistMap(prev => ({ ...prev, [product._id]: true }));
    toast.success(`❤️ Saved ${product.name} to wishlist!`);
  };

  const handleView = (productId) => navigate(`/product/${productId}`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 text-center shadow-xl">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading {allProducts.length} amazing products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 p-8 text-white shadow-2xl">
          <h1 className="text-4xl font-bold">🛍️ Premium Product Catalog</h1>
          <p className="mt-2 text-white/90">Discover {allProducts.length}+ products from top brands</p>
          <div className="mt-6 flex max-w-md">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search products by name, brand, or SKU..."
              className="flex-1 rounded-l-xl border-0 px-5 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white"
            />
            <button className="rounded-r-xl bg-white/20 px-6 py-3 font-semibold backdrop-blur-sm transition hover:bg-white/30">
              Search
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
          {[
            { id: 'all', label: '🔥 All Products', icon: <Sparkles className="h-4 w-4" /> },
            { id: 'new', label: '🆕 New Arrivals', icon: <Sparkles className="h-4 w-4" /> },
            { id: 'top', label: '⭐ Top Rated', icon: <Star className="h-4 w-4" /> },
            { id: 'trending', label: '📈 Trending', icon: <TrendingUp className="h-4 w-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'border-b-2 border-primary-600 text-primary-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-gray-700 shadow-sm hover:shadow-md"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <div className="flex gap-1 rounded-xl bg-white p-1 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-lg p-2 transition ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-500'}`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-lg p-2 transition ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-500'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="default">Default</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name A-Z</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Price Range</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 5000 }))}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => { setPriceRange({ min: 0, max: 5000 }); setSelectedCategory('All'); setSortBy('default'); }}
                  className="rounded-xl bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-xl">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-gray-900">No products found</p>
            <p className="mt-3 text-gray-600">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
                setActiveTab('all');
                setPriceRange({ min: 0, max: 5000 });
              }}
              className="mt-4 rounded-xl bg-primary-600 px-6 py-2 text-white hover:bg-primary-700"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                : 'grid-cols-1'
            }`}>
              {paginatedProducts.map((product, index) => {
                const imageId = (parseInt(product._id.split('_')[1]) || index) % 300;
                const imageUrl = `https://picsum.photos/id/${imageId + 1}/400/300`;
                
                if (viewMode === 'grid') {
                  return (
                    <div key={product._id} className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                      <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => handleView(product._id)}>
                        <img 
                          src={imageUrl} 
                          alt={product.name} 
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
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
                      </div>
                      <div className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500">{product.brand}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
                          {product.discount > 0 && (
                            <span className="text-sm text-gray-400 line-through">
                              ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button 
                            onClick={() => handleAddToCart(product)} 
                            className="flex-1 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-2 text-sm font-semibold text-white transition hover:shadow-lg"
                          >
                            🛒 Add
                          </button>
                          <button
                            onClick={() => handleAddToWishlist(product)}
                            disabled={wishlistMap[product._id]}
                            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-lg font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            {wishlistMap[product._id] ? '❤️' : '♡'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={product._id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-lg transition-all hover:shadow-xl">
                      <img src={imageUrl} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.brand} • {product.category}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
                            {product.discount > 0 && (
                              <p className="text-xs text-gray-400 line-through">
                                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm">{product.rating}</span>
                            <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                          </div>
                          <span className={`text-xs ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}
                          </span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => handleAddToCart(product)} className="rounded-xl bg-primary-600 px-4 py-1.5 text-sm text-white hover:bg-primary-700">
                            Add to Cart
                          </button>
                          <button onClick={() => handleView(product._id)} className="rounded-xl border border-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                >
                  ← Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`rounded-xl px-4 py-2 transition ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 disabled:opacity-50 hover:bg-gray-50"
                >
                  Next →
                </button>
              </div>
            )}
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{paginatedProducts.length}</span> of{' '}
                <span className="font-semibold text-gray-900">{filtered.length}</span> products
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;