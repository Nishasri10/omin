import productsData from '../data/products.js';

export const getStats = (req, res) => {
  const totalProducts = productsData.length;
  const lowStock = productsData.filter(p => p.stock < 20).length;
  const outOfStock = productsData.filter(p => p.stock === 0).length;
  const totalValue = productsData.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const categories = [...new Set(productsData.map(p => p.category))].length;
  const averageRating = (productsData.reduce((sum, p) => sum + parseFloat(p.rating), 0) / totalProducts).toFixed(1);
  
  const categoryMap = new Map();
  productsData.forEach(product => {
    categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
  });
  const categoryDistribution = Array.from(categoryMap.entries()).map(([name, count]) => ({ 
    name, 
    value: Math.round((count / totalProducts) * 100) 
  }));
  
  res.json({
    totalProducts,
    lowStock,
    outOfStock,
    totalValue,
    categories,
    averageRating,
    totalOrders: 1248,
    totalRevenue: 485000,
    pendingOrders: 12,
    deliveredOrders: 1180,
    categoryDistribution
  });
};

export const getRecentOrders = (req, res) => {
  const recentOrders = [
    { id: 'ORD-1001', customer: 'John Doe', amount: 299.99, status: 'delivered', date: new Date().toISOString() },
    { id: 'ORD-1002', customer: 'Jane Smith', amount: 159.50, status: 'shipped', date: new Date().toISOString() },
    { id: 'ORD-1003', customer: 'Mike Johnson', amount: 89.99, status: 'pending', date: new Date().toISOString() }
  ];
  res.json(recentOrders);
};

export const getSalesData = (req, res) => {
  const last7Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const salesData = [12500, 15200, 18400, 16700, 21000, 25600, 19800];
  const ordersData = [125, 152, 184, 167, 210, 256, 198];
  
  res.json({
    labels: last7Days,
    sales: salesData,
    orders: ordersData
  });
};

export const getInventoryStatus = (req, res) => {
  res.json({
    lowStock: [],
    outOfStock: [],
    totalLowStock: 0,
    totalOutOfStock: 0
  });
};