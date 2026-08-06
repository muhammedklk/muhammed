const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema(
  {
    badge: {
      type: String,
      default: 'About Me'
    },
    mainHeadline: {
      type: String,
      default: 'I turn complex problems into elegant, high-impact digital solutions.'
    },
    bioParagraphs: [
      {
        type: String
      }
    ],
    experienceYears: {
      type: String,
      default: '5+'
    },
    completedProjects: {
      type: String,
      default: '40+'
    },
    happyClients: {
      type: String,
      default: '25+'
    },
    portraitImage: {
      type: String,
      default: ''
    },
    avatarUrl: {
      type: String,
      default: '/assets/profile_photo.jpg'
    },
    resumeUrl: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('About', AboutSchema);
