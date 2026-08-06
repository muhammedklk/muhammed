const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, 'Please add a degree/qualification title'],
      trim: true
    },
    institution: {
      type: String,
      required: [true, 'Please add an institution name'],
      trim: true
    },
    period: {
      type: String,
      required: [true, 'Please specify the study period (e.g. 2020 - 2024)']
    },
    description: {
      type: String,
      default: ''
    },
    score: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Education', EducationSchema);
