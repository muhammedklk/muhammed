import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  id: { type: String, default: '' },
  number: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  tags: [{ type: String }],
  icon: { type: String, default: 'Palette' }
}, { _id: false });

const StatSchema = new mongoose.Schema({
  number: { type: String, default: '' },
  label: { type: String, default: '' }
}, { _id: false });

const SocialsSchema = new mongoose.Schema({
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  instagram: { type: String, default: '' },
  portfolio: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  whatsapp: { type: String, default: '' }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  shortTitle: { type: String, default: '' },
  category: { type: String, default: 'Web Design' },
  tagline: { type: String, default: '' },
  year: { type: String, default: '2026' },
  client: { type: String, default: '' },
  role: { type: String, default: '' },
  duration: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  coverImage: { type: String, default: '' },
  deviceMockup: { type: String, default: 'monitor' },
  tags: [{ type: String }],
  overview: { type: String, default: '' },
  challenge: { type: String, default: '' },
  goals: [{ type: String }],
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  mobileMockup1: { type: String, default: '' },
  mobileMockup2: { type: String, default: '' },
  perspectiveMockup: { type: String, default: '' }
}, { timestamps: true });

const FaqSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { _id: false });

const AboutCardSchema = new mongoose.Schema({
  number: { type: String, default: '01' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  tag: { type: String, default: '' }
}, { _id: false });

const PortfolioContentSchema = new mongoose.Schema({
  key: { type: String, default: 'portfolio_main', unique: true },
  personalInfo: {
    name: { type: String, default: 'Muhammed K' },
    title: { type: String, default: 'UI/UX Designer & Front-End Developer' },
    shortBio: { type: String, default: '' },
    tagline: { type: String, default: '' },
    heroSubtext: { type: String, default: '' },
    heroSideNote: { type: String, default: '' },
    heroPhoto: { type: String, default: '/assets/a_clean_cutout_isolated_portrait_image_on_a_transp.png' },
    email: { type: String, default: 'muhammedklkm@gmail.com' },
    phone: { type: String, default: '+91 9656216086' },
    location: { type: String, default: 'Malappuram, Kerala, India' },
    availableForWork: { type: Boolean, default: true },
    statusText: { type: String, default: 'Available for freelance & full-time roles' },
    cvPath: { type: String, default: '/assets/muhammedk-cv.pdf' },
    socials: { type: SocialsSchema, default: () => ({}) },
    stats: [StatSchema],
    services: [ServiceSchema]
  },
  aboutContent: {
    greeting: { type: String, default: "Hi, I'm Muhammed" },
    tag: { type: String, default: '( ABOUT MY CRAFT )' },
    badgeTop: { type: String, default: 'UI/UX & Web Dev' },
    badgeBottom: { type: String, default: 'Available for Hire' },
    leadStatement: { 
      type: String, 
      default: 'Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.' 
    },
    bioBody: { 
      type: String, 
      default: 'I bridge the gap between creative visual artistry and technical front-end engineering. My goal is to build digital products that not only look breathtaking, but perform flawlessly across every screen size. My approach combines rigorous user research with meticulous typographic hierarchies, smooth micro-interactions, and resilient code to ensure every project leaves a lasting impact.' 
    },
    location: { type: String, default: 'Kerala / Remote' },
    specialization: { type: String, default: 'Web Design, Development' },
    photoUrl: { type: String, default: '/assets/a_clean_cutout_isolated_portrait_image_on_a_transp.png' },
    cards: [AboutCardSchema]
  },
  projects: [ProjectSchema],
  faqItems: [FaqSchema],
  maintenanceMode: {
    enabled: { type: Boolean, default: false },
    title: { type: String, default: 'Crafting Something Extraordinary' },
    message: { type: String, default: 'Portfolio is currently undergoing scheduled updates and improvements. We will be back shortly with exciting new case studies and designs.' },
    contactEmail: { type: String, default: 'muhammedklkm@gmail.com' }
  },
  homeContent: {
    hero: {
      headline: { type: String, default: "Design That Feels. Experiences That Resonate." },
      subtext: { type: String, default: "I blend human-centered design, modern front-end engineering, and aesthetic precision to create digital experiences that people connect with — seamlessly across every screen." },
      sideStatement: { type: String, default: "Whether through intuitive user interfaces, responsive web systems, or clean front-end code, I craft digital products that people don't just use — they feel." },
      pills: [{ type: String, default: 'UI/UX' }],
      ctaText: { type: String, default: "LET'S TALK" }
    },
    aboutSnippet: {
      tag: { type: String, default: "( ABOUT )" },
      text1: { type: String, default: "Design isn't just what I do —" },
      chip1: { type: String, default: "/assets/portrait-burgundy.png" },
      text2: { type: String, default: "it's how I think. I'm" },
      chip2: { type: String, default: "/assets/mockup-nadvora-monitor.png" },
      text3: { type: String, default: "Muhammed K, a product designer & front-end developer who believes" },
      chip3: { type: String, default: "/assets/mockup-styleora.jpg" },
      text4: { type: String, default: "great products start with" },
      chip4: { type: String, default: "/assets/mockup-mahora-mobile.png" },
      text5: { type: String, default: "understanding people, not pixels." },
      readStoryText: { type: String, default: "Read Full Story" },
      downloadCvText: { type: String, default: "DOWNLOAD CV" }
    },
    servicesSection: {
      tag: { type: String, default: "( SERVICES )" },
      headline: { type: String, default: "Crafting Intuitive Products Across Every Dimension." },
      subtitle: { type: String, default: "I create intuitive digital experiences through human-centered UI/UX design, modern web development, and front-end engineering solutions." },
      cards: [{
        number: { type: String, default: "01" },
        theme: { type: String, default: "theme-violet" },
        category: { type: String, default: "Interface & Systems" },
        title: { type: String, default: "UI/UX Design" },
        tags: [{ type: String }],
        linkText: { type: String, default: "EXPLORE DESIGN WORKS" },
        linkUrl: { type: String, default: "/works" }
      }]
    },
    worksSection: {
      tag: { type: String, default: "( SELECTED WORKS )" },
      headline: { type: String, default: "Selected Works & Case Studies." },
      subtitle: { type: String, default: "A curated collection of commercial UI/UX designs and digital systems." },
      buttonText: { type: String, default: "EXPLORE ALL WORKS" }
    },
    faqSection: {
      tag: { type: String, default: "( FAQ )" },
      headline: { type: String, default: "Frequently Asked Questions." },
      subtitle: { type: String, default: "Everything you need to know before kicking off a project together." }
    }
  }
}, { timestamps: true });

export const PortfolioContent = mongoose.model('PortfolioContent', PortfolioContentSchema);
