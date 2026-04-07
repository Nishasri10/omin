// src/components/CategoryBar.jsx
const categories = [
  { name: 'Electronics', icon: '📱', color: 'bg-blue-100' },
  { name: 'Apparel', icon: '👕', color: 'bg-pink-100' },
  { name: 'Footwear', icon: '👟', color: 'bg-green-100' },
  { name: 'Jewellery', icon: '💍', color: 'bg-purple-100' },
  { name: 'Home & Living', icon: '🏠', color: 'bg-orange-100' },
  { name: 'Beauty', icon: '💄', color: 'bg-rose-100' },
  { name: 'Sports', icon: '⚽', color: 'bg-indigo-100' },
  { name: 'Books', icon: '📚', color: 'bg-amber-100' },
  { name: 'Toys', icon: '🧸', color: 'bg-cyan-100' },
  { name: 'Groceries', icon: '🛒', color: 'bg-emerald-100' },
];

const CategoryBar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-600">Shop by Category</h3>
        <button 
          onClick={() => onSelectCategory('All')}
          className="text-xs text-slate-400 hover:text-slate-600"
        >
          View All →
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => onSelectCategory('All')}
          className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
            selectedCategory === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span className="text-xl">✨</span>
          <span className="text-xs font-medium">All</span>
        </button>
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
              selectedCategory === cat.name ? 'bg-slate-900 text-white' : `${cat.color} text-slate-700 hover:opacity-80`
            }`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className="text-xs font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;