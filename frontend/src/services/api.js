// api.js (updated)
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Add token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('posToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('posToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const register = async credentials => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

export const login = async credentials => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const fetchProducts = async token => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchOrders = async token => {
  const response = await api.get('/orders');
  return response.data;
};

export default api;