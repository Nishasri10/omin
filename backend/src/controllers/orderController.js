import Order from '../models/Order.js';
import { Inventory } from '../models/Inventory.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  const { items, payment, customer } = req.body;
  const productIds = items.map(item => item.productId);
  const products = await Product.find({ _id: { $in: productIds }, storeId: req.user.storeId });

  if (products.length !== items.length) return res.status(400).json({ success: false, message: 'One or more products are invalid' });

  let subtotal = 0;
  const orderItems = items.map(item => {
    const product = products.find(p => p._id.toString() === item.productId);
    const total = product.price * item.quantity;
    subtotal += total;
    return { productId: product._id, name: product.name, sku: product.sku, quantity: item.quantity, price: product.price, total };
  });

  const total = subtotal;

  const order = await Order.create({
    orderNumber: `ORD-${Date.now()}`,
    storeId: req.user.storeId,
    cashierId: req.user._id,
    customer,
    items: orderItems,
    payment: { ...payment, amount: total },
    pricing: { subtotal, tax: 0, discount: 0, total }
  });

  await Promise.all(items.map(async item => {
    const inventory = await Inventory.findOne({ storeId: req.user.storeId, productId: item.productId });
    if (inventory) {
      inventory.availableQuantity = Math.max(0, inventory.availableQuantity - item.quantity);
      await inventory.save();
    }
  }));

  res.status(201).json({ success: true, data: order });
};

export const listOrders = async (req, res) => {
  const orders = await Order.find({ storeId: req.user.storeId }).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
};
