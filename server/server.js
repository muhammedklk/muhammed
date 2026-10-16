import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PortfolioContent } from './models/PortfolioContent.js';

// Static default imports for automatic database seeding
import { personalInfo as defaultPersonalInfo } from '../src/data/portfolioData.js';
import { projects as defaultProjects } from '../src/data/projectsData.js';
import { faqItems as defaultFaqs } from '../src/data/faqData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://kmuhammed:Muhammed9656@cluster0.pc5tkcr.mongodb.net/portfolio_cms';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure uploads folder exists in public/uploads
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded media statically
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration for desktop image/file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
    const ext = path.extname(cleanName);
    const base = path.basename(cleanName, ext);
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (req, file, cb) => {
    // allow images and pdfs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF files are allowed!'), false);
    }
  }
});

export const defaultHomeContent = {
  hero: {
    headline: "Design That Feels. Experiences That Resonate.",
    subtext: "I blend human-centered design, modern front-end engineering, and aesthetic precision to create digital experiences that people connect with — seamlessly across every screen.",
    sideStatement: "Whether through intuitive user interfaces, responsive web systems, or clean front-end code, I craft digital products that people don't just use — they feel.",
    pills: ["UI/UX", "WEB DESIGN", "FRONT-END DEV"],
    ctaText: "LET'S TALK"
  },
  aboutSnippet: {
    tag: "( ABOUT )",
    text1: "Design isn't just what I do —",
    chip1: "/assets/portrait-burgundy.png",
    text2: "it's how I think. I'm",
    chip2: "/assets/mockup-nadvora-monitor.png",
    text3: "Muhammed K, a product designer & front-end developer who believes",
    chip3: "/assets/mockup-styleora.jpg",
    text4: "great products start with",
    chip4: "/assets/mockup-mahora-mobile.png",
    text5: "understanding people, not pixels.",
    readStoryText: "Read Full Story",
    downloadCvText: "DOWNLOAD CV"
  },
  servicesSection: {
    tag: "( SERVICES )",
    headline: "Crafting Intuitive Products Across Every Dimension.",
    subtitle: "I create intuitive digital experiences through human-centered UI/UX design, modern web development, and front-end engineering solutions.",
    cards: [
      {
        number: "01",
        theme: "theme-violet",
        category: "Interface & Systems",
        title: "UI/UX Design",
        tags: ["Figma Systems", "User Research", "Interactive Prototypes", "Design Handoff"],
        linkText: "EXPLORE DESIGN WORKS",
        linkUrl: "/works"
      },
      {
        number: "02",
        theme: "theme-blue",
        category: "Visual & Responsive",
        title: "Web Design",
        tags: ["Responsive Layouts", "Micro-Animations", "Design Tokens", "Brand Direction"],
        linkText: "EXPLORE WEB PROJECTS",
        linkUrl: "/works"
      },
      {
        number: "03",
        theme: "theme-emerald",
        category: "Code & 3D Engineering",
        title: "Frontend Development",
        tags: ["React.js Apps", "Three.js / WebGL", "Modern CSS3", "Performance & SEO"],
        linkText: "START A PROJECT",
        linkUrl: "/contact"
      }
    ]
  },
  worksSection: {
    tag: "( SELECTED WORKS )",
    headline: "Selected Works & Case Studies.",
    subtitle: "A curated collection of commercial UI/UX designs and digital systems.",
    buttonText: "EXPLORE ALL WORKS"
  },
  faqSection: {
    tag: "( FAQ )",
    headline: "Frequently Asked Questions.",
    subtitle: "Everything you need to know before kicking off a project together."
  }
};

// Seed helper
async function seedInitialDataIfNeeded() {
  try {
    let doc = await PortfolioContent.findOne({ key: 'portfolio_main' });
    if (!doc) {
      console.log('🌱 Seeding initial portfolio data into MongoDB Atlas...');
      await PortfolioContent.create({
        key: 'portfolio_main',
        personalInfo: defaultPersonalInfo,
        aboutContent: {
          greeting: "Hi, I'm Muhammed",
          tag: "( ABOUT MY CRAFT )",
          badgeTop: "UI/UX & Web Dev",
          badgeBottom: "Available for Hire",
          leadStatement: "Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.",
          bioBody: "I bridge the gap between creative visual artistry and technical front-end engineering. My goal is to build digital products that not only look breathtaking, but perform flawlessly across every screen size. My approach combines rigorous user research with meticulous typographic hierarchies, smooth micro-interactions, and resilient code to ensure every project leaves a lasting impact.",
          location: "Kerala / Remote",
          specialization: "Web Design, Development",
          photoUrl: "/assets/a_clean_cutout_isolated_portrait_image_on_a_transp.png",
          cards: [
            { number: "01", title: "Design & UI/UX", tag: "01 / DESIGN", description: "Figma, Adobe Photoshop, Wireframing & Prototyping, Design Systems, Mobile & Web Interface Design, UI Animation & Interaction" },
            { number: "02", title: "Frontend Development", tag: "02 / FRONTEND", description: "HTML5, CSS3, JavaScript, Bootstrap, GSAP, Responsive Design, GitHub" },
            { number: "03", title: "Creative Mindset", tag: "03 / MINDSET", description: "Empathetic research, pixel perfection, iterative prototyping, design-to-code execution" }
          ]
        },
        projects: defaultProjects,
        faqItems: defaultFaqs,
        homeContent: defaultHomeContent
      });
      console.log('✅ Initial portfolio data successfully seeded into MongoDB Atlas!');
    } else if (!doc.homeContent || !doc.homeContent.hero) {
      doc.homeContent = defaultHomeContent;
      await doc.save();
      console.log('✅ Populated default homeContent in MongoDB Atlas!');
    }
  } catch (err) {
    console.error('Error during initial seeding:', err.message);
  }
}

// -------------------------------------------------------------
// API ROUTES
// -------------------------------------------------------------

// Upload File (Image from desktop or CV PDF)
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const publicUrl = `/uploads/${req.file.filename}`;
    return res.json({
      success: true,
      url: publicUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all portfolio data
app.get('/api/content', async (req, res) => {
  try {
    let content = await PortfolioContent.findOne({ key: 'portfolio_main' });
    if (!content) {
      await seedInitialDataIfNeeded();
      content = await PortfolioContent.findOne({ key: 'portfolio_main' });
    }
    res.json({
      success: true,
      data: content || {
        personalInfo: defaultPersonalInfo,
        aboutContent: {},
        projects: defaultProjects,
        faqItems: defaultFaqs
      }
    });
  } catch (error) {
    console.error('Fetch error:', error);
    // fallback gracefully to static default
    res.json({
      success: true,
      fallback: true,
      data: {
        personalInfo: defaultPersonalInfo,
        aboutContent: {},
        projects: defaultProjects,
        faqItems: defaultFaqs
      }
    });
  }
});

// UPDATE entire portfolio content
app.put('/api/content', async (req, res) => {
  try {
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ success: true, message: 'Content updated successfully', data: updated });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE personalInfo & general sections
app.put('/api/content/personal', async (req, res) => {
  try {
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $set: { personalInfo: req.body } },
      { new: true, upsert: true }
    );
    res.json({ success: true, message: 'Personal info updated successfully', data: updated.personalInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE aboutContent
app.put('/api/content/about', async (req, res) => {
  try {
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $set: { aboutContent: req.body } },
      { new: true, upsert: true }
    );
    res.json({ success: true, message: 'About content updated successfully', data: updated.aboutContent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE homeContent
app.put('/api/content/home', async (req, res) => {
  try {
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $set: { homeContent: req.body } },
      { new: true, upsert: true }
    );
    res.json({ success: true, message: 'Home content updated successfully', data: updated.homeContent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE all projects
app.put('/api/content/projects', async (req, res) => {
  try {
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $set: { projects: req.body } },
      { new: true, upsert: true }
    );
    res.json({ success: true, message: 'Projects updated successfully', data: updated.projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ADD a single project
app.post('/api/content/projects', async (req, res) => {
  try {
    const newProject = req.body;
    if (!newProject.id) newProject.id = 'project-' + Date.now();
    if (!newProject.slug) newProject.slug = newProject.title ? newProject.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : newProject.id;
    
    const doc = await PortfolioContent.findOne({ key: 'portfolio_main' });
    if (!doc) {
      await seedInitialDataIfNeeded();
    }
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $push: { projects: { $each: [newProject], $position: 0 } } },
      { new: true }
    );
    res.json({ success: true, message: 'Project added successfully', data: updated.projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE a single project by ID or slug
app.put('/api/content/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await PortfolioContent.findOne({ key: 'portfolio_main' });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });

    const pIdx = doc.projects.findIndex(p => p.id === id || p.slug === id);
    if (pIdx === -1) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    doc.projects[pIdx] = { ...doc.projects[pIdx].toObject(), ...req.body };
    await doc.save();
    res.json({ success: true, message: 'Project updated successfully', project: doc.projects[pIdx] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE a project by ID or slug
app.delete('/api/content/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $pull: { projects: { $or: [{ id }, { slug: id }] } } },
      { new: true }
    );
    res.json({ success: true, message: 'Project deleted successfully', projects: updated.projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE FAQs
app.put('/api/content/faqs', async (req, res) => {
  try {
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $set: { faqItems: req.body } },
      { new: true, upsert: true }
    );
    res.json({ success: true, message: 'FAQs updated successfully', data: updated.faqItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// UPDATE Maintenance Mode
app.put('/api/content/maintenance', async (req, res) => {
  try {
    const updated = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio_main' },
      { $set: { maintenanceMode: req.body } },
      { new: true, upsert: true }
    );
    res.json({ success: true, message: 'Maintenance mode updated successfully', data: updated.maintenanceMode });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// RESET to defaults
app.post('/api/content/reset-defaults', async (req, res) => {
  try {
    await PortfolioContent.deleteMany({});
    await seedInitialDataIfNeeded();
    const doc = await PortfolioContent.findOne({ key: 'portfolio_main' });
    res.json({ success: true, message: 'Reset to defaults successfully', data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas (portfolio_cms)');
    seedInitialDataIfNeeded();
    app.listen(PORT, () => {
      console.log(`🚀 Portfolio CMS Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas connection error:', err.message);
    // Start server anyway so fallback endpoints work
    app.listen(PORT, () => {
      console.log(`⚠️ Portfolio CMS Server running in offline fallback mode on http://localhost:${PORT}`);
    });
  });
