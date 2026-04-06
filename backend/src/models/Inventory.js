import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    availableQuantity: { type: Number, default: 0, min: 0 },
    minStockLevel: { type: Number, default: 0, min: 0 },
    maxStockLevel: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

inventorySchema.index({ storeId: 1, productId: 1 }, { unique: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
export { Inventory };
