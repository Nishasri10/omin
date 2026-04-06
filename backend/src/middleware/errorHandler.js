import createError from 'http-errors';

const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ success: false, message, details: err.details || null });
};

export const notFound = (req, res, next) => {
  next(createError(404, 'Not Found'));
};

export default errorHandler;
