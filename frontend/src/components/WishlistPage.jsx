import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { getWishlistItems, removeFromWishlist } from '../services/wishlistService';
import { addToCart } from '../services/cartService';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getWishlistItems());
  }, []);

  const handleRemove = id => setItems(removeFromWishlist(id));
  
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-white p-12 text-center shadow-xl">
            <div className="text-6xl mb-4">❤️</div>
            <h1 className="text-2xl font-semibold text-gray-900">Your wishlist is empty</h1>
            <p className="mt-3 text-gray-600">Save your favorite items here for later purchase.</p>
            <Link to="/products" className="mt-6 inline-block rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-3 text-white font-semibold">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">My Wishlist</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map(item => (
            <div key={item._id} className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${item._id}/400/300`} 
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-3 py-2 text-sm font-semibold text-white transition hover:shadow-lg flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="rounded-xl border border-gray-200 px-3 py-2 text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;