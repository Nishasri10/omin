import productsData from '../data/products.js';

export const getProducts = (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  
  let products = [...productsData];
  const start = (parseInt(page) - 1) * parseInt(limit);
  const paginatedProducts = products.slice(start, start + parseInt(limit));
  
  res.json({
    products: paginatedProducts,
    total: products.length,
    page: parseInt(page),
    totalPages: Math.ceil(products.length / parseInt(limit)),
    totalProducts: productsData.length
  });
};

export const getProductById = (req, res) => {
  const product = productsData.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
};

export const getProductsByCategory = (req, res) => {
  const category = req.params.category;
  const products = productsData.filter(p => p.category === category);
  res.json(products);
};

export const searchProducts = (req, res) => {
  const { q } = req.query;
  
  let filtered = [...productsData];
  
  if (q) {
    const searchTerm = q.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }
  
  res.json(filtered);
};

export const getFeaturedProducts = (req, res) => {
  const featured = productsData.slice(0, 50);
  res.json(featured);
};

export const getNewArrivals = (req, res) => {
  const newArrivals = [...productsData].slice(0, 30);
  res.json(newArrivals);
};

export const getTopRated = (req, res) => {
  const topRated = [...productsData].sort((a, b) => b.rating - a.rating).slice(0, 30);
  res.json(topRated);
};