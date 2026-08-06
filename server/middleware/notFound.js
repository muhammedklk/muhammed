const { errorResponse } = require('../utils/apiResponse');

const notFound = (req, res, next) => {
  return errorResponse(res, 404, `API Route Not Found - [${req.method}] ${req.originalUrl}`);
};

module.exports = notFound;
