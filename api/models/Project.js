import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true },
  tagline: { type: String },
  category: { type: String, default: 'uiux frontend' },
  services: { type: String },
  client: { type: String },
  year: { type: String, default: '2026' },
  liveUrl: { type: String },
  heroImg: { type: String },
  showcaseImg: { type: String },
  mobileImg1: { type: String },
  mobileImg2: { type: String },
  bannerImg: { type: String },
  description: [{ type: String }],
  outcome: { type: String },
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
