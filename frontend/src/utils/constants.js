export const CATEGORIES = [
  'Electronics',
  'Apparel',
  'Jewellery',
  'Home & Living',
  'Beauty',
  'Sports',
  'Books',
  'Toys',
  'Groceries',
  'Furniture',
  'Automotive',
  'Pet Supplies',
  'Office Supplies',
  'Musical Instruments',
  'Gaming',
  'Health',
  'Baby Care',
  'Travel',
  'Tools'
];

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A-Z' }
];

export const PAYMENT_METHODS = [
  { id: 'cod', name: 'Cash on Delivery', icon: '💰' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' }
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const SHIPPING_COST = 10;
export const FREE_SHIPPING_THRESHOLD = 100;
export const TAX_RATE = 0.1;