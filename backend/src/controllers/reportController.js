import Order from '../models/Order.js';
import { Inventory } from '../models/Inventory.js';

export const salesSummary = async (req, res) => {
  const orders = await Order.find({ storeId: req.user.storeId });
  const totalSales = orders.reduce((sum, order) => sum + order.pricing.total, 0);
  const totalOrders = orders.length;
  res.json({ success: true, data: { totalSales, totalOrders } });
};

export const inventorySummary = async (req, res) => {
  const inventory = await Inventory.find({ storeId: req.user.storeId });
  const totalItems = inventory.reduce((sum, row) => sum + row.availableQuantity, 0);
  res.json({ success: true, data: { totalItems, records: inventory.length } });
};
