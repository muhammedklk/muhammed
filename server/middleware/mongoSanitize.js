/**
 * Custom NoSQL Injection Sanitization Middleware
 * Recursively strips keys containing '$' or '.' from req.body, req.query, and req.params
 */
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Omit keys containing $ or . to prevent NoSQL query operator injection
      const cleanKey = key.replace(/[\$\.]/g, '');
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitized[cleanKey] = sanitizeObject(obj[key]);
      } else {
        sanitized[cleanKey] = obj[key];
      }
    }
  }
  return sanitized;
};

const mongoSanitize = (req, res, next) => {
  if (req.body) req.body = sanitizeObject(req.body);
  if (req.query) req.query = sanitizeObject(req.query);
  if (req.params) req.params = sanitizeObject(req.params);
  next();
};

module.exports = mongoSanitize;
