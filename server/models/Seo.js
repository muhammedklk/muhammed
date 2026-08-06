const mongoose = require('mongoose');

const SeoSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      enum: ['global', 'home', 'works', 'casestudy', 'about', 'contact']
    },
    metaTitle: {
      type: String,
      default: 'Developer Portfolio — Senior Full Stack Architect'
    },
    metaDescription: {
      type: String,
      default: 'Senior Full Stack Software Architect specializing in React, Node.js, Express, and high-performance Web Apps.'
    },
    keywords: [
      {
        type: String,
        trim: true
      }
    ],
    ogTitle: {
      type: String,
      default: ''
    },
    ogDescription: {
      type: String,
      default: ''
    },
    ogImage: {
      type: String,
      default: ''
    },
    canonicalUrl: {
      type: String,
      default: ''
    },
    jsonLdSchema: {
      type: String,
      default: ''
    },
    robots: {
      type: String,
      default: 'index, follow'
    },
    googleVerification: {
      type: String,
      default: ''
    },
    bingVerification: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Seo', SeoSchema);
