import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, unique: true, required: true, trim: true },
    barcode: { type: String, trim: true, index: true },
    category: { type: String, trim: true },
    brand: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    cost: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    minStockLevel: { type: Number, default: 0 },
    maxStockLevel: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
