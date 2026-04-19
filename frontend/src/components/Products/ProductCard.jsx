import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { addToCart } from '../../services/cartService';
import { addToWishlist, isInWishlist } from '../../services/wishlistService';
import toast from 'react-hot-toast';
import { useState } from 'react';

const ProductCard = ({ product, index, viewMode }) => {
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id));

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setInWishlist(true);
    toast.success('Added to wishlist!');
  };

  const imageUrl = `https://picsum.photos/id/${product.imageId || (100 + index)}/400/300`;

  if (viewMode === 'list') {
    return (
      <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-lg hover:shadow-xl transition">
        <img src={imageUrl} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 hover:text-primary-600">{product.name}</h3>
              </Link>
              <p className="text-sm text-gray-500">{product.brand} • {product.category}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-primary-600">${product.price}</span>
              {product.discount > 0 && (
                <p className="text-xs text-gray-400 line-through">${product.originalPrice?.toFixed(0)}</p>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="text-sm">{product.rating}</span>
            </div>
            <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={handleAddToCart} className="rounded-xl bg-primary-600 px-4 py-1.5 text-sm text-white hover:bg-primary-700">
              Add to Cart
            </button>
            <button onClick={handleAddToWishlist} className="rounded-xl border border-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              {inWishlist ? '❤️ Saved' : '♡ Save'}
            </button>
            <Link to={`/product/${product.id}`} className="rounded-xl border border-gray-200 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-56 overflow-hidden">
          <img 
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
          {product.discount > 0 && (
            <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              -{product.discount}% OFF
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs font-bold text-white">
              ⚡ Low Stock
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-1 hover:text-primary-600">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">${product.price}</span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice?.toFixed(0)}
            </span>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <button 
            onClick={handleAddToCart} 
            className="flex-1 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-2 text-sm font-semibold text-white transition hover:shadow-lg"
          >
            🛒 Add
          </button>
          <button
            onClick={handleAddToWishlist}
            disabled={inWishlist}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-lg font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            {inWishlist ? '❤️' : '♡'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;