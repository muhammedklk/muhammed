const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.join(__dirname, '../.env') });
}

const connectDB = require('./config/db');
const { configureCloudinary } = require('./config/cloudinary');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { successResponse } = require('./utils/apiResponse');

// Initialize Database & Cloudinary Connection
connectDB();
configureCloudinary();

const app = express();
app.set('trust proxy', 1);

// Ensure DB is connected on incoming API requests
app.use(async (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  
  if (req.path === '/api/health' || req.path === '/health') {
    return next();
  }

  const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!dbUri) {
    return res.status(503).json({
      success: false,
      message: 'MONGODB_URI environment variable is missing in Vercel. Please add MONGODB_URI in Vercel Project Settings -> Environment Variables and Redeploy.',
      code: 'MISSING_ENV_VAR'
    });
  }

  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('[DB Connection Error]', err.message);
    return res.status(503).json({
      success: false,
      message: `Database Connection Error: ${err.message}. Please verify MongoDB Atlas IP Network Access allows 0.0.0.0/0.`,
      error: err.message
    });
  }
});

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true); // Allow all origins for Vercel deploys
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Maintenance-Token']
}));

const mongoSanitize = require('./middleware/mongoSanitize');

// Rate Limiters
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: { success: false, message: 'Too many requests, please try again in 15 minutes.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  validate: { xForwardedForHeader: false },
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' }
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  validate: { xForwardedForHeader: false },
  message: { success: false, message: 'Too many messages sent. Please wait 15 minutes before trying again.' }
});

app.use('/api', globalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/contact', contactLimiter);

// Request Logger, Parsers & NoSQL Sanitizer
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mongoSanitize);

// Static uploads directory (for local file uploads fallback)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets/uploads', express.static(path.join(__dirname, '../public/assets/uploads')));

// Health Check API Endpoint
app.get('/api/health', (req, res) => {
  const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  return res.status(200).json({
    success: true,
    message: 'Portfolio CMS API Server running cleanly',
    hasMongoUri: !!dbUri,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'production'
  });
});

// Fallback Root Route
app.get('/api', (req, res) => {
  return successResponse(res, 200, 'Welcome to Portfolio CMS Backend API v1.0');
});

// Maintenance Mode Middleware Guard
app.use(require('./middleware/maintenanceMiddleware'));

// Register API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// 404 & Central Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Express Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
