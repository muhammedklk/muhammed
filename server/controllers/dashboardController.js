const Project = require('../models/Project');
const ContactMessage = require('../models/ContactMessage');
const Media = require('../models/Media');
const ActivityLog = require('../models/ActivityLog');
const { successResponse } = require('../utils/apiResponse');

/**
 * @desc    Get Admin Dashboard Overview Metrics (Admin)
 * @route   GET /api/dashboard/stats
 * @access  Private/Admin
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      totalMessages,
      unreadMessages,
      totalMedia,
      recentLogs
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'publish' }),
      Project.countDocuments({ status: 'draft' }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
      Media.countDocuments(),
      ActivityLog.find().sort({ createdAt: -1 }).limit(10)
    ]);

    return successResponse(res, 200, 'Dashboard statistics fetched successfully', {
      stats: {
        totalProjects,
        publishedProjects,
        draftProjects,
        totalMessages,
        unreadMessages,
        totalMedia
      },
      recentLogs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get Activity Audit Logs (Admin)
 * @route   GET /api/dashboard/logs
 * @access  Private/Admin
 */
const getActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(50);
    return successResponse(res, 200, 'Activity logs fetched successfully', { logs });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getActivityLogs,
};
