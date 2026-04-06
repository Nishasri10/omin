const WISHLIST_KEY = 'posWishlist';

const readWishlist = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
};

export const getWishlistItems = () => readWishlist();

export const addToWishlist = product => {
  const items = readWishlist();
  if (!items.find(item => item._id === product._id)) {
    items.push(product);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }
  return items;
};

export const removeFromWishlist = productId => {
  const items = readWishlist().filter(item => item._id !== productId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  return items;
};

export const isInWishlist = productId => readWishlist().some(item => item._id === productId);
