const { errorResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || res.statusCode || 500;
  if (statusCode === 200) statusCode = 500;

  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    message = `Resource not found with id: ${err.value}`;
    statusCode = 404;
  }

  // Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate value entered for ${field}. Please use another value.`;
    statusCode = 400;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = 'Validation Failed';
    statusCode = 400;
    errors = Object.values(err.errors).map((val) => val.message);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid authentication token. Please log in again.';
    statusCode = 401;
  }

  // Mongoose Connection / Timeout Errors
  if (err.message && (err.message.includes('buffering timed out') || err.message.includes('connect ECONNREFUSED') || err.message.includes('selection timed out') || err.message.includes('MONGODB_URI') || err.message.includes('querySrv'))) {
    message = 'Database Connection Failed. Please verify MONGODB_URI in Vercel Environment Variables & allow 0.0.0.0/0 IP Network Access in MongoDB Atlas.';
    statusCode = 503;
  }

  console.error(`[Error Handler] ${req.method} ${req.originalUrl} - Status: ${statusCode} - ${err.message}`);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  return errorResponse(res, statusCode, message, errors);
};

module.exports = errorHandler;
