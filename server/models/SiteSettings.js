const mongoose = require('mongoose');

const SocialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { _id: false });

const HeaderNavSchema = new mongoose.Schema({
  label: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { _id: false });

const SiteSettingsSchema = new mongoose.Schema(
  {
    siteTitle: {
      type: String,
      default: 'Developer Portfolio'
    },
    logoText: {
      type: String,
      default: 'Portfolio'
    },
    logoImage: {
      type: String,
      default: ''
    },
    favicon: {
      type: String,
      default: '/favicon.ico'
    },
    contactEmail: {
      type: String,
      default: 'hello@developer.com'
    },
    contactPhone: {
      type: String,
      default: '+1 (555) 019-2834'
    },
    location: {
      type: String,
      default: 'Kochi, Kerala / Remote'
    },
    resumeUrl: {
      type: String,
      default: ''
    },
    footerText: {
      type: String,
      default: '© 2026 Developer Portfolio. All rights reserved.'
    },
    headerNav: [HeaderNavSchema],
    socialLinks: [SocialLinkSchema],
    maintenanceMode: {
      type: Boolean,
      default: false
    },
    maintenanceMessage: {
      type: String,
      default: 'We are currently upgrading the portfolio. Please check back soon!'
    },
    maintenancePages: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        home: false,
        about: false,
        projects: false,
        caseStudy: false,
        services: false,
        contact: false
      }
    },
    previewToken: {
      type: String,
      default: 'preview-secret-token-12345'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
