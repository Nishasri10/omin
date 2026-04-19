import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  sku: { type: String, unique: true },
  barcode: { type: String },
  imageId: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);