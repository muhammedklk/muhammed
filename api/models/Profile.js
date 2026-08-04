import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Muhammed' },
  role: { type: String, default: 'UI/UX Designer & Front-End Developer' },
  heroHeading1: { type: String, default: 'Bringing ideas' },
  heroHeading2: { type: String, default: 'to life' },
  heroHeading3: { type: String, default: 'through design' },
  heroDescription: {
    type: String,
    default: 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products.'
  },
  aboutHeadline: {
    type: String,
    default: 'Helping brand achieve digital mastery of creative innovation and strategic planning'
  },
  aboutBio: {
    type: String,
    default: 'Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.'
  },
  location: { type: String, default: 'Kerala, India (Remote Worldwide)' },
  email: { type: String, default: 'muhammedklkm@gmail.com' },
  phone: { type: String, default: '+91 9656216086' },
  cvUrl: { type: String, default: 'assets/cv/Muhammed_K_Resume.pdf' },
  stats: [
    {
      value: { type: String },
      label: { type: String }
    }
  ],
  techStack: [{ type: String }],
  socials: {
    linkedin: { type: String, default: 'https://www.linkedin.com/in/muhammed-klkm/' },
    github: { type: String, default: 'https://github.com/muhammedklk' },
    instagram: { type: String, default: 'https://www.instagram.com/___muhammedk/' }
  },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Profile || mongoose.model('Profile', profileSchema);
