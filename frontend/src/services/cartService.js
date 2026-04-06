const CART_KEY = 'posCart';

const readCart = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
};

export const getCartItems = () => readCart();

export const addToCart = product => {
  const items = readCart();
  const existing = items.find(item => item._id === product._id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  return items;
};

export const removeFromCart = productId => {
  const items = readCart().filter(item => item._id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  return items;
};

export const updateCartQuantity = (productId, quantity) => {
  const items = readCart().map(item => item._id === productId ? { ...item, quantity } : item);
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  return items;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  return [];
};

export const getCartTotal = items => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
