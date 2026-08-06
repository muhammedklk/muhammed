const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Protect Routes - Verifies JWT Bearer Token
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return errorResponse(res, 401, 'Not authorized to access this route. Please log in.');
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_jwt_secret_dev_only'
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return errorResponse(res, 401, 'The user belonging to this token no longer exists.');
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 401, 'Authentication failed. Invalid or expired token.');
  }
};

/**
 * Grant Access to Specific Roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        `User role '${req.user ? req.user.role : 'guest'}' is not authorized to perform this action.`
      );
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
