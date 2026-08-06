const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a skill name'],
      trim: true
    },
    category: {
      type: String,
      default: 'Frontend Development'
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 90
    },
    icon: {
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

module.exports = mongoose.model('Skill', SkillSchema);
