import Product from '../models/Product.js';

export const listProducts = async (req, res) => {
  const products = await Product.find({ storeId: req.user.storeId }).sort({ createdAt: -1 });
  res.json({ success: true, data: products });
};

export const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, storeId: req.user.storeId });
  res.status(201).json({ success: true, data: product });
};

export const getProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id, storeId: req.user.storeId });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate({ _id: req.params.id, storeId: req.user.storeId }, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id, storeId: req.user.storeId });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product removed' });
};
