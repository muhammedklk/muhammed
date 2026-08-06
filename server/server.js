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

// Ensure DB is connected on incoming API requests
app.use(async (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  await connectDB();
  next();
});

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Allow for Vercel preview deploys
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Maintenance-Token']
}));

const mongoSanitize = require('./middleware/mongoSanitize');

// Rate Limiters
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again in 15 minutes.' }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { success: false, message: 'Too many login attempts. Please try again after 15 minutes.' }
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
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
  return successResponse(res, 200, 'Portfolio CMS API Server running cleanly', {
    status: 'online',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
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
