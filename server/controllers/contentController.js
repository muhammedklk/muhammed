const Hero = require('../models/Hero');
const About = require('../models/About');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const Service = require('../models/Service');
const Skill = require('../models/Skill');
const Testimonial = require('../models/Testimonial');
const Faq = require('../models/Faq');
const Seo = require('../models/Seo');
const SiteSettings = require('../models/SiteSettings');
const ActivityLog = require('../models/ActivityLog');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * @desc    Get all public portfolio content in a single roundtrip batch for fast loading
 * @route   GET /api/content/all
 * @access  Public
 */
const getPublicPortfolioContent = async (req, res, next) => {
  try {
    const [
      hero,
      about,
      experiences,
      education,
      services,
      skills,
      testimonials,
      faqs,
      settings,
      seo
    ] = await Promise.all([
      Hero.findOne({ isActive: true }).sort({ createdAt: -1 }),
      About.findOne().sort({ createdAt: -1 }),
      Experience.find().sort({ order: 1, createdAt: -1 }),
      Education.find().sort({ order: 1, createdAt: -1 }),
      Service.find().sort({ order: 1, createdAt: -1 }),
      Skill.find().sort({ order: 1, createdAt: -1 }),
      Testimonial.find().sort({ order: 1, createdAt: -1 }),
      SiteSettings.findOne().sort({ createdAt: -1 }),
      Seo.find()
    ]);

    let finalSettings = settings;
    if (!finalSettings) {
      finalSettings = await SiteSettings.create({
        maintenanceMode: false,
        maintenancePages: {
          home: false,
          about: false,
          projects: false,
          caseStudy: false,
          services: false,
          contact: false
        }
      });
    }

    const data = {
      hero: hero || {},
      about: about || {},
      experiences: experiences || [],
      education: education || [],
      services: services || [],
      skills: skills || [],
      testimonials: testimonials || [],
      faqs: faqs || [],
      settings: finalSettings || {},
      seo: seo || []
    };

    return successResponse(res, 200, 'Portfolio content fetched successfully', data);
  } catch (error) {
    next(error);
  }
};

// --- HERO CONTROLLERS ---
const getHero = async (req, res, next) => {
  try {
    let hero = await Hero.findOne({ isActive: true });
    if (!hero) {
      hero = await Hero.create({});
    }
    return successResponse(res, 200, 'Hero data fetched', { hero });
  } catch (error) {
    next(error);
  }
};

const updateHero = async (req, res, next) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(req.body);
    } else {
      hero = await Hero.findByIdAndUpdate(hero._id, req.body, { new: true, runValidators: true });
    }

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'UPDATED_HERO',
      module: 'Hero',
      details: 'Updated Hero section details',
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'Hero updated successfully', { hero });
  } catch (error) {
    next(error);
  }
};

// --- ABOUT CONTROLLERS ---
const getAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    return successResponse(res, 200, 'About data fetched', { about });
  } catch (error) {
    next(error);
  }
};

const updateAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true, runValidators: true });
    }

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'UPDATED_ABOUT',
      module: 'About',
      details: 'Updated About section details',
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'About updated successfully', { about });
  } catch (error) {
    next(error);
  }
};

// --- GENERIC CRUD HELPERS ---
const createCrudHandlers = (Model, moduleName) => ({
  getAll: async (req, res, next) => {
    try {
      const items = await Model.find().sort({ order: 1, createdAt: -1 });
      return successResponse(res, 200, `${moduleName} items fetched`, { items });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      await ActivityLog.create({
        user: req.user.id,
        userName: req.user.name,
        action: `CREATED_${moduleName.toUpperCase()}`,
        module: moduleName,
        details: `Created new item in ${moduleName}`,
        ipAddress: req.ip
      });
      return successResponse(res, 201, `${moduleName} item created`, { item });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return errorResponse(res, 404, 'Item not found');
      await ActivityLog.create({
        user: req.user.id,
        userName: req.user.name,
        action: `UPDATED_${moduleName.toUpperCase()}`,
        module: moduleName,
        details: `Updated item in ${moduleName}`,
        ipAddress: req.ip
      });
      return successResponse(res, 200, `${moduleName} item updated`, { item });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return errorResponse(res, 404, 'Item not found');
      await ActivityLog.create({
        user: req.user.id,
        userName: req.user.name,
        action: `DELETED_${moduleName.toUpperCase()}`,
        module: moduleName,
        details: `Deleted item in ${moduleName}`,
        ipAddress: req.ip
      });
      return successResponse(res, 200, `${moduleName} item deleted`);
    } catch (error) {
      next(error);
    }
  }
});

// Specific module CRUD handlers
const experienceHandlers = createCrudHandlers(Experience, 'Experience');
const educationHandlers = createCrudHandlers(Education, 'Education');
const serviceHandlers = createCrudHandlers(Service, 'Service');
const skillHandlers = createCrudHandlers(Skill, 'Skill');
const testimonialHandlers = createCrudHandlers(Testimonial, 'Testimonial');
const faqHandlers = createCrudHandlers(Faq, 'Faq');
const seoHandlers = createCrudHandlers(Seo, 'Seo');

// --- SITE SETTINGS CONTROLLERS ---
const getSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return successResponse(res, 200, 'Site settings fetched', { settings });
  } catch (error) {
    next(error);
  }
};

const updateSiteSettings = async (req, res, next) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    settings.markModified('maintenancePages');
    await settings.save();

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'UPDATED_SITE_SETTINGS',
      module: 'Settings',
      details: 'Updated global site settings',
      ipAddress: req.ip
    });

    return successResponse(res, 200, 'Site settings updated successfully', { settings });
  } catch (error) {
    next(error);
  }
};

// --- SEO CONTROLLERS ---
const getSeo = async (req, res, next) => {
  try {
    const seoList = await Seo.find();
    return successResponse(res, 200, 'SEO settings fetched', { seo: seoList });
  } catch (error) {
    next(error);
  }
};

const updateSeo = async (req, res, next) => {
  try {
    const { page } = req.params;
    let seoItem = await Seo.findOne({ page: page.toLowerCase() });
    if (!seoItem) {
      seoItem = await Seo.create({ page: page.toLowerCase(), ...req.body });
    } else {
      seoItem = await Seo.findByIdAndUpdate(seoItem._id, req.body, { new: true, runValidators: true });
    }

    await ActivityLog.create({
      user: req.user.id,
      userName: req.user.name,
      action: 'UPDATED_SEO',
      module: 'SEO',
      details: `Updated SEO settings for page: ${page}`,
      ipAddress: req.ip
    });

    return successResponse(res, 200, `SEO settings updated for ${page}`, { seo: seoItem });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicPortfolioContent,
  getHero,
  updateHero,
  getAbout,
  updateAbout,
  experienceHandlers,
  educationHandlers,
  serviceHandlers,
  skillHandlers,
  testimonialHandlers,
  faqHandlers,
  seoHandlers,
  getSiteSettings,
  updateSiteSettings,
  getSettings: getSiteSettings,
  updateSettings: updateSiteSettings,
  getSeo,
  updateSeo
};
