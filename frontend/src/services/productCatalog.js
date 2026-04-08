// 180+ Premium Products Catalog
export const getProducts = () => {
  const categories = [
    'Electronics', 'Apparel', 'Footwear', 'Jewellery', 'Home & Living', 
    'Beauty', 'Sports', 'Books', 'Toys', 'Groceries', 'Furniture', 
    'Automotive', 'Pet Supplies', 'Office Supplies', 'Musical Instruments',
    'Gaming', 'Health', 'Baby Care', 'Travel', 'Tools'
  ];
  
  const brands = {
    'Electronics': ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Bose', 'JBL', 'OnePlus', 'Xiaomi', 'Realme', 'Oppo', 'Vivo', 'Nokia', 'Motorola', 'Google', 'Microsoft', 'Asus', 'Acer', 'Lenovo'],
    'Apparel': ['Nike', 'Adidas', 'Zara', 'H&M', 'Levis', 'Puma', 'Under Armour', 'Gap', 'Uniqlo', 'Forever 21', 'Gucci', 'Louis Vuitton', 'Armani', 'Ralph Lauren', 'Tommy Hilfiger', 'Calvin Klein', 'Versace', 'Boss', 'Lacoste', 'Supreme'],
    'Footwear': ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Skechers', 'Converse', 'Vans', 'Crocs', 'Bata', 'Woodland', 'Clarks', 'Fila', 'Asics', 'Under Armour', 'Mizuno', 'Saucony', 'Brooks', 'Hoka', 'On Running'],
    'Jewellery': ['Tiffany', 'Cartier', 'Bvlgari', 'Van Cleef', 'Tanishq', 'Malabar Gold', 'PC Jeweller', 'BlueStone', 'Caratlane', 'Mia', 'Orra', 'Gili', 'Nakshatra', 'Asmi', 'Sangini', 'Joyalukkas', 'Kalyan', 'Senco', 'TBZ', 'Candere'],
    'Home & Living': ['IKEA', 'Home Centre', 'Pepperfry', 'Urban Ladder', 'Wakefit', 'Nilkamal', 'Godrej Interio', 'Durian', 'Springfit', 'Sleepwell', 'Century Ply', 'Greenply', 'Hafele', 'Ebco', 'Hettich', 'Fabindia', 'Good Earth', 'Nestasia', 'The Home Store', 'Bombay Dyeing'],
    'Beauty': ['Lakme', 'Maybelline', 'Loreal', 'MAC', 'Estee Lauder', 'Clinique', 'Nivea', 'Ponds', 'Garnier', 'Himalaya', 'Biotique', 'Forest Essentials', 'Plum', 'Mamaearth', 'Wow', 'Sugar', 'Nykaa', 'Faces Canada', 'Colorbar', 'Swiss Beauty'],
    'Sports': ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'Wilson', 'Yonex', 'Sparx', 'Cosco', 'SS', 'SG', 'Kookaburra', 'Gray-Nicolls', 'CEAT', 'MRF', 'Spalding', 'Mikasa', 'Decathlon', 'Quechua', 'Kalenji'],
    'Books': ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Hachette', 'Macmillan', 'Scholastic', 'Oxford', 'Cambridge', 'Arihant', 'RD Sharma', 'HC Verma', 'DC Pandey', 'Oswaal', 'MTG', 'Wiley', 'Bloomsbury', 'Random House', 'Pearson', 'McGraw Hill', 'Cengage'],
    'Toys': ['Lego', 'Mattel', 'Hasbro', 'Fisher-Price', 'Hot Wheels', 'Barbie', 'Funskool', 'Disney', 'Marvel', 'DC Comics', 'Play-Doh', 'Nerf', 'Transformers', 'Pokemon', 'Star Wars', 'Bandai', 'Spin Master', 'Ravensburger', 'Melissa & Doug', 'VTech'],
    'Groceries': ['Tata', 'Reliance', 'BigBasket', 'DMart', 'Spencer', 'More', 'Nature\'s Basket', 'Foodhall', 'Star Bazaar', 'Fresh', 'Organic India', '24 Mantra', 'Pro Nature', 'Soulfull', 'True Elements', 'NutriChoice', 'Kelloggs', 'Nestle', 'PepsiCo', 'Coca-Cola']
  };
  
  const productTypes = {
    'Electronics': ['Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Smartwatch', 'Camera', 'Speaker', 'Monitor', 'Keyboard', 'Mouse', 'Charger', 'Power Bank', 'Earphones', 'Gaming Console', 'Drone', 'TV', 'Refrigerator', 'Washing Machine', 'Microwave', 'Air Conditioner', 'Robot Vacuum', 'Smart Bulb', 'WiFi Router', 'External SSD', 'Graphics Card'],
    'Apparel': ['T-Shirt', 'Jeans', 'Jacket', 'Sweater', 'Dress', 'Shirt', 'Blazer', 'Hoodie', 'Polo', 'Shorts', 'Trousers', 'Skirt', 'Blouse', 'Saree', 'Kurta', 'Lehenga', 'Suit', 'Coat', 'Sweatshirt', 'Winter Cap', 'Scarf', 'Gloves', 'Socks', 'Innerwear', 'Swimwear'],
    'Footwear': ['Running Shoes', 'Sneakers', 'Boots', 'Sandals', 'Loafers', 'Heels', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Slippers', 'Wedges', 'Training Shoes', 'Hiking Boots', 'Water Shoes', 'Climbing Shoes', 'Golf Shoes', 'Cycling Shoes', 'Dance Shoes', 'Orthopedic Shoes'],
    'Jewellery': ['Diamond Necklace', 'Gold Earrings', 'Platinum Ring', 'Silver Bracelet', 'Gemstone Pendant', 'Pearl Set', 'Anklet', 'Nose Pin', 'Mangalsutra', 'Bangles Set', 'Tiara', 'Toe Ring', 'Waist Chain', 'Brooch', 'Cufflinks', 'Choker', 'Jhumka', 'Kada', 'Payal', 'Maang Tikka']
  };
  
  const productImages = [
    1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
    85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160,
    165, 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230
  ];
  
  const products = [];
  
  // Generate 200 products
  for (let i = 1; i <= 200; i++) {
    const categoryIndex = (i - 1) % categories.length;
    const category = categories[categoryIndex];
    const brandList = brands[category] || ['Premium', 'Luxury', 'Elite', 'Classic', 'Modern'];
    const typeList = productTypes[category] || ['Product', 'Item', 'Accessory', 'Equipment', 'Gear'];
    
    const brand = brandList[Math.floor(Math.random() * brandList.length)];
    const productType = typeList[Math.floor(Math.random() * typeList.length)];
    
    // Dynamic pricing based on category
    let price = 0;
    if (category === 'Electronics') price = 199 + Math.floor(Math.random() * 1800);
    else if (category === 'Jewellery') price = 499 + Math.floor(Math.random() * 4500);
    else if (category === 'Furniture') price = 299 + Math.floor(Math.random() * 2000);
    else if (category === 'Home & Living') price = 49 + Math.floor(Math.random() * 500);
    else if (category === 'Apparel') price = 29 + Math.floor(Math.random() * 200);
    else if (category === 'Footwear') price = 39 + Math.floor(Math.random() * 250);
    else if (category === 'Beauty') price = 19 + Math.floor(Math.random() * 100);
    else if (category === 'Sports') price = 29 + Math.floor(Math.random() * 300);
    else if (category === 'Gaming') price = 49 + Math.floor(Math.random() * 400);
    else price = 19 + Math.floor(Math.random() * 200);
    
    const quantity = 5 + Math.floor(Math.random() * 195);
    const rating = (3 + Math.random() * 2).toFixed(1);
    const reviews = 20 + Math.floor(Math.random() * 980);
    const discount = Math.random() > 0.6 ? Math.floor(Math.random() * 40) + 5 : 0;
    
    const name = `${brand} ${productType} ${i}`;
    
    const descriptions = {
      'Electronics': `🚀 Experience cutting-edge technology with the ${name}. Features latest processor, stunning display, and exceptional battery life. Includes 2-year warranty and 30-day return policy. Perfect for professionals and enthusiasts.`,
      'Apparel': `👔 Premium ${productType.toLowerCase()} from ${brand}. Made with premium materials, perfect for all-day comfort. Available in multiple sizes and colors. Ethically sourced and sustainably produced.`,
      'Footwear': `👟 Step into comfort with these ${productType.toLowerCase()} from ${brand}. Features advanced cushioning technology, breathable materials, and durable construction. Perfect for daily wear and sports activities.`,
      'Jewellery': `💎 Elegant ${productType.toLowerCase()} crafted with precision. Made with genuine materials and exquisite design. Perfect for weddings, parties, and special occasions. Comes with certification and gift box.`,
      'Home & Living': `🏠 Transform your home with this ${productType.toLowerCase()} from ${brand}. Premium quality materials and modern design. Built to last with attention to every detail.`,
      'Beauty': `✨ Get the perfect look with this ${productType.toLowerCase()} from ${brand}. Dermatologist tested, cruelty-free, and suitable for all skin types. Enriched with natural ingredients.`,
      'Sports': `⚽ Enhance your performance with this ${productType.toLowerCase()} from ${brand}. Professional grade equipment trusted by athletes worldwide. Engineered for excellence.`,
      'Books': `📚 Immerse yourself in this ${productType.toLowerCase()} from ${brand}. Bestselling author with rave reviews. A must-read for everyone. Available in paperback, hardcover, and ebook formats.`,
      'Toys': `🎮 Spark creativity and imagination with this ${productType.toLowerCase()} from ${brand}. Safe for children, ASTM certified, and hours of fun guaranteed. Perfect gift for kids.`,
      'Groceries': `🥬 Premium quality ${productType.toLowerCase()} from ${brand}. Fresh, organic, and sourced directly from farmers. Healthy choice for your family. Non-GMO and preservative-free.`
    };
    
    products.push({
      _id: `prod_${String(i).padStart(4, '0')}`,
      name: name,
      price: parseFloat(price.toFixed(2)),
      category: category,
      brand: brand,
      sku: `${category.substring(0, 3).toUpperCase()}-${String(i).padStart(5, '0')}`,
      barcode: `890${String(Math.floor(Math.random() * 10000000000)).padStart(10, '0')}`,
      quantity: quantity,
      description: descriptions[category] || `🌟 Premium ${category.toLowerCase()} product from ${brand}. Quality guaranteed.`,
      rating: parseFloat(rating),
      reviews: reviews,
      discount: discount,
      inStock: quantity > 0,
      images: [`https://picsum.photos/id/${productImages[i % productImages.length]}/500/500`],
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return products;
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p._id === id) || null;
};

export const getFeaturedProducts = (limit = 40) => {
  const products = getProducts();
  return products.slice(0, limit);
};

export const getTopRated = (limit = 30) => {
  const products = getProducts();
  return [...products].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, limit);
};

export const getNewArrivals = (limit = 30) => {
  const products = getProducts();
  return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
};

export const getTrendingProducts = (limit = 30) => {
  const products = getProducts();
  return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit);
};

export const searchProducts = (query, category = 'All') => {
  const products = getProducts();
  let filtered = products;
  if (category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.sku.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }
  return filtered;
};

export const getProductsByCategory = (category) => {
  const products = getProducts();
  if (category === 'All') return products;
  return products.filter(p => p.category === category);
};

export const getCategories = () => {
  const products = getProducts();
  const categories = [...new Set(products.map(p => p.category))];
  return categories;
};