/**
 * Standardized Success Response
 */
const successResponse = (res, statusCode = 200, message = 'Success', data = null, meta = null) => {
  const responsePayload = {
    success: true,
    message,
    data,
  };
  if (meta) {
    responsePayload.meta = meta;
  }
  return res.status(statusCode).json(responsePayload);
};

/**
 * Standardized Error Response
 */
const errorResponse = (res, statusCode = 500, message = 'Internal Server Error', errors = null) => {
  const responsePayload = {
    success: false,
    message,
  };
  if (errors) {
    responsePayload.errors = errors;
  }
  return res.status(statusCode).json(responsePayload);
};

module.exports = {
  successResponse,
  errorResponse,
};
