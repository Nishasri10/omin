import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Minus, Plus, ShoppingCart, Heart, Star, Truck, RotateCcw, Shield, ChevronLeft } from 'lucide-react';
import { addToCart } from '../../services/cartService';
import { addToWishlist, isInWishlist } from '../../services/wishlistService';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setInWishlist(isInWishlist(id));
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
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
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const imageUrl = `https://picsum.photos/id/${product.imageId || 100}/600/600`;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-5 w-5" />
          Back to Products
        </button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <img src={imageUrl} alt={product.name} className="h-[500px] w-full object-cover" />
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
                <div className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : '✗ Out of Stock'}
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary-600">${product.price}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xl text-gray-400 line-through">${product.originalPrice?.toFixed(0)}</span>
                      <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                        -{product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
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
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-xl hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4 font-semibold text-white transition hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="flex-1 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="rounded-2xl bg-white p-8 shadow-xl">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">Product Information</h3>
              
              <div className="grid gap-4 sm:grid-cols-3">
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
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">SKU:</span>
                    <span className="ml-2 text-gray-900">{product.sku}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Barcode:</span>
                    <span className="ml-2 text-gray-900">{product.barcode}</span>
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