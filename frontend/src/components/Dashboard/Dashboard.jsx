import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';
import { 
  Package, TrendingUp, ShoppingBag, Star, DollarSign, AlertCircle, 
  Users, ShoppingCart, Truck, CheckCircle, Clock, Zap 
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
    categories: 0,
    averageRating: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });
  const [salesData, setSalesData] = useState({ labels: [], sales: [], orders: [] });
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('posToken');
        const headers = { Authorization: `Bearer ${token}` };
        
        const [statsRes, salesRes, productsRes, ordersRes] = await Promise.all([
          axios.get('/api/dashboard/stats', { headers }),
          axios.get('/api/dashboard/sales-data', { headers }),
          axios.get('/api/products/featured'),
          axios.get('/api/dashboard/recent-orders', { headers })
        ]);
        
        setStats(statsRes.data);
        setSalesData(salesRes.data);
        setFeaturedProducts(productsRes.data.slice(0, 12));
        setRecentOrders(ordersRes.data);
        
        // Prepare category data for pie chart
        if (statsRes.data.categoryDistribution) {
          setCategoryData(statsRes.data.categoryDistribution);
        } else {
          // Fallback data
          setCategoryData([
            { name: 'Electronics', value: 35, color: '#3b82f6' },
            { name: 'Apparel', value: 25, color: '#8b5cf6' },
            { name: 'Home & Living', value: 15, color: '#10b981' },
            { name: 'Jewellery', value: 10, color: '#f59e0b' },
            { name: 'Beauty', value: 8, color: '#ef4444' },
            { name: 'Others', value: 7, color: '#06b6d4' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
        // Set fallback data
        setStats({
          totalProducts: 160,
          lowStock: 23,
          outOfStock: 5,
          totalValue: 125000,
          categories: 10,
          averageRating: 4.6,
          totalOrders: 1248,
          totalRevenue: 485000,
          pendingOrders: 12,
          deliveredOrders: 1180
        });
        setSalesData({
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          sales: [12500, 15200, 18400, 16700, 21000, 25600, 19800],
          orders: [125, 152, 184, 167, 210, 256, 198]
        });
        setCategoryData([
          { name: 'Electronics', value: 35, color: '#3b82f6' },
          { name: 'Apparel', value: 25, color: '#8b5cf6' },
          { name: 'Home & Living', value: 15, color: '#10b981' },
          { name: 'Jewellery', value: 10, color: '#f59e0b' },
          { name: 'Beauty', value: 8, color: '#ef4444' },
          { name: 'Others', value: 7, color: '#06b6d4' }
        ]);
        setRecentOrders([
          { id: 'ORD-1001', customer: 'John Doe', amount: 299.99, status: 'delivered', date: new Date().toISOString() },
          { id: 'ORD-1002', customer: 'Jane Smith', amount: 159.50, status: 'shipped', date: new Date().toISOString() },
          { id: 'ORD-1003', customer: 'Mike Johnson', amount: 89.99, status: 'pending', date: new Date().toISOString() }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Colors for charts
  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#6b7280'];

  // Prepare chart data
  const chartData = salesData.labels?.map((label, i) => ({
    day: label,
    sales: salesData.sales?.[i] || 0,
    orders: salesData.orders?.[i] || 0
  })) || [];

  // Stats Cards Data
  const statCards = [
    { 
      label: 'Total Revenue', 
      value: `$${(stats.totalRevenue / 1000).toFixed(1)}K`, 
      icon: DollarSign, 
      color: 'green',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      change: '+23%',
      trend: 'up'
    },
    { 
      label: 'Total Products', 
      value: stats.totalProducts, 
      icon: Package, 
      color: 'blue',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'Total Orders', 
      value: stats.totalOrders, 
      icon: ShoppingBag, 
      color: 'purple',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      change: '+18%',
      trend: 'up'
    },
    { 
      label: 'Pending Orders', 
      value: stats.pendingOrders, 
      icon: Clock, 
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      change: '-5%',
      trend: 'down'
    },
    { 
      label: 'Low Stock Items', 
      value: stats.lowStock, 
      icon: AlertCircle, 
      color: 'orange',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      change: '-8%',
      trend: 'down'
    },
    { 
      label: 'Avg Rating', 
      value: stats.averageRating, 
      icon: Star, 
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      change: '+0.3',
      trend: 'up'
    }
  ];

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} className="text-sm" style={{ color: p.color }}>
              {p.name}: ${p.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Admin'}! 👋</h1>
              <p className="mt-2 text-white/90">Here's what's happening with your store today.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link to="/products" className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition">
                Browse Products
              </Link>
              <Link to="/orders" className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm hover:bg-white/30 transition">
                View Orders
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl ${stat.bgColor} p-3`}>
                    <IconComponent className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} bg-${stat.trend === 'up' ? 'green' : 'red'}-50 px-2 py-1 rounded-full`}>
                    {stat.change}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section - Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Revenue Chart - Line Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">📈 Revenue Overview</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setTimeRange('week')}
                  className={`px-3 py-1 rounded-lg text-sm transition ${timeRange === 'week' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1 rounded-lg text-sm transition ${timeRange === 'month' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  Month
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    name="Revenue ($)" 
                    stroke="#3b82f6" 
                    fill="url(#colorSales)" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    name="Orders" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution - Pie Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Category Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Section - Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Sales vs Orders - Bar Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Daily Sales & Orders</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" name="Sales ($)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <Users className="h-8 w-8 opacity-80" />
                  <span className="text-2xl font-bold">{stats.totalOrders || 1248}</span>
                </div>
                <p className="mt-2 text-sm opacity-90">Total Customers</p>
              </div>
              
              <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <Truck className="h-8 w-8 opacity-80" />
                  <span className="text-2xl font-bold">{stats.deliveredOrders || 1180}</span>
                </div>
                <p className="mt-2 text-sm opacity-90">Delivered Orders</p>
              </div>
              
              <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <ShoppingCart className="h-8 w-8 opacity-80" />
                  <span className="text-2xl font-bold">${((stats.totalRevenue || 485000) / stats.totalOrders || 1).toFixed(0)}</span>
                </div>
                <p className="mt-2 text-sm opacity-90">Avg Order Value</p>
              </div>
              
              <div className="rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <Zap className="h-8 w-8 opacity-80" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <p className="mt-2 text-sm opacity-90">Conversion Rate %</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">🕒 Recent Orders</h2>
            <Link to="/orders" className="text-primary-600 hover:text-primary-700 text-sm">View All →</Link>
          </div>
          <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">${order.amount?.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold
                          ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 
                            'bg-yellow-100 text-yellow-700'}`}>
                          {order.status === 'delivered' && <CheckCircle className="h-3 w-3" />}
                          {order.status === 'shipped' && <Truck className="h-3 w-3" />}
                          {order.status === 'pending' && <Clock className="h-3 w-3" />}
                          {order.status?.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">🔥 Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700">View All 150+ →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {featuredProducts.map((product, index) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/id/${product.imageId || (100 + index)}/400/300`}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  {product.discount > 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">${product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;