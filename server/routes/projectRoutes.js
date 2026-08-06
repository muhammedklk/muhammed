const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  updateCaseStudy,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Public Endpoints
router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

// Admin Endpoints
router.get('/admin/all', protect, getAllProjectsAdmin);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.put('/:id/casestudy', protect, updateCaseStudy);
router.delete('/:id', protect, deleteProject);

module.exports = router;
