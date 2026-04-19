// 160+ Premium Products
/*const productsData = [];

// Electronics Products
const electronicsProducts = [
  { id: 'elec_001', name: 'iPhone 15 Pro Max', category: 'Electronics', brand: 'Apple', price: 1299, originalPrice: 1399, discount: 7, rating: 4.9, reviews: 1234, stock: 45, imageId: '169', description: 'Latest A17 Pro chip, titanium design, 48MP camera with 5x optical zoom.' },
  { id: 'elec_002', name: 'Samsung Galaxy S24 Ultra', category: 'Electronics', brand: 'Samsung', price: 1199, originalPrice: 1299, discount: 8, rating: 4.8, reviews: 892, stock: 38, imageId: '170', description: 'AI-powered smartphone with S Pen, 200MP camera.' },
  { id: 'elec_003', name: 'Sony WH-1000XM5', category: 'Electronics', brand: 'Sony', price: 349, originalPrice: 399, discount: 13, rating: 4.9, reviews: 2156, stock: 67, imageId: '171', description: 'Industry-leading noise cancellation, 30-hour battery life.' },
  { id: 'elec_004', name: 'MacBook Pro 16"', category: 'Electronics', brand: 'Apple', price: 2499, originalPrice: 2699, discount: 7, rating: 4.9, reviews: 567, stock: 23, imageId: '172', description: 'M3 Max chip, 36GB RAM, 1TB SSD.' },
  { id: 'elec_005', name: 'Dell XPS 15', category: 'Electronics', brand: 'Dell', price: 1899, originalPrice: 2099, discount: 10, rating: 4.7, reviews: 432, stock: 31, imageId: '173', description: 'InfinityEdge display, Intel Core i9, NVIDIA RTX 4070.' }
];

// Apparel Products
const apparelProducts = [
  { id: 'app_001', name: 'Nike Air Max 2024', category: 'Apparel', brand: 'Nike', price: 159, originalPrice: 189, discount: 16, rating: 4.7, reviews: 2345, stock: 156, imageId: '194', description: 'Premium leather, visible Air cushioning, breathable mesh.' },
  { id: 'app_002', name: 'Adidas Ultraboost Light', category: 'Apparel', brand: 'Adidas', price: 179, originalPrice: 199, discount: 10, rating: 4.8, reviews: 1876, stock: 143, imageId: '195', description: 'Lightest Ultraboost ever, responsive cushioning.' },
  { id: 'app_003', name: "Levi's 501 Original Jeans", category: 'Apparel', brand: 'Levi\'s', price: 89, originalPrice: 109, discount: 18, rating: 4.6, reviews: 5678, stock: 234, imageId: '196', description: 'Straight fit, shrink-to-fit, 100% cotton denim.' }
];

// Jewellery Products
const jewelleryProducts = [
  { id: 'jew_001', name: 'Diamond Engagement Ring', category: 'Jewellery', brand: 'Tiffany', price: 4999, originalPrice: 5999, discount: 17, rating: 4.9, reviews: 234, stock: 12, imageId: '206', description: '0.5ct brilliant diamond, platinum setting.' }
];

// Home & Living Products
const homeProducts = [
  { id: 'home_001', name: 'IKEA Sofa', category: 'Home & Living', brand: 'IKEA', price: 599, originalPrice: 699, discount: 14, rating: 4.5, reviews: 2345, stock: 34, imageId: '211', description: 'Modern design, removable covers.' }
];

// Beauty Products
const beautyProducts = [
  { id: 'beauty_001', name: 'MAC Lipstick Kit', category: 'Beauty', brand: 'MAC', price: 49, originalPrice: 69, discount: 29, rating: 4.7, reviews: 3456, stock: 123, imageId: '216', description: 'Set of 5 shades, matte finish.' }
];

// Sports Products
const sportsProducts = [
  { id: 'sports_001', name: 'Yonex Badminton Racket', category: 'Sports', brand: 'Yonex', price: 149, originalPrice: 199, discount: 25, rating: 4.7, reviews: 1234, stock: 67, imageId: '219', description: 'Carbon graphite, lightweight.' }
];

// Books Products
const booksProducts = [
  { id: 'books_001', name: 'Atomic Habits', category: 'Books', brand: 'Penguin', price: 19, originalPrice: 29, discount: 34, rating: 4.9, reviews: 12345, stock: 234, imageId: '222', description: 'James Clear - Transform your life with small habits.' }
];

// Combine all products
const allProducts = [
  ...electronicsProducts,
  ...apparelProducts,
  ...jewelleryProducts,
  ...homeProducts,
  ...beautyProducts,
  ...sportsProducts,
  ...booksProducts
];

// Generate additional products to reach 160
const categories = ['Electronics', 'Apparel', 'Jewellery', 'Home & Living', 'Beauty', 'Sports', 'Books', 'Toys', 'Groceries', 'Furniture'];
const brandsList = {
  'Electronics': ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP'],
  'Apparel': ['Nike', 'Adidas', 'Zara', 'H&M', 'Levi\'s', 'Puma'],
  'Jewellery': ['Tiffany', 'Cartier', 'Tanishq', 'Caratlane'],
  'Home & Living': ['IKEA', 'Pepperfry', 'Wakefit', 'Urban Ladder'],
  'Beauty': ['MAC', 'Lakme', 'L\'Oreal', 'Maybelline'],
  'Sports': ['Nike', 'Adidas', 'Puma', 'Yonex'],
  'Books': ['Penguin', 'HarperCollins', 'Simon & Schuster'],
  'Toys': ['Lego', 'Mattel', 'Hasbro'],
  'Groceries': ['Tata', 'Reliance', 'BigBasket'],
  'Furniture': ['IKEA', 'Pepperfry', 'Godrej']
};

const currentCount = allProducts.length;

for (let i = currentCount + 1; i <= 160; i++) {
  const category = categories[i % categories.length];
  const brandList = brandsList[category] || ['Premium', 'Luxury', 'Elite'];
  const brand = brandList[i % brandList.length];
  const price = 19 + (i * 3) % 500;
  const discount = [0, 5, 10, 15, 20, 25][i % 6];
  const rating = (3.5 + (i % 15) / 10).toFixed(1);
  
  allProducts.push({
    id: `prod_${String(i).padStart(4, '0')}`,
    name: `${brand} ${category} Product ${i}`,
    category: category,
    brand: brand,
    price: price,
    originalPrice: discount > 0 ? price * (1 + discount / 100) : price,
    discount: discount,
    rating: parseFloat(rating),
    reviews: 10 + (i * 7) % 1000,
    stock: 5 + (i * 3) % 200,
    imageId: String(100 + (i % 150)),
    sku: `${category.substring(0, 3).toUpperCase()}-${String(i).padStart(5, '0')}`,
    barcode: `890${String(Math.floor(Math.random() * 10000000000)).padStart(10, '0')}`,
    description: `Premium ${category} product from ${brand}. High quality materials and excellent craftsmanship.`,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
  });
}

export default allProducts; */
export default productsData;
