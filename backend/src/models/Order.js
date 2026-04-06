import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  sku: String,
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true, min: 0 }
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    cashierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customer: { type: String, trim: true },
    items: [orderItemSchema],
    payment: {
      method: { type: String, required: true },
      amount: { type: Number, required: true, min: 0 },
      received: { type: Number, default: 0 },
      change: { type: Number, default: 0 }
    },
    pricing: {
      subtotal: { type: Number, required: true, min: 0 },
      tax: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      total: { type: Number, required: true, min: 0 }
    },
    status: { type: String, enum: ['pending', 'completed', 'refunded'], default: 'completed' },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

orderSchema.pre('validate', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
