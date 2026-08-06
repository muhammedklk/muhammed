const SiteSettings = require('../models/SiteSettings');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Maintenance Mode Middleware
 * Blocks public API requests when maintenanceMode is true in SiteSettings
 */
const checkMaintenance = async (req, res, next) => {
  // Allow health check and auth endpoints always
  if (req.path.startsWith('/api/health') || req.path.startsWith('/api/auth')) {
    return next();
  }

  try {
    const settings = await SiteSettings.findOne();
    if (!settings || !settings.maintenanceMode) {
      return next();
    }

    // Check for Secret Bypass Token in headers or query params
    const tokenHeader = req.headers['x-maintenance-token'] || req.query.bypassToken;
    if (tokenHeader && tokenHeader === settings.previewToken) {
      return next();
    }

    // Check for Admin JWT Bearer Token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_jwt_secret_dev_only');
        const user = await User.findById(decoded.id);
        if (user && (user.role === 'admin' || user.role === 'superadmin')) {
          return next();
        }
      } catch (err) {
        // Token invalid, fall through to 503
      }
    }

    // Block public access during Maintenance Mode
    return res.status(503).json({
      success: false,
      maintenanceMode: true,
      message: settings.maintenanceMessage || 'System is currently undergoing scheduled maintenance.',
      settings: {
        siteTitle: settings.siteTitle,
        contactEmail: settings.contactEmail
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = checkMaintenance;
