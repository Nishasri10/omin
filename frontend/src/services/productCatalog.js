// src/services/productCatalog.js
export const getProducts = () => {
  const categories = ['Electronics', 'Apparel', 'Footwear', 'Jewellery', 'Home & Living', 'Beauty', 'Sports', 'Books', 'Toys', 'Groceries'];
  
  const brands = {
    'Electronics': ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Bose', 'JBL', 'OnePlus', 'Xiaomi', 'Realme', 'Oppo', 'Vivo', 'Nokia', 'Motorola'],
    'Apparel': ['Nike', 'Adidas', 'Zara', 'H&M', 'Levis', 'Puma', 'Under Armour', 'Gap', 'Uniqlo', 'Forever 21', 'Gucci', 'Louis Vuitton', 'Armani', 'Ralph Lauren', 'Tommy Hilfiger'],
    'Footwear': ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Skechers', 'Converse', 'Vans', 'Crocs', 'Bata', 'Woodland', 'Clarks', 'Fila', 'Asics', 'Under Armour'],
    'Jewellery': ['Tiffany', 'Cartier', 'Bvlgari', 'Van Cleef', 'Tanishq', 'Malabar Gold', 'PC Jeweller', 'BlueStone', 'Caratlane', 'Mia', 'Orra', 'Gili', 'Nakshatra', 'Asmi', 'Sangini'],
    'Home & Living': ['IKEA', 'Home Centre', 'Pepperfry', 'Urban Ladder', 'Wakefit', 'Nilkamal', 'Godrej Interio', 'Durian', 'Springfit', 'Sleepwell', 'Century Ply', 'Greenply', 'Hafele', 'Ebco', 'Hettich'],
    'Beauty': ['Lakme', 'Maybelline', 'Loreal', 'MAC', 'Estee Lauder', 'Clinique', 'Nivea', 'Ponds', 'Garnier', 'Himalaya', 'Biotique', 'Forest Essentials', 'Plum', 'Mamaearth', 'Wow'],
    'Sports': ['Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'Wilson', 'Yonex', 'Sparx', 'Cosco', 'SS', 'SG', 'Kookaburra', 'Gray-Nicolls', 'CEAT', 'MRF'],
    'Books': ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Hachette', 'Macmillan', 'Scholastic', 'Oxford', 'Cambridge', 'Arihant', 'RD Sharma', 'HC Verma', 'DC Pandey', 'Oswaal', 'MTG', 'Wiley'],
    'Toys': ['Lego', 'Mattel', 'Hasbro', 'Fisher-Price', 'Hot Wheels', 'Barbie', 'Funskool', 'Disney', 'Marvel', 'DC Comics', 'Play-Doh', 'Nerf', 'Transformers', 'Pokemon', 'Star Wars'],
    'Groceries': ['Tata', 'Reliance', 'BigBasket', 'DMart', 'Spencer', 'More', 'Nature\'s Basket', 'Foodhall', 'Star Bazaar', 'Fresh', 'Organic India', '24 Mantra', 'Pro Nature', 'Soulfull', 'True Elements']
  };
  
  const productNames = {
    'Electronics': ['iPhone', 'Galaxy', 'Xperia', 'Smart TV', 'Laptop', 'Tablet', 'Headphones', 'Smartwatch', 'Camera', 'Speaker', 'Monitor', 'Keyboard', 'Mouse', 'Charger', 'Power Bank'],
    'Apparel': ['T-Shirt', 'Jeans', 'Jacket', 'Sweater', 'Dress', 'Shirt', 'Blazer', 'Hoodie', 'Polo', 'Shorts', 'Trousers', 'Skirt', 'Blouse', 'Kurta', 'Saree'],
    'Footwear': ['Running Shoes', 'Sneakers', 'Boots', 'Sandals', 'Loafers', 'Heels', 'Flip Flops', 'Sports Shoes', 'Formal Shoes', 'Casual Shoes', 'Slippers', 'Wedges', 'Trainers', 'Athletic', 'Walking Shoes'],
    'Jewellery': ['Diamond Necklace', 'Gold Earrings', 'Platinum Ring', 'Silver Bracelet', 'Diamond Anklet', 'Gold Pendant', 'Platinum Chain', 'Diamond Brooch', 'Gold Cufflinks', 'Silver Nose Ring', 'Mangalsutra', 'Bangles', 'Tiara', 'Toe Ring', 'Waist Chain'],
    'Home & Living': ['Leather Sofa', 'King Bed', 'Dining Table', 'Recliner Chair', 'Floor Lamp', 'Blackout Curtains', 'Memory Foam Cushions', 'Wool Rug', 'Wall Clock', 'Ceramic Vase', 'Wall Mirror', 'Bookshelf', 'Wardrobe', 'Shoe Rack', 'Coffee Table'],
    'Beauty': ['Matte Lipstick', 'Liquid Foundation', 'Volumizing Mascara', 'Designer Perfume', 'Anti-aging Cream', 'SPF 50 Sunscreen', 'Anti-dandruff Shampoo', 'Coconut Hair Oil', 'Charcoal Face Wash', 'Gel Nail Polish', 'Kajal', 'Eyeliner', 'Compact Powder', 'Face Primer', 'Vitamin C Serum'],
    'Sports': ['Professional Football', 'Basketball', 'Tennis Racket', 'Cricket Bat', 'Gym Gloves', 'Premium Yoga Mat', 'Adjustable Dumbbells', 'Whey Protein', 'Insulated Water Bottle', 'Team Jersey', 'Shin Guards', 'Helmet', 'Boxing Gloves', 'Skipping Rope', 'Resistance Bands'],
    'Books': ['Bestseller Novel', 'Textbook', 'Fashion Magazine', 'Comic Book', 'Recipe Cookbook', 'Autobiography', 'Self Help Book', 'Picture Book', 'Dictionary', 'Encyclopedia', 'Poetry Collection', 'History Book', 'Sci-Fi Novel', 'Mystery Thriller', 'Romance Novel'],
    'Toys': ['Marvel Action Figure', 'Strategy Board Game', 'Wooden Puzzle', 'Fashion Doll', 'RC Sports Car', 'Creative Lego Set', 'Soft Stuffed Toy', 'Video Game', 'Building Blocks', 'Electric Train', 'Dinosaur Toy', 'Robot Toy', 'Play Dough Set', 'Coloring Book', 'Crayons Set'],
    'Groceries': ['Basmati Rice', 'Whole Wheat Flour', 'Organic Sugar', 'Premium Tea', 'Roasted Coffee', 'Garam Masala', 'Olive Oil', 'Healthy Snacks', 'Fruit Juice', 'Digestive Biscuits', 'A2 Milk', 'Cheese Block', 'Butter', 'Multigrain Bread', 'Free Range Eggs']
  };
  
  const products = [];
  
  for (let i = 1; i <= 150; i++) {
    const categoryIndex = (i - 1) % categories.length;
    const category = categories[categoryIndex];
    const brandList = brands[category];
    const nameList = productNames[category];
    
    const brandIndex = i % brandList.length;
    const nameIndex = i % nameList.length;
    const brand = brandList[brandIndex];
    const productType = nameList[nameIndex];
    
    let price = 0;
    if (category === 'Electronics') price = 199 + (i % 800);
    else if (category === 'Jewellery') price = 299 + (i % 1700);
    else if (category === 'Home & Living') price = 99 + (i % 400);
    else if (category === 'Apparel') price = 29 + (i % 120);
    else if (category === 'Footwear') price = 39 + (i % 160);
    else if (category === 'Beauty') price = 19 + (i % 60);
    else if (category === 'Sports') price = 49 + (i % 200);
    else if (category === 'Books') price = 14 + (i % 35);
    else if (category === 'Toys') price = 24 + (i % 75);
    else price = 19 + (i % 80);
    
    const quantity = 5 + (i % 95);
    const rating = (3 + (i % 20) / 10).toFixed(1);
    const reviews = 50 + (i % 450);
    const discount = i % 7 === 0 ? 10 + (i % 20) : 0;
    
    const name = `${brand} ${productType} ${Math.floor(i / 10) + 1}`;
    
    const descriptions = {
      'Electronics': `Experience cutting-edge technology with the ${name}. Features latest processor, stunning display, and long battery life. Perfect for daily use. Comes with 2 year warranty.`,
      'Apparel': `Premium quality ${productType.toLowerCase()} from ${brand}. Made with 100% cotton, perfect for all-day wear. Available in multiple sizes. Machine washable.`,
      'Footwear': `Step into comfort with these ${productType.toLowerCase()} from ${brand}. Features memory foam insole and durable rubber sole. Perfect for daily wear.`,
      'Jewellery': `Elegant ${productType.toLowerCase()} crafted with precision. Made with genuine materials and exquisite design. Perfect for special occasions.`,
      'Home & Living': `Transform your home with this ${productType.toLowerCase()} from ${brand}. Premium quality materials and modern design. Built to last.`,
      'Beauty': `Get the perfect look with this ${productType.toLowerCase()} from ${brand}. Dermatologist tested and cruelty-free. Suitable for all skin types.`,
      'Sports': `Enhance your performance with this ${productType.toLowerCase()} from ${brand}. Professional grade equipment trusted by athletes worldwide.`,
      'Books': `Immerse yourself in this ${productType.toLowerCase()} from ${brand}. Bestselling author with rave reviews. A must-read for everyone.`,
      'Toys': `Spark creativity and imagination with this ${productType.toLowerCase()} from ${brand}. Safe for children and hours of fun guaranteed.`,
      'Groceries': `Premium quality ${productType.toLowerCase()} from ${brand}. Fresh, organic, and sourced directly from farmers. Healthy choice for your family.`
    };
    
    products.push({
      _id: `prod_${i}`,
      name: name,
      price: parseFloat(price.toFixed(2)),
      category: category,
      brand: brand,
      sku: `${category.substring(0, 3).toUpperCase()}-${String(i).padStart(4, '0')}`,
      quantity: quantity,
      description: descriptions[category] || `High-quality ${category.toLowerCase()} product from ${brand}.`,
      rating: parseFloat(rating),
      reviews: reviews,
      discount: discount,
      inStock: quantity > 0,
      barcode: `${category.substring(0, 3)}${String(i).padStart(6, '0')}`,
      createdAt: new Date(Date.now() - (i * 24 * 3600 * 1000)).toISOString()
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
  if (category === 'All') return products;
  return products.filter(p => p.category === category);
};

export const searchProducts = (query, category = 'All') => {
  const products = getProductsByCategory(category);
  if (!query) return products;
  const searchTerm = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.brand.toLowerCase().includes(searchTerm) ||
    p.sku.toLowerCase().includes(searchTerm) ||
    p.category.toLowerCase().includes(searchTerm)
  );
};

export const getFeaturedProducts = (limit = 30) => {
  const products = getProducts();
  return products.slice(0, limit);
};

export const getNewArrivals = (limit = 20) => {
  const products = getProducts();
  return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit);
};

export const getTopRated = (limit = 20) => {
  const products = getProducts();
  return [...products].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, limit);
};

export const getTrendingProducts = (limit = 20) => {
  const products = getProducts();
  return [...products].sort((a, b) => b.reviews - a.reviews).slice(0, limit);
};