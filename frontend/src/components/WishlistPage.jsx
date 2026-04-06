// WishlistPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton.jsx';
import { getWishlistItems, removeFromWishlist } from '../services/wishlistService.js';

const WishlistPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getWishlistItems());
  }, []);

  const handleRemove = id => setItems(removeFromWishlist(id));

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-xl">
            <BackButton fallback="/products" label="Back to products" />
            <div className="mt-5">
              <h1 className="text-3xl font-semibold text-slate-900">Wishlist</h1>
              <p className="text-sm text-slate-500">Keep track of items you want to buy later.</p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-xl">
            <p className="text-xl font-semibold text-slate-900">Your wishlist is empty.</p>
            <p className="mt-3 text-slate-600">Add products from the catalog so you can save them for later.</p>
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
        <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-xl">
          <BackButton fallback="/products" label="Back to products" />
          <div className="mt-5">
            <h1 className="text-3xl font-semibold text-slate-900">Wishlist</h1>
            <p className="text-sm text-slate-500">Keep track of items you want to buy later.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map(item => (
            <div key={item._id} className="rounded-[2rem] bg-white p-6 shadow-xl transition hover:shadow-2xl">
              <div className="flex items-start gap-4">
                <img src={`https://picsum.photos/seed/${item._id}-wish/260/260`} alt={item.name} className="h-24 w-24 rounded-3xl object-cover" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                  <p className="mt-2 text-sm text-slate-500">{item.category}</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button 
                  onClick={() => handleRemove(item._id)} 
                  className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  Remove
                </button>
                <Link 
                  to={`/product/${item._id}`} 
                  className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;