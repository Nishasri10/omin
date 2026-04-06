import { Inventory } from '../models/Inventory.js';
import Product from '../models/Product.js';

export const listInventory = async (req, res) => {
  const inventory = await Inventory.find({ storeId: req.user.storeId }).populate('productId');
  res.json({ success: true, data: inventory });
};

export const adjustInventory = async (req, res) => {
  const { quantity } = req.body;
  const inventory = await Inventory.findOne({ _id: req.params.id, storeId: req.user.storeId });
  if (!inventory) return res.status(404).json({ success: false, message: 'Inventory entry not found' });

  inventory.availableQuantity = Math.max(0, inventory.availableQuantity + Number(quantity));
  await inventory.save();

  res.json({ success: true, data: inventory });
};

export const createInventory = async (req, res) => {
  const { productId, availableQuantity, minStockLevel, maxStockLevel } = req.body;
  const product = await Product.findOne({ _id: productId, storeId: req.user.storeId });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const inventory = await Inventory.create({ storeId: req.user.storeId, productId, availableQuantity, minStockLevel, maxStockLevel });
  res.status(201).json({ success: true, data: inventory });
};
