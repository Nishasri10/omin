import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('posToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('posToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response;
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response;
};

// Product APIs
export const fetchProducts = async (params) => {
  const response = await api.get('/products', { params });
  return response;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response;
};

export const searchProducts = async (query) => {
  const response = await api.get('/products/search', { params: query });
  return response;
};

// Order APIs
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response;
};

export const fetchOrders = async () => {
  const response = await api.get('/orders/my-orders');
  return response;
};

// Dashboard APIs
export const fetchDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response;
};

export default api;