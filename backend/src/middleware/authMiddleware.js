import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(createError(401, 'Authorization required'));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return next(createError(401, 'User not found'));
    req.user = user;
    next();
  } catch (error) {
    next(createError(401, 'Invalid token'));
  }
};
