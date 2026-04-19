const ProductFilters = ({ filters, setFilters, categories, brands }) => {
  return (
    <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
      <div className="grid gap-6 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Min Price ($)</label>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) || 0 })}
            className="w-full rounded-xl border border-gray-200 px-4 py-2"
          />
        </div>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Max Price ($)</label>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) || 5000 })}
            className="w-full rounded-xl border border-gray-200 px-4 py-2"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setFilters({
            search: filters.search,
            category: 'All',
            brand: 'All',
            minPrice: 0,
            maxPrice: 5000,
            sortBy: filters.sortBy
          })}
          className="rounded-xl bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;