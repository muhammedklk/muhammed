import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { connectDB } from './config/db.js';
import User from './models/User.js';
import Profile from './models/Profile.js';
import Project from './models/Project.js';
import Faq from './models/Faq.js';
import Inquiry from './models/Inquiry.js';
import Setting from './models/Setting.js';
import { authMiddleware } from './middleware/auth.js';
import { upload } from './middleware/upload.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_muhammed_portfolio_2026';

// ----------------------------------------------------
// 1. AUTH ROUTES
// ----------------------------------------------------

// Admin Seed (Initial setup)
app.post('/api/auth/seed', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: 'admin' });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin user already seeded.' });
    }

    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newAdmin = new User({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();
    res.json({ message: 'Default admin user seeded successfully!', username: newAdmin.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });

    // Fallback auto-creation if DB has no admin user yet
    if (!user && username === (process.env.ADMIN_USERNAME || 'admin')) {
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
      if (password === defaultPassword) {
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        user = new User({ username, password: hashedPassword, role: 'admin' });
        await user.save();
      }
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Token Verification
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

// ----------------------------------------------------
// 1.5 SITE CONTROLS & MAINTENANCE MODE ROUTES
// ----------------------------------------------------

const getOrCreateSetting = async () => {
  let setting = await Setting.findOne();
  if (!setting) {
    setting = new Setting({
      maintenanceMode: false,
      maintenanceMessage: 'We are improving the experience for you. Please check back shortly.',
      previewToken: crypto.randomBytes(32).toString('hex'),
      updatedAt: new Date(),
      updatedBy: 'Admin'
    });
    await setting.save();
  }
  return setting;
};

// GET /api/settings - Public settings fetch (NEVER exposes previewToken)
app.get('/api/settings', async (req, res) => {
  try {
    const setting = await getOrCreateSetting();
    res.json({
      maintenanceMode: !!setting.maintenanceMode,
      maintenanceMessage: setting.maintenanceMessage,
      updatedAt: setting.updatedAt,
      updatedBy: setting.updatedBy
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/settings/maintenance - Toggle Maintenance Mode (Protected)
app.put('/api/settings/maintenance', authMiddleware, async (req, res) => {
  try {
    const { maintenanceMode, maintenanceMessage } = req.body;
    const username = req.user?.username || 'Admin';

    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting({
        maintenanceMode: !!maintenanceMode,
        maintenanceMessage: maintenanceMessage || 'We are improving the experience for you. Please check back shortly.',
        previewToken: crypto.randomBytes(32).toString('hex'),
        updatedAt: new Date(),
        updatedBy: username
      });
    } else {
      if (typeof maintenanceMode === 'boolean') {
        setting.maintenanceMode = maintenanceMode;
      }
      if (maintenanceMessage !== undefined) {
        setting.maintenanceMessage = maintenanceMessage;
      }
      setting.updatedAt = new Date();
      setting.updatedBy = username;
    }

    await setting.save();

    res.json({
      message: `Maintenance Mode turned ${setting.maintenanceMode ? 'ON' : 'OFF'} successfully!`,
      setting: {
        maintenanceMode: setting.maintenanceMode,
        maintenanceMessage: setting.maintenanceMessage,
        updatedAt: setting.updatedAt,
        updatedBy: setting.updatedBy
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/settings/preview-token - Get Preview Token & Full URL (Protected)
app.get('/api/settings/preview-token', authMiddleware, async (req, res) => {
  try {
    const setting = await getOrCreateSetting();
    const host = req.get('host') || 'localhost:5173';
    const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const fullPreviewUrl = `${protocol}://${host}/?preview=${setting.previewToken}`;

    res.json({
      previewToken: setting.previewToken,
      fullPreviewUrl,
      updatedAt: setting.updatedAt,
      updatedBy: setting.updatedBy
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/settings/regenerate-preview - Regenerate Cryptographic Token (Protected)
app.post('/api/settings/regenerate-preview', authMiddleware, async (req, res) => {
  try {
    const username = req.user?.username || 'Admin';
    const newToken = crypto.randomBytes(32).toString('hex');

    let setting = await Setting.findOne();
    if (!setting) {
      setting = new Setting({
        maintenanceMode: false,
        maintenanceMessage: 'We are improving the experience for you. Please check back shortly.',
        previewToken: newToken,
        updatedAt: new Date(),
        updatedBy: username
      });
    } else {
      setting.previewToken = newToken;
      setting.updatedAt = new Date();
      setting.updatedBy = username;
    }

    await setting.save();

    const host = req.get('host') || 'localhost:5173';
    const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const fullPreviewUrl = `${protocol}://${host}/?preview=${newToken}`;

    res.json({
      message: 'Preview token regenerated successfully!',
      previewToken: newToken,
      fullPreviewUrl,
      updatedAt: setting.updatedAt,
      updatedBy: setting.updatedBy
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/settings/validate-preview - Validate Preview Token (Public)
app.get('/api/settings/validate-preview', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.json({ valid: false });

    const setting = await getOrCreateSetting();
    const isValid = setting.previewToken === token;
    res.json({ valid: isValid });
  } catch (err) {
    res.json({ valid: false });
  }
});

// ----------------------------------------------------
// 2. PROFILE ROUTES
// ✅ MongoDB is the ONLY source of truth — no in-memory state
// (in-memory state caused flashing: different Vercel instances had different values)
// ----------------------------------------------------

const DEFAULT_MAINTENANCE_MSG = 'We are currently updating our portfolio with fresh projects & case studies. Please check back shortly!';

app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      // No profile yet — default to live (maintenance OFF)
      return res.json({
        name: 'Muhammed',
        role: 'UI/UX Designer & Front-End Developer',
        isMaintenanceMode: false,
        maintenanceMessage: DEFAULT_MAINTENANCE_MSG
      });
    }
    const data = profile.toObject ? profile.toObject() : profile;
    res.json({
      ...data,
      isMaintenanceMode: !!profile.isMaintenanceMode,
      maintenanceMessage: profile.maintenanceMessage || DEFAULT_MAINTENANCE_MSG
    });
  } catch (err) {
    // MongoDB unavailable — omit isMaintenanceMode, client keeps localStorage value
    res.json({
      name: 'Muhammed',
      role: 'UI/UX Designer & Front-End Developer',
      maintenanceMessage: DEFAULT_MAINTENANCE_MSG
      // isMaintenanceMode omitted intentionally — client uses localStorage cache
    });
  }
});

app.put('/api/profile', authMiddleware, async (req, res) => {
  try {
    const updatedData = { ...req.body, updatedAt: new Date() };
    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: updatedData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const saved = profile ? (profile.toObject ? profile.toObject() : profile) : updatedData;
    res.json({
      ...saved,
      isMaintenanceMode: !!saved.isMaintenanceMode,
      maintenanceMessage: saved.maintenanceMessage || DEFAULT_MAINTENANCE_MSG
    });
  } catch (err) {
    // MongoDB failed — still return the intended value so client localStorage is correct
    res.json({
      name: 'Muhammed',
      ...req.body,
      isMaintenanceMode: !!req.body.isMaintenanceMode,
      maintenanceMessage: req.body.maintenanceMessage || DEFAULT_MAINTENANCE_MSG
    });
  }
});


// ----------------------------------------------------
// 3. PROJECTS / CASE STUDIES ROUTES
// ----------------------------------------------------

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', authMiddleware, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 4. FAQ ROUTES
// ----------------------------------------------------

app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/faqs', authMiddleware, async (req, res) => {
  try {
    const faq = new Faq(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/faqs/:id', authMiddleware, async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/faqs/:id', authMiddleware, async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 5. INQUIRIES / CONTACT SUBMISSIONS
// ----------------------------------------------------

app.get('/api/inquiries', authMiddleware, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully!', inquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/inquiries/:id', authMiddleware, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// 6. CLOUDINARY IMAGE UPLOAD ROUTE
// ----------------------------------------------------

app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  try {
    if (req.file && req.file.path) {
      return res.json({ url: req.file.path });
    }
    if (req.file && req.file.buffer) {
      const base64 = req.file.buffer.toString('base64');
      const mime = req.file.mimetype;
      return res.json({ url: `data:${mime};base64,${base64}` });
    }
    res.status(400).json({ message: 'No file uploaded or upload failed.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express server when running locally (not in serverless environment)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Express API Server running on port ${PORT}`);
  });
}

export default app;
