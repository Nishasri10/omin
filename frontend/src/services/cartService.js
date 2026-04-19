const CART_KEY = 'posCart';

const readCart = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
};

const dispatchCartEvent = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

export const getCartItems = () => readCart();

export const addToCart = (product) => {
  const items = readCart();
  const existing = items.find(item => item.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + (product.quantity || 1);
  } else {
    items.push({ ...product, quantity: product.quantity || 1 });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  dispatchCartEvent();
  return items;
};

export const removeFromCart = (productId) => {
  const items = readCart().filter(item => item.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  dispatchCartEvent();
  return items;
};

export const updateCartQuantity = (productId, quantity) => {
  const items = readCart().map(item => item.id === productId ? { ...item, quantity } : item);
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  dispatchCartEvent();
  return items;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  dispatchCartEvent();
  return [];
};

export const getCartTotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const getCartCount = () => readCart().reduce((sum, item) => sum + item.quantity, 0);