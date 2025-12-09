// backend/user-service/src/middleware/error.middleware.js

const errorMiddleware = (err, req, res, next) => {
  console.error('❌ Erro detectado:', err.message);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

module.exports = errorMiddleware;
