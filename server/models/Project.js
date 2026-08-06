const mongoose = require('mongoose');

const CaseStudySchema = new mongoose.Schema({
  tagline: { type: String, default: '' },
  overview: { type: String, default: '' },
  problem: { type: String, default: '' },
  research: { type: String, default: '' },
  description: [{ type: String }],
  outcome: { type: String, default: '' },
  techTags: { type: String, default: '' },
  colorPalette: [
    {
      hex: { type: String },
      name: { type: String }
    }
  ],
  headingFont: { type: String, default: '' },
  bodyFont: { type: String, default: '' },
  metrics: [
    {
      label: { type: String },
      value: { type: String }
    }
  ],
  mobileImg1: { type: String, default: '' },
  mobileImg2: { type: String, default: '' },
  showcaseImg: { type: String, default: '' },
  bannerImg: { type: String, default: '' },
  gallery: [{ type: String }],
  challenges: { type: String, default: '' },
  solution: { type: String, default: '' }
}, { _id: false });

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true
    },
    shortDescription: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
      trim: true
    },
    heroImg: {
      type: String,
      required: [true, 'Please add a main hero image URL']
    },
    showcaseImg: {
      type: String,
      default: ''
    },
    mobileImg1: {
      type: String,
      default: ''
    },
    mobileImg2: {
      type: String,
      default: ''
    },
    technologies: [
      {
        type: String,
        trim: true
      }
    ],
    client: {
      type: String,
      default: ''
    },
    services: {
      type: String,
      default: ''
    },
    year: {
      type: String,
      default: '2026'
    },
    liveUrl: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['publish', 'draft'],
      default: 'publish'
    },
    caseStudy: {
      type: CaseStudySchema,
      default: () => ({})
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate slug before saving
ProjectSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
