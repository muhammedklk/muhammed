const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema(
  {
    badge: {
      type: String,
      default: 'AVAILABLE FOR PROJECTS'
    },
    titlePrefix: {
      type: String,
      default: 'Bringing ideas'
    },
    highlightText: {
      type: String,
      default: 'to life'
    },
    titleSuffix: {
      type: String,
      default: 'through design'
    },
    subtitle: {
      type: String,
      default: 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products.'
    },
    primaryBtnText: {
      type: String,
      default: 'View Works'
    },
    primaryBtnLink: {
      type: String,
      default: '/works'
    },
    secondaryBtnText: {
      type: String,
      default: 'About me'
    },
    secondaryBtnLink: {
      type: String,
      default: '/about'
    },
    orbitName: {
      type: String,
      default: 'Muhammed'
    },
    orbitRole: {
      type: String,
      default: 'UI/UX & FRONTEND CRAFT'
    },
    heroImage: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Hero', HeroSchema);
