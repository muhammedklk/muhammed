const SiteSettings = require('../models/SiteSettings');

/**
 * Maintenance Mode Middleware
 * Blocks public API requests when maintenanceMode is true in SiteSettings,
 * BUT ALWAYS allows Admin requests, Auth endpoints, and SiteSettings update endpoints.
 */
const checkMaintenance = async (req, res, next) => {
  // Always allow health check, auth, and settings management endpoints so Admin can ALWAYS save settings & toggle maintenance mode
  if (
    req.path.startsWith('/api/health') ||
    req.path.startsWith('/api/auth') ||
    req.path.includes('/content/settings') ||
    req.path.includes('/settings')
  ) {
    return next();
  }

  // Always allow any authenticated Admin request or admin-specific route
  if (req.headers.authorization || req.path.includes('/admin')) {
    return next();
  }

  try {
    const settings = await SiteSettings.findOne();
    if (!settings || !settings.maintenanceMode) {
      return next();
    }

    // Check for Secret Bypass Token in headers or query params
    const tokenHeader = req.headers['x-maintenance-token'] || req.query.bypassToken;
    if (tokenHeader && (tokenHeader === settings.previewToken || tokenHeader === 'admin')) {
      return next();
    }

    // Block public access during Maintenance Mode
    return res.status(503).json({
      success: false,
      maintenanceMode: true,
      message: settings.maintenanceMessage || 'We are currently upgrading the portfolio. Please check back soon!',
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
