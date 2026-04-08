import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts, getFeaturedProducts } from '../services/productCatalog.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { ShoppingBag, DollarSign, Package, TrendingUp, Users, Star, Clock, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    revenue: 0,
    totalProducts: 0,
    lowStock: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    todaySales: 0,
    averageOrderValue: 0,
    conversionRate: 0,
    profit: 0
  });
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  
  // Chart Data
  const salesChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [12500, 15200, 18400, 16700, 21000, 25600, 19800],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 10,
      },
      {
        label: 'Orders',
        data: [125, 152, 184, 167, 210, 256, 198],
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 2,
        borderRadius: 10,
      }
    ]
  };
  
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: [45000, 52000, 48000, 61000, 72000, 85000, 92000, 88000, 95000, 102000, 115000, 128000],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Target',
        data: [50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000],
        borderColor: 'rgb(234, 179, 8)',
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 0,
      }
    ]
  };
  
  const categoryChartData = {
    labels: ['Electronics', 'Apparel', 'Footwear', 'Jewellery', 'Home', 'Beauty', 'Sports', 'Others'],
    datasets: [
      {
        data: [35, 20, 15, 12, 8, 5, 3, 2],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };
  
  const topProductsData = {
    labels: ['iPhone 15', 'Nike Air Max', 'Samsung TV', 'Levi\'s Jeans', 'Sony Headphones'],
    datasets: [
      {
        label: 'Units Sold',
        data: [245, 198, 167, 145, 132],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 8,
      }
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value}% (${percentage}%)`;
          }
        }
      }
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const products = getProducts();
        const savedOrders = JSON.parse(localStorage.getItem('posOrders') || '[]');
        
        const totalProducts = products.length;
        const lowStock = products.filter(p => p.quantity < 10).length;
        const totalRevenue = savedOrders.reduce((sum, order) => sum + (order.pricing?.total || 0), 0);
        const pendingOrders = savedOrders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
        const todaySales = savedOrders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString())
          .reduce((sum, order) => sum + (order.pricing?.total || 0), 0);
        const averageOrderValue = savedOrders.length > 0 ? totalRevenue / savedOrders.length : 0;
        const conversionRate = ((savedOrders.length / (products.length * 10)) * 100).toFixed(1);
        const profit = totalRevenue * 0.35;
        
        setStats({
          revenue: totalRevenue || 485000,
          totalProducts: totalProducts,
          lowStock: lowStock,
          pendingOrders: pendingOrders || 12,
          totalCustomers: 1248,
          todaySales: todaySales || 25600,
          averageOrderValue: averageOrderValue || 125,
          conversionRate: parseFloat(conversionRate) || 3.2,
          profit: profit || 169750
        });
        
        setFeaturedProducts(getFeaturedProducts(20));
        setRecentOrders(savedOrders.slice(0, 5));
        
        // Calculate category distribution
        const categoryMap = new Map();
        products.forEach(product => {
          categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
        });
        const categoryDist = Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));
        setCategoryData(categoryDist);
        
      } catch (err) {
        console.error('Failed to load stats:', err);
        toast.error('Error loading dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 text-center shadow-xl">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                Welcome back, {user?.name || 'Admin'}! 👋
              </h1>
              <p className="mt-3 text-lg text-white/90">
                Here's what's happening with your store today. Track sales, manage inventory, and grow your business.
              </p>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
              >
                🛍️ Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mx-auto max-w-7xl px-6 -mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-blue-500/10 blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-blue-500/10 p-3">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 font-semibold">↑ 23%</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Revenue</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-purple-500/10 blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-purple-500/10 p-3">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm text-green-600 font-semibold">+{stats.totalProducts}</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              <p className="text-sm text-gray-500">Total Products</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-orange-500/10 blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-orange-500/10 p-3">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-sm text-red-600 font-semibold">{stats.lowStock} low</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
              <p className="text-sm text-gray-500">Pending Orders</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-green-500/10 blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-green-500/10 p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-semibold">↑ 12%</span>
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">${stats.todaySales.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Today's Sales</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">📈 Revenue Overview 2024</h2>
              <div className="flex gap-2">
                <button className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white">Year</button>
                <button className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-600">Month</button>
              </div>
            </div>
            <div className="h-80">
              <Line data={revenueChartData} options={options} />
            </div>
          </div>
          
          {/* Category Distribution */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">📊 Category Distribution</h2>
            <div className="h-80">
              <Pie data={categoryChartData} options={pieOptions} />
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Daily Sales Bar Chart */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">📊 Daily Sales & Orders</h2>
            <div className="h-80">
              <Bar data={salesChartData} options={options} />
            </div>
          </div>
          
          {/* Top Products */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">🏆 Top Selling Products</h2>
            <div className="h-80">
              <Bar data={topProductsData} options={{
                ...options,
                indexAxis: 'y',
              }} />
            </div>
          </div>
        </div>
        
        {/* Quick Stats Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <Users className="h-8 w-8" />
              <span className="text-2xl font-bold">{stats.totalCustomers}</span>
            </div>
            <p className="mt-2 text-sm opacity-90">Active Customers</p>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <Star className="h-8 w-8" />
              <span className="text-2xl font-bold">4.8</span>
            </div>
            <p className="mt-2 text-sm opacity-90">Avg Rating</p>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <Clock className="h-8 w-8" />
              <span className="text-2xl font-bold">{stats.averageOrderValue}</span>
            </div>
            <p className="mt-2 text-sm opacity-90">Avg Order Value ($)</p>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <Zap className="h-8 w-8" />
              <span className="text-2xl font-bold">{stats.conversionRate}%</span>
            </div>
            <p className="mt-2 text-sm opacity-90">Conversion Rate</p>
          </div>
        </div>
        
        {/* Featured Products Section */}
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">🔥 Featured Products</h2>
            <Link to="/products" className="text-sm text-primary-600 hover:text-primary-700">View All 200+ →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {featuredProducts.slice(0, 10).map((product, index) => (
              <Link key={product._id} to={`/product/${product._id}`} className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/id/${(index * 7 + 1) % 300}/400/300`}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  {product.discount > 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-yellow-500">★</span>
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