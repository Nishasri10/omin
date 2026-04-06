// src/services/productCatalog.js
export const getProducts = () => {
  const categories = ['Electronics', 'Apparel', 'Footwear', 'Jewellery', 'Home & Living', 'Beauty', 'Sports', 'Books', 'Toys', 'Groceries'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Levis', 'Tiffany', 'Cartier', 'Sony', 'LG', 'Dell', 'HP', 'Bose', 'RayBan', 'Rolex', 'Gucci', 'Puma', 'Reebok', 'Zara', 'H&M', 'Louis Vuitton'];
  
  const products = [];
  
  // Generate 120 products with realistic data
  for (let i = 1; i <= 120; i++) {
    const category = categories[i % categories.length];
    const brand = brands[i % brands.length];
    const price = Math.floor(Math.random() * 500) + 10 + (Math.random() * 90);
    const quantity = Math.floor(Math.random() * 100) + 1;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const reviews = Math.floor(Math.random() * 500);
    const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0;
    
    let name = '';
    let description = '';
    
    const productTypes = {
      'Electronics': ['Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Smart Watch', 'Camera', 'Speaker', 'Monitor', 'Keyboard', 'Mouse', 'Charger', 'Power Bank', 'Earphones', 'Gaming Console', 'Drone'],
      'Apparel': ['T-Shirt', 'Jeans', 'Jacket', 'Sweater', 'Dress', 'Shirt', 'Blazer', 'Hoodie', 'Polo', 'Shorts', 'Trousers', 'Skirt', 'Blouse', 'Saree', 'Kurta'],
      'Footwear': ['Running Shoes', 'Sneakers', 'Boots', 'Sandals', 'Loafers', 'Heels', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes'],
      'Jewellery': ['Necklace', 'Earrings', 'Ring', 'Bracelet', 'Anklet', 'Pendant', 'Chain', 'Brooch', 'Cufflinks', 'Nose Ring'],
      'Home & Living': ['Sofa', 'Bed', 'Table', 'Chair', 'Lamp', 'Curtains', 'Cushions', 'Rug', 'Clock', 'Vase', 'Mirror', 'Bookshelf'],
      'Beauty': ['Lipstick', 'Foundation', 'Mascara', 'Perfume', 'Moisturizer', 'Sunscreen', 'Shampoo', 'Hair Oil', 'Face Wash', 'Nail Polish'],
      'Sports': ['Football', 'Basketball', 'Tennis Racket', 'Cricket Bat', 'Gym Gloves', 'Yoga Mat', 'Dumbbells', 'Protein Powder', 'Water Bottle'],
      'Books': ['Novel', 'Textbook', 'Magazine', 'Comic Book', 'Cookbook', 'Biography', 'Self Help Book', 'Children Book'],
      'Toys': ['Action Figure', 'Board Game', 'Puzzle', 'Doll', 'Remote Car', 'Lego Set', 'Stuffed Toy', 'Video Game'],
      'Groceries': ['Rice', 'Wheat Flour', 'Sugar', 'Tea', 'Coffee', 'Spices', 'Oil', 'Snacks', 'Juice', 'Biscuits']
    };
    
    const types = productTypes[category] || ['Product'];
    name = `${brand} ${types[i % types.length]} ${Math.floor(Math.random() * 100) + 1}`;
    description = `Premium ${category.toLowerCase()} product from ${brand}. High quality and durable. Perfect for everyday use. Comes with 1 year warranty.`;
    
    products.push({
      _id: `prod_${i}`,
      name: name,
      price: parseFloat(price.toFixed(2)),
      category: category,
      brand: brand,
      sku: `${category.substring(0, 3).toUpperCase()}-${String(i).padStart(4, '0')}`,
      quantity: quantity,
      description: description,
      rating: parseFloat(rating),
      reviews: reviews,
      discount: discount,
      inStock: quantity > 0,
      images: [
        `https://picsum.photos/id/${i + 100}/400/300`,
        `https://picsum.photos/id/${i + 200}/400/300`
      ]
    });
  }
  
  return products;
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p._id === id) || null;
};

export const getProductsByCategory = (category) => {
  const products = getProducts();
  return category === 'All' ? products : products.filter(p => p.category === category);
};

export const searchProducts = (query, category = 'All') => {
  const products = getProductsByCategory(category);
  if (!query) return products;
  return products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.sku.toLowerCase().includes(query.toLowerCase())
  );
};

export const getFeaturedProducts = (limit = 30) => {
  const products = getProducts();
  return products.slice(0, limit);
};