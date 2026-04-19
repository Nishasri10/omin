import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import { Filter, Grid3x3, List, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    brand: 'All',
    minPrice: 0,
    maxPrice: 5000,
    sortBy: 'default'
  });
  
  const itemsPerPage = 50;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products?limit=200');
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];
    
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.brand.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.brand !== 'All') {
      filtered = filtered.filter(p => p.brand === filters.brand);
    }
    
    filtered = filtered.filter(p => 
      p.price >= filters.minPrice && p.price <= filters.maxPrice
    );
    
    if (filters.sortBy === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  const brands = useMemo(() => {
    const brandList = ['All', ...new Set(products.map(p => p.brand))];
    return brandList.slice(0, 20);
  }, [products]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading 150+ products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-white">
          <h1 className="text-3xl font-bold">🛍️ Premium Product Catalog</h1>
          <p className="mt-2 text-white/90">Discover {filteredProducts.length}+ products from top brands</p>
          <div className="mt-4 flex max-w-md">
            <input
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="🔍 Search products by name or brand..."
              className="flex-1 rounded-l-xl border-0 px-5 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-white"
            />
            <button className="rounded-r-xl bg-white/20 px-6 py-3 font-semibold backdrop-blur-sm transition hover:bg-white/30">
              Search
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-gray-700 shadow-sm"
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
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm"
            >
              <option value="default">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            brands={brands}
          />
        )}

        {/* Products Grid/List */}
        {paginatedProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-gray-900">No products found</p>
            <p className="mt-3 text-gray-600">Try adjusting your filters</p>
            <button 
              onClick={() => setFilters({ search: '', category: 'All', brand: 'All', minPrice: 0, maxPrice: 5000, sortBy: 'default' })}
              className="mt-4 rounded-xl bg-primary-600 px-6 py-2 text-white"
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
              {paginatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 disabled:opacity-50"
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
                          : 'border border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-gray-700 disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            )}
            
            <div className="mt-4 text-center text-sm text-gray-500">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;