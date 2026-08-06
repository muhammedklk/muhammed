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
      default: 'Muhammed | UI/UX Designer & Front-End Developer'
    },
    metaDescription: {
      type: String,
      default: 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products.'
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
