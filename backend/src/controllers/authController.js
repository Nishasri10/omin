import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Store from '../models/Store.js';

const createToken = user => jwt.sign({ id: user._id, role: user.role, storeId: user.storeId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

export const register = async (req, res, next) => {
  const { name, email, password, role, storeId } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

  let store = null;
  if (storeId) store = await Store.findById(storeId);
  const user = await User.create({ name, email, password, role: role || 'cashier', storeId: store?._id });
  const token = createToken(user);
  res.status(201).json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role, storeId: user.storeId }, token } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.verifyPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  const token = createToken(user);
  res.json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email, role: user.role, storeId: user.storeId }, token } });
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json({ success: true, data: user });
};
