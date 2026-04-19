import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ============ DATA ============
// Generate 100 products
const products = [];
for (let i = 1; i <= 100; i++) {
  const categories = ['Electronics', 'Apparel', 'Jewellery', 'Home & Living', 'Beauty', 'Sports', 'Books'];
  const category = categories[i % categories.length];
  const price = 29 + (i * 7) % 500;
  const rating = (3.5 + (i % 15) / 10).toFixed(1);
  
  products.push({
    id: i,
    name: `${category} Product ${i}`,
    category: category,
    brand: ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG', 'Bose'][i % 7],
    price: price,
    originalPrice: price + Math.floor(price * 0.2),
    discount: Math.floor(Math.random() * 30),
    rating: parseFloat(rating),
    reviews: Math.floor(10 + Math.random() * 1000),
    stock: Math.floor(10 + Math.random() * 200),
    imageId: 100 + i,
    description: `This is a premium ${category.toLowerCase()} product. High quality and durable. Perfect for your needs.`,
    sku: `${category.substring(0, 3).toUpperCase()}-${String(i).padStart(5, '0')}`,
    createdAt: new Date().toISOString()
  });
}

// Users storage
const users = new Map();

// Add demo users
users.set('admin@retailpos.com', {
  id: '1',
  name: 'Admin User',
  email: 'admin@retailpos.com',
  password: 'admin123',
  role: 'admin'
});

users.set('demo@example.com', {
  id: '2',
  name: 'Demo User',
  email: 'demo@example.com',
  password: 'demo123',
  role: 'user'
});

// Orders storage
let orders = [];
let orderCounter = 1000;

// ============ MIDDLEWARE ============
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, 'mysecretkey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// ============ AUTH ROUTES ============
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  
  if (users.has(email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const newUser = {
    id: String(users.size + 1),
    name,
    email,
    password,
    role: 'user'
  };
  
  users.set(email, newUser);
  
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
    'mysecretkey',
    { expiresIn: '7d' }
  );
  
  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const user = users.get(email);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    'mysecretkey',
    { expiresIn: '7d' }
  );
  
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// ============ PRODUCT ROUTES ============
app.get('/api/products', (req, res) => {
  const { page = 1, limit = 50, category } = req.query;
  
  let filteredProducts = [...products];
  
  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  const start = (parseInt(page) - 1) * parseInt(limit);
  const paginatedProducts = filteredProducts.slice(start, start + parseInt(limit));
  
  res.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredProducts.length / parseInt(limit)),
    totalProducts: products.length
  });
});

app.get('/api/products/featured', (req, res) => {
  const featured = products.slice(0, 50);
  res.json(featured);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category;
  const filtered = products.filter(p => p.category === category);
  res.json(filtered);
});

app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.json(products);
  }
  
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase()) ||
    p.brand.toLowerCase().includes(q.toLowerCase())
  );
  res.json(filtered);
});

// ============ ORDER ROUTES ============
app.post('/api/orders', auth, (req, res) => {
  const { items, total, paymentMethod } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Order must have items' });
  }
  
  const order = {
    id: `ORD-${++orderCounter}`,
    userId: req.user.id,
    items,
    total,
    paymentMethod,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.unshift(order);
  res.status(201).json(order);
});

app.get('/api/orders/my-orders', auth, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json(userOrders);
});

// ============ DASHBOARD ROUTES ============
app.get('/api/dashboard/stats', auth, (req, res) => {
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock < 20).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const categories = [...new Set(products.map(p => p.category))].length;
  const averageRating = (products.reduce((sum, p) => sum + p.rating, 0) / totalProducts).toFixed(1);
  
  // Category distribution
  const categoryMap = new Map();
  products.forEach(p => {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
  });
  const categoryDistribution = Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    value: Math.round((count / totalProducts) * 100)
  }));
  
  res.json({
    totalProducts,
    lowStock,
    totalValue,
    categories,
    averageRating,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length,
    categoryDistribution
  });
});

app.get('/api/dashboard/sales-data', auth, (req, res) => {
  const last7Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const salesData = [12500, 15200, 18400, 16700, 21000, 25600, 19800];
  const ordersData = [125, 152, 184, 167, 210, 256, 198];
  
  res.json({
    labels: last7Days,
    sales: salesData,
    orders: ordersData
  });
});

app.get('/api/dashboard/recent-orders', auth, (req, res) => {
  const recentOrders = orders.slice(0, 5).map(o => ({
    id: o.id,
    customer: o.userId === '1' ? 'John Doe' : 'Jane Smith',
    amount: o.total,
    status: o.status,
    date: o.createdAt
  }));
  
  res.json(recentOrders);
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running', 
    products: products.length,
    users: users.size,
    orders: orders.length
  });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 Total Products: ${products.length}`);
  console.log(`👥 Demo Users: ${users.size}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api\n`);
  console.log('Demo Credentials:');
  console.log('  Admin: admin@retailpos.com / admin123');
  console.log('  Demo: demo@example.com / demo123\n');
});