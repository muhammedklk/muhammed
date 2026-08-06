const express = require('express');
const router = express.Router();
const { getDashboardStats, getActivityLogs } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

// Admin Dashboard Routes
router.get('/stats', protect, getDashboardStats);
router.get('/logs', protect, getActivityLogs);

module.exports = router;
