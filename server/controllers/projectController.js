const Project = require('../models/Project');
const ActivityLog = require('../models/ActivityLog');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Get all published projects (Public)
 * @route   GET /api/projects
 * @access  Public
 */
const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = { status: { $ne: 'draft' } };

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.featured = true;
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    return successResponse(res, 200, 'Projects fetched successfully', { projects });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single project by ID or Slug (Public)
 * @route   GET /api/projects/:slug
 * @access  Public
 */
const getProjectBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({
      $or: [{ slug: slug.toLowerCase() }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    });

    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    return successResponse(res, 200, 'Project details fetched successfully', { project });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all projects including drafts (Admin)
 * @route   GET /api/projects/admin/all
 * @access  Private/Admin
 */
const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return successResponse(res, 200, 'All projects fetched for admin', { projects });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new Project (Admin)
 * @route   POST /api/projects
 * @access  Private/Admin
 */
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'CREATED_PROJECT',
      module: 'Projects',
      details: `Created project: "${project.title}"`,
      ipAddress: req.ip
    });

    return successResponse(res, 201, 'Project created successfully', { project });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Project (Admin)
 * @route   PUT /api/projects/:id
 * @access  Private/Admin
 */
const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'UPDATED_PROJECT',
      module: 'Projects',
      details: `Updated project: "${project.title}"`,
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'Project updated successfully', { project });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Project Case Study (Admin)
 * @route   PUT /api/projects/:id/casestudy
 * @access  Private/Admin
 */
const updateCaseStudy = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    project.caseStudy = {
      ...project.caseStudy,
      ...req.body
    };

    await project.save();

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'UPDATED_CASE_STUDY',
      module: 'Case Study',
      details: `Updated case study for project: "${project.title}"`,
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'Case Study updated successfully', { project });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Project (Admin)
 * @route   DELETE /api/projects/:id
 * @access  Private/Admin
 */
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return errorResponse(res, 404, 'Project not found');
    }

    const title = project.title;
    await project.deleteOne();

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'DELETED_PROJECT',
      module: 'Projects',
      details: `Deleted project: "${title}"`,
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  updateCaseStudy,
  deleteProject,
};
