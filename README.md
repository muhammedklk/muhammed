# Dynamic Portfolio CMS — Production Architecture

Full-stack, production-ready Portfolio Content Management System (CMS) with an enterprise Express/MongoDB backend and a sleek React/Vite frontend.

---

## Architecture Overview

```
portfolio/
├── client/                     # Frontend (React + Vite + GSAP + Lenis)
│   ├── src/                    # React components, pages, hooks, context
│   ├── public/                 # Static public assets
│   ├── package.json            # Client dependencies & scripts
│   └── vite.config.js          # Vite build & proxy configuration
│
├── server/                     # Backend API (Node.js + Express + MongoDB + Cloudinary)
│   ├── config/                 # Database (db.js) & Cloudinary (cloudinary.js)
│   ├── controllers/            # Request handlers (MVC)
│   ├── middleware/             # Security, Auth, Rate Limiting, Error Handling
│   ├── models/                 # Mongoose Data Schemas
│   ├── routes/                 # Express API Endpoint Routes
│   ├── services/               # Business Logic Services
│   ├── utils/                  # API Formatters & Helpers
│   ├── validators/             # Express Validator schemas
│   ├── uploads/                # Local asset fallback storage
│   ├── server.js               # Main Express application entrypoint
│   ├── package.json            # Server dependencies
│   └── .env.example            # Backend environment configuration template
│
├── api/
│   └── index.js                # Vercel Serverless Function bridge
│
├── vercel.json                 # Vercel deployment configuration
└── README.md                   # Project documentation
```

---

## Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Animations & Smooth Scroll**: GSAP + Lenis Scroll

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs password hashing
- **Media Storage**: Cloudinary SDK + Multer
- **Security**: Helmet, CORS, Express Rate Limit, Input Sanitization

### Deployment
- **Client**: Vercel Static Hosting (`client/`)
- **Backend API**: Vercel Serverless Functions (`api/index.js`)
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary

---

## Local Development Setup

1. **Backend Setup**:
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update MONGODB_URI and JWT_SECRET in .env
   npm run dev
   ```

2. **Frontend Setup**:
   ```bash
   # From project root or client folder:
   cd client
   npm install
   npm run dev
   ```

3. **Verify API Health**:
   - `GET http://localhost:5000/api/health`
