// src/components/ProductDetailPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts } from '../services/api.js';
import { getProductById } from '../services/productCatalog.js';
import { addToCart } from '../services/cartService.js';
import { addToWishlist, isInWishlist } from '../services/wishlistService.js';
import BackButton from './BackButton.jsx';
import PaymentModal from './PaymentModal.jsx';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('posToken');
        const result = await fetchProducts(token);
        const matched = result.data.find(item => item._id === id);
        if (matched) {
          setProduct(matched);
          setWishlistStatus(isInWishlist(id));
        } else {
          const productItem = getProductById(id);
          setProduct(productItem);
          setWishlistStatus(isInWishlist(id));
        }
      } catch (err) {
        const productItem = getProductById(id);
        setProduct(productItem);
        setWishlistStatus(isInWishlist(id));
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity: quantity };
    addToCart(productWithQuantity);
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
  };

  const handleBuyNow = () => {
    setShowPayment(true);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setWishlistStatus(true);
    toast.success('Added to wishlist!');
  };

  const handlePaymentComplete = (paymentData) => {
    const productWithQuantity = { ...product, quantity: quantity };
    addToCart(productWithQuantity);
    
    const orders = JSON.parse(localStorage.getItem('posOrders') || '[]');
    orders.unshift({
      _id: 'order_' + Date.now(),
      orderNumber: 'ORD-' + String(orders.length + 1001),
      pricing: { total: product.price * quantity, subtotal: product.price * quantity, tax: (product.price * quantity * 0.1), shipping: 5 },
      status: 'confirmed',
      items: [{ ...product, quantity: quantity }],
      createdAt: new Date().toISOString(),
      paymentMethod: paymentData.method,
      transactionId: paymentData.transactionId,
      cashierId: { name: localStorage.getItem('userName') || 'Customer' }
    });
    localStorage.setItem('posOrders', JSON.stringify(orders));
    
    toast.success(`Order placed successfully! Transaction ID: ${paymentData.transactionId}`);
    setShowPayment(false);
    navigate('/orders');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-white p-10 shadow-xl text-center">
            <div className="animate-pulse">Loading product details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-100 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 shadow-xl text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Product Not Found</h2>
          <p className="mt-2 text-slate-600">The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/products')} className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-white">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = [
    `https://picsum.photos/id/${parseInt(product._id.split('_')[1]) || 100}/800/600`,
    `https://picsum.photos/id/${(parseInt(product._id.split('_')[1]) || 100) + 50}/800/600`,
    `https://picsum.photos/id/${(parseInt(product._id.split('_')[1]) || 100) + 100}/800/600`,
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6">
          <BackButton fallback="/products" label="← Back to catalog" />
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <img 
                src={images[activeImage]} 
                alt={product.name}
                className="h-[500px] w-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`rounded-xl overflow-hidden border-2 transition ${activeImage === idx ? 'border-slate-900' : 'border-transparent'}`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="h-20 w-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                    {product.category}
                  </span>
                  <h1 className="mt-4 text-3xl font-bold text-slate-900">{product.name}</h1>
                  <p className="mt-2 text-lg text-slate-600">{product.brand}</p>
                </div>
                <button
                  onClick={handleAddToWishlist}
                  disabled={wishlistStatus}
                  className="text-3xl transition hover:scale-110 disabled:opacity-50"
                >
                  {wishlistStatus ? '❤️' : '♡'}
                </button>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-2xl text-amber-500">★</span>
                  <span className="text-xl font-semibold text-slate-900">{product.rating}</span>
                  <span className="text-slate-500">({product.reviews} reviews)</span>
                </div>
                <div className="h-6 w-px bg-slate-300"></div>
                <div className={`font-semibold ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.quantity > 0 ? `✓ In Stock (${product.quantity} left)` : '✗ Out of Stock'}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900">${(product.price * quantity).toFixed(2)}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xl text-slate-400 line-through">${product.price.toFixed(2)}</span>
                      <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                        -{product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-xl hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="w-16 text-center text-xl font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-xl hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0}
                    className="flex-1 rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.quantity === 0}
                    className="flex-1 rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    💳 Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info Tabs */}
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <div className="border-b border-slate-200">
                <div className="flex gap-6">
                  <button className="border-b-2 border-slate-900 pb-3 font-semibold text-slate-900">Description</button>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-slate-600">
                <p>{product.description}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">SKU:</span>
                    <span>{product.sku}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Warranty:</span>
                    <span>1 Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          total={product.price * quantity}
          onClose={() => setShowPayment(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;