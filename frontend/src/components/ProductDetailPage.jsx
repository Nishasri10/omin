// ProductDetailPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts } from '../services/api.js';
import { getProductById } from '../services/productCatalog.js';
import { addToCart } from '../services/cartService.js';
import { addToWishlist, isInWishlist } from '../services/wishlistService.js';
import BackButton from './BackButton.jsx';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const token = localStorage.getItem('posToken');
      try {
        const result = await fetchProducts(token);
        const matched = result.data.find(item => item._id === id);
        if (matched) {
          setProduct(matched);
          setWishlistStatus(isInWishlist(id));
          setLoading(false);
          return;
        }
      } catch (err) {
        // fallback to demo data when real products are unavailable
      }
      const productItem = getProductById(id);
      setProduct(productItem);
      setWishlistStatus(isInWishlist(id));
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-xl text-center">
          <p className="text-slate-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-100 py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-xl">
          <p className="text-slate-600">Product not found.</p>
          <button 
            onClick={() => navigate('/products')}
            className="mt-4 rounded-3xl bg-slate-900 px-5 py-3 text-white"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setMessage('Added to cart successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setWishlistStatus(true);
    setMessage('Added to wishlist');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6">
          <BackButton fallback="/products" label="Back to catalog" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl">
            <img src={`https://picsum.photos/seed/${product._id}-detail/900/600`} alt={product.name} className="h-[420px] w-full rounded-[1.5rem] object-cover" />
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">{product.category}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{product.brand || 'Generic'}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">SKU {product.sku}</span>
              </div>
              <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
              <p className="max-w-3xl text-slate-600">{product.description || 'A high-quality product perfect for your daily needs. Made with premium materials and designed for comfort and durability.'}</p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${product.quantity > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {product.quantity > 0 ? `In stock: ${product.quantity}` : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {message && (
              <div className="rounded-3xl bg-sky-50 px-5 py-4 text-sky-700 shadow-sm animate-in fade-in slide-in-from-top-2">
                {message}
              </div>
            )}
            <div className="rounded-[2rem] bg-white p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-slate-900">Purchase options</h2>
              <div className="mt-6 space-y-4">
                <button 
                  onClick={handleAddToCart} 
                  disabled={product.quantity === 0}
                  className="w-full rounded-3xl bg-slate-900 px-5 py-4 text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.quantity === 0 ? 'Out of stock' : 'Add to cart'}
                </button>
                <button 
                  onClick={handleAddToWishlist} 
                  disabled={wishlistStatus} 
                  className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {wishlistStatus ? 'Added to wishlist' : 'Add to wishlist'}
                </button>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-slate-900">Product details</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>Category: <span className="font-medium text-slate-900">{product.category}</span></li>
                <li>Material: Premium blend fabric</li>
                <li>Delivery: 2-5 business days</li>
                <li>Return policy: 14-day easy returns</li>
                <li>Warranty: 1 year manufacturer warranty</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;