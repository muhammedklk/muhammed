const express = require('express');
const router = express.Router();
const {
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
  getSettings,
  updateSettings,
  getSeo,
  updateSeo
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

// Public Batch Content Route
router.get('/all', getPublicPortfolioContent);

// Hero Routes
router.get('/hero', getHero);
router.put('/hero', protect, updateHero);

// About Routes
router.get('/about', getAbout);
router.put('/about', protect, updateAbout);

// Settings Routes
router.get('/settings', getSettings);
router.put('/settings', protect, updateSettings);

// SEO Routes
router.get('/seo', getSeo);
router.put('/seo/:page', protect, updateSeo);

// Experience Routes
router.get('/experience', experienceHandlers.getAll);
router.post('/experience', protect, experienceHandlers.create);
router.put('/experience/:id', protect, experienceHandlers.update);
router.delete('/experience/:id', protect, experienceHandlers.delete);

// Education Routes
router.get('/education', educationHandlers.getAll);
router.post('/education', protect, educationHandlers.create);
router.put('/education/:id', protect, educationHandlers.update);
router.delete('/education/:id', protect, educationHandlers.delete);

// Services Routes
router.get('/services', serviceHandlers.getAll);
router.post('/services', protect, serviceHandlers.create);
router.put('/services/:id', protect, serviceHandlers.update);
router.delete('/services/:id', protect, serviceHandlers.delete);

// Skills Routes
router.get('/skills', skillHandlers.getAll);
router.post('/skills', protect, skillHandlers.create);
router.put('/skills/:id', protect, skillHandlers.update);
router.delete('/skills/:id', protect, skillHandlers.delete);

// Testimonials Routes
router.get('/testimonials', testimonialHandlers.getAll);
router.post('/testimonials', protect, testimonialHandlers.create);
router.put('/testimonials/:id', protect, testimonialHandlers.update);
router.delete('/testimonials/:id', protect, testimonialHandlers.delete);

// FAQs Routes
router.get('/faqs', faqHandlers.getAll);
router.post('/faqs', protect, faqHandlers.create);
router.put('/faqs/:id', protect, faqHandlers.update);
router.delete('/faqs/:id', protect, faqHandlers.delete);

module.exports = router;
