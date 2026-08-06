const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a job title'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true
    },
    location: {
      type: String,
      default: 'Remote'
    },
    period: {
      type: String,
      required: [true, 'Please specify the employment period (e.g. 2024 - Present)']
    },
    description: {
      type: String,
      default: ''
    },
    achievements: [
      {
        type: String
      }
    ],
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Experience', ExperienceSchema);
