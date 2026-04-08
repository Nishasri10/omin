import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productCatalog';
import { addToCart } from '../services/cartService';
import { addToWishlist, isInWishlist } from '../services/wishlistService';
import { Minus, Plus, ShoppingCart, Heart, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const productItem = getProductById(id);
      setProduct(productItem);
      setInWishlist(isInWishlist(id));
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity: quantity };
    addToCart(productWithQuantity);
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setInWishlist(true);
    toast.success('Added to wishlist!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white p-10 text-center shadow-xl">
            <div className="animate-pulse">Loading product details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-900">Product Not Found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/products')} className="mt-6 rounded-xl bg-primary-600 px-6 py-3 text-white">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = [
    `https://picsum.photos/id/${parseInt(product._id.split('_')[1]) || 100}/600/600`,
    `https://picsum.photos/id/${(parseInt(product._id.split('_')[1]) || 100) + 50}/600/600`,
    `https://picsum.photos/id/${(parseInt(product._id.split('_')[1]) || 100) + 100}/600/600`,
  ];

  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-6">
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
                  className={`rounded-xl overflow-hidden border-2 transition ${activeImage === idx ? 'border-primary-600' : 'border-transparent'}`}
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
                  <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                    {product.category}
                  </span>
                  <h1 className="mt-4 text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="mt-2 text-lg text-gray-600">{product.brand}</p>
                </div>
                <button
                  onClick={handleAddToWishlist}
                  disabled={inWishlist}
                  className="text-3xl transition hover:scale-110 disabled:opacity-50"
                >
                  {inWishlist ? '❤️' : '♡'}
                </button>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-xl font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className={`font-semibold ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.quantity > 0 ? `✓ In Stock (${product.quantity} left)` : '✗ Out of Stock'}
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary-600">${discountedPrice.toFixed(2)}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xl text-gray-400 line-through">${product.price.toFixed(2)}</span>
                      <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                        -{product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-xl hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-16 text-center text-xl font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-xl hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0}
                    className="flex-1 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4 font-semibold text-white transition hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.quantity === 0}
                    className="flex-1 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <Truck className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders over $100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <RotateCcw className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">30 Days Return</p>
                    <p className="text-xs text-gray-500">Easy returns policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <Shield className="h-6 w-6 text-primary-600" />
                  <div>
                    <p className="font-semibold text-gray-900">2 Year Warranty</p>
                    <p className="text-xs text-gray-500">Manufacturer warranty</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;