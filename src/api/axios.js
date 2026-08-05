// Pure Client-Side HTTP Client & Storage Engine
const baseURL = import.meta.env.VITE_API_URL || '/api';

const initialProfile = {
  name: 'Muhammed',
  role: 'UI/UX Designer & Front-End Developer',
  heroHeading1: 'Bringing ideas',
  heroHeading2: 'to life',
  heroHeading3: 'through design',
  heroDescription: 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products.',
  aboutHeadline: 'Helping brand achieve digital mastery of creative innovation and strategic planning',
  aboutBio: 'Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.',
  location: 'Kerala, India (Remote Worldwide)',
  email: 'muhammedklkm@gmail.com',
  phone: '+91 9656216086',
  cvUrl: '/assets/cv/Muhammed_K_Resume.pdf',
  socials: {
    linkedin: 'https://www.linkedin.com/in/muhammed-klkm/',
    github: 'https://github.com/muhammedklk',
    instagram: 'https://www.instagram.com/___muhammedk/'
  },
  isMaintenanceMode: false,
  maintenanceMessage: 'We are currently updating our portfolio with fresh projects & case studies. Please check back shortly!'
};

const defaultProjects = [
  {
    _id: '1',
    slug: 'styleora-fashion-e-commerce',
    title: 'StyleOra — Fashion E-Commerce',
    tagline: 'Modern, high-converting digital shopping experience for fashion brands',
    category: 'ui-ux-design',
    services: 'UI/UX Design & Development',
    client: 'StyleOra Apparel',
    year: '2026',
    liveUrl: 'https://styleora.vercel.app',
    heroImg: '/assets/portfolio/1-styleora.jpg',
    showcaseImg: '/assets/portfolio/1-styleora.jpg',
    mobileImg1: '/assets/portfolio/1-styleora.jpg',
    mobileImg2: '/assets/portfolio/1-styleora.jpg',
    bannerImg: '/assets/portfolio/1-styleora.jpg',
    descriptionParagraph1: 'StyleOra is an end-to-end luxury fashion e-commerce web platform designed with high aesthetics and smooth user interactions.',
    descriptionParagraph2: 'Built with pixel-perfect attention to typography, micro-animations, and fluid layout navigation.',
    techTags: 'Figma, React, SCSS, Motion',
    outcome: 'Boosted visual engagement and cart conversion rates by 35%.',
    featured: true
  },
  {
    _id: '2',
    slug: 'elve-creative-agency-portfolio',
    title: 'Elve — Creative Agency Portfolio',
    tagline: 'Bold, minimal agency website designed for high-impact creative storytelling',
    category: 'web-design',
    services: 'Web Design & Brand Systems',
    client: 'Elve Studio',
    year: '2026',
    liveUrl: 'https://elve-studio.vercel.app',
    heroImg: '/assets/portfolio/2-elve.jpg',
    showcaseImg: '/assets/portfolio/2-elve.jpg',
    mobileImg1: '/assets/portfolio/2-elve.jpg',
    mobileImg2: '/assets/portfolio/2-elve.jpg',
    bannerImg: '/assets/portfolio/2-elve.jpg',
    descriptionParagraph1: 'Elve Studio is a digital creative agency portfolio showcasing modern visual designs, dark themes, and smooth interactive web motion.',
    descriptionParagraph2: 'Designed to elevate brand positioning and capture international client leads.',
    techTags: 'React, GSAP, Lenis, SCSS',
    outcome: 'Increased client inquiry conversion by 40%.',
    featured: true
  },
  {
    _id: '3',
    slug: 'greentrack-sustainability-dashboard',
    title: 'GreenTrack — Sustainability Dashboard',
    tagline: 'Real-time carbon footprint analytics & ESG reporting dashboard for enterprises',
    category: 'dashboard-ui',
    services: 'Product Design & UI/UX',
    client: 'GreenTrack Global',
    year: '2025',
    liveUrl: 'https://greentrack.vercel.app',
    heroImg: '/assets/portfolio/3-greentrack.jpg',
    showcaseImg: '/assets/portfolio/3-greentrack.jpg',
    mobileImg1: '/assets/portfolio/3-greentrack.jpg',
    mobileImg2: '/assets/portfolio/3-greentrack.jpg',
    bannerImg: '/assets/portfolio/3-greentrack.jpg',
    descriptionParagraph1: 'GreenTrack is an intuitive SaaS data visualization platform monitoring carbon emission data across enterprise supply chains.',
    descriptionParagraph2: 'Clean data hierarchy, charts, and dark-mode aesthetic for high usability.',
    techTags: 'React, Chart.js, Tailwind CSS',
    outcome: 'Streamlined ESG data reporting for over 50 enterprise accounts.',
    featured: true
  },
  {
    _id: '4',
    slug: 'travelgallery-curated-destinations',
    title: 'TravelGallery — Curated Destinations',
    tagline: 'Immersive travel discovery portal featuring interactive maps and booking flows',
    category: 'web-design',
    services: 'UI/UX & Mobile Design',
    client: 'TravelGallery Inc',
    year: '2025',
    liveUrl: 'https://travelgallery.vercel.app',
    heroImg: '/assets/portfolio/4-travellgallery.jpg',
    showcaseImg: '/assets/portfolio/case-study/travel-gallery.jpg',
    mobileImg1: '/assets/portfolio/4-travellgallery.jpg',
    mobileImg2: '/assets/portfolio/4-travellgallery.jpg',
    bannerImg: '/assets/portfolio/4-travellgallery.jpg',
    descriptionParagraph1: 'TravelGallery provides visual discovery of world-class travel destinations with seamless trip planning workflows.',
    descriptionParagraph2: 'Optimized performance and mobile-first responsive design.',
    techTags: 'Figma, React, Vite',
    outcome: 'Achieved 98+ Google Lighthouse performance score.',
    featured: true
  },
  {
    _id: '5',
    slug: 'icone-luxury-hotel-booking',
    title: 'Icone — Luxury Hotel Booking',
    tagline: 'Premium boutique hotel reservation system with interactive suite visualizers',
    category: 'web-design',
    services: 'UI/UX & Frontend Development',
    client: 'Icone Hospitality',
    year: '2025',
    liveUrl: 'https://icone-hotel.vercel.app',
    heroImg: '/assets/portfolio/5-icone-hotel-booking.jpg',
    showcaseImg: '/assets/portfolio/case-study/icon-hotel.jpg',
    mobileImg1: '/assets/portfolio/5-icone-hotel-booking.jpg',
    mobileImg2: '/assets/portfolio/5-icone-hotel-booking.jpg',
    bannerImg: '/assets/portfolio/5-icone-hotel-booking.jpg',
    descriptionParagraph1: 'Icone Hotel offers high-end hospitality booking with fluid transitions, room customization, and instant reservation confirmation.',
    descriptionParagraph2: 'Elegantly crafted dark glassmorphic design system.',
    techTags: 'React, CSS Modules, Framer Motion',
    outcome: 'Elevated direct guest bookings by 50%.',
    featured: false
  },
  {
    _id: '6',
    slug: 'chrona-ai-time-management-app',
    title: 'Chrona — AI Time Management App',
    tagline: 'Smart schedule optimizer and focus productivity assistant for professionals',
    category: 'dashboard-ui',
    services: 'Mobile UI/UX & Web App Design',
    client: 'Chrona Labs',
    year: '2025',
    liveUrl: 'https://chrona.vercel.app',
    heroImg: '/assets/portfolio/6-chrona.jpg',
    showcaseImg: '/assets/portfolio/6-chrona.jpg',
    mobileImg1: '/assets/portfolio/6-chrona.jpg',
    mobileImg2: '/assets/portfolio/6-chrona.jpg',
    bannerImg: '/assets/portfolio/6-chrona.jpg',
    descriptionParagraph1: 'Chrona helps remote teams and creators manage deep work sessions using AI workload prediction.',
    descriptionParagraph2: 'Modern, minimalist mobile UI layout with intuitive micro-interactions.',
    techTags: 'Figma, React Native, React',
    outcome: 'Featured on Product Hunt Top 5 Apps of the week.',
    featured: false
  },
  {
    _id: '7',
    slug: 'modernbrand-identity-system',
    title: 'ModernBrand — Design System',
    tagline: 'Comprehensive visual identity and component library for tech startups',
    category: 'branding',
    services: 'Branding & Design System',
    client: 'ModernBrand Co',
    year: '2025',
    liveUrl: 'https://modernbrand.vercel.app',
    heroImg: '/assets/portfolio/7-modernbrand.jpg',
    showcaseImg: '/assets/portfolio/case-study/modernbrand.jpg',
    mobileImg1: '/assets/portfolio/7-modernbrand.jpg',
    mobileImg2: '/assets/portfolio/7-modernbrand.jpg',
    bannerImg: '/assets/portfolio/7-modernbrand.jpg',
    descriptionParagraph1: 'ModernBrand design system unifies digital brand identity across web, mobile, and marketing touchpoints.',
    descriptionParagraph2: 'Includes accessible color palettes, custom iconography, and scalable UI guidelines.',
    techTags: 'Figma, Design Tokens, React',
    outcome: 'Adopted across 12 digital product teams.',
    featured: false
  }
];

const getStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (Array.isArray(fallback) && (!Array.isArray(parsed) || parsed.length === 0)) {
      return fallback;
    }
    return parsed;
  } catch (e) {
    return fallback;
  }
};

const setStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {}
};

// Pure static client request handler (instant responses from localStorage)
const request = async (method, endpoint, body = null, config = {}) => {
  const token = localStorage.getItem('admin_token');

  // Attempt rapid fetch only if an external custom API URL is configured
  if (import.meta.env.VITE_API_URL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000);
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(config.headers || {})
      };
      if (body instanceof FormData) delete headers['Content-Type'];

      const response = await fetch(`${baseURL}${endpoint}`, {
        method,
        headers,
        signal: controller.signal,
        ...(body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {})
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        return { data, status: response.status, _fromFallback: false };
      }
    } catch (_) {}
  }

  // --- INSTANT CLIENT-SIDE LOCAL STORAGE HANDLERS ---

  if (endpoint === '/auth/login' && method === 'POST') {
    const username = body?.username;
    const password = body?.password;
    if ((username === 'admin' && password === 'admin123') || (username === 'admin' && password === 'admin')) {
      return {
        data: { token: 'mock_jwt_admin_token_2026', user: { username: 'admin', role: 'admin' } },
        status: 200
      };
    } else {
      const err = new Error('Invalid username or password credentials.');
      err.response = { status: 400, data: { message: 'Invalid username or password credentials.' } };
      throw err;
    }
  }

  if (endpoint === '/auth/me' && method === 'GET') {
    if (token) {
      return { data: { user: { username: 'admin', role: 'admin' } }, status: 200 };
    } else {
      const err = new Error('Unauthorized');
      err.response = { status: 401, data: { message: 'Unauthorized' } };
      throw err;
    }
  }

  if (endpoint === '/upload' && method === 'POST') {
    if (body instanceof FormData && body.get('image')) {
      const file = body.get('image');
      if (file && file instanceof File) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => { resolve({ data: { url: reader.result }, status: 200 }); };
          reader.onerror = () => { resolve({ data: { url: '' }, status: 400 }); };
          reader.readAsDataURL(file);
        });
      }
    }
  }

  if (endpoint === '/profile') {
    if (method === 'GET') {
      const profile = getStorage('admin_profile_data', initialProfile);
      return { data: { ...profile, isMaintenanceMode: false }, status: 200, _fromFallback: false };
    }
    if (method === 'PUT') {
      const existing = getStorage('admin_profile_data', initialProfile);
      const updatedProfile = { ...existing, ...body };
      setStorage('admin_profile_data', updatedProfile);
      return { data: updatedProfile, status: 200 };
    }
  }

  if (endpoint.startsWith('/projects')) {
    let projectsList = getStorage('admin_projects_data', defaultProjects);
    if (method === 'GET') {
      return { data: projectsList, status: 200, _fromFallback: false };
    }
    if (method === 'POST') {
      const newProj = { ...body, _id: Date.now().toString() };
      projectsList.unshift(newProj);
      setStorage('admin_projects_data', projectsList);
      return { data: newProj, status: 201, _fromFallback: false };
    }
    if (method === 'PUT') {
      const id = body._id || endpoint.split('/')[2];
      projectsList = projectsList.map((p) => (p._id === id ? { ...p, ...body } : p));
      setStorage('admin_projects_data', projectsList);
      return { data: body, status: 200, _fromFallback: false };
    }
    if (method === 'DELETE') {
      const id = endpoint.split('/')[2];
      projectsList = projectsList.filter((p) => p._id !== id);
      setStorage('admin_projects_data', projectsList);
      try {
        localStorage.removeItem('public_works_cache');
        localStorage.removeItem('public_home_works_cache');
        localStorage.removeItem('admin_projects_cached');
      } catch (_) {}
      return { data: { message: 'Deleted' }, status: 200, _fromFallback: false };
    }
  }

  if (endpoint.startsWith('/faqs')) {
    let faqs = getStorage('admin_faqs_data', [
      { _id: '1', question: 'What design services do you offer?', answer: 'We provide full-suite digital solutions including UI/UX design, custom web & mobile app development, brand identity, and interactive prototyping.' },
      { _id: '2', question: 'What is your typical project workflow?', answer: 'Our process follows four key steps: Discovery & Research, Wireframing & Prototyping, High-Fidelity UI/UX & Development, followed by Testing, Launch & Support.' },
      { _id: '3', question: 'How long does a standard project take?', answer: 'Timelines depend on scope. Typical UI/UX design projects take 2 to 4 weeks, while complete end-to-end web applications take 4 to 8 weeks.' }
    ]);
    if (method === 'GET') return { data: faqs, status: 200 };
    if (method === 'POST') {
      const newFaq = { ...body, _id: Date.now().toString() };
      faqs.push(newFaq);
      setStorage('admin_faqs_data', faqs);
      return { data: newFaq, status: 201 };
    }
    if (method === 'DELETE') {
      const id = endpoint.split('/')[2];
      faqs = faqs.filter((f) => f._id !== id);
      setStorage('admin_faqs_data', faqs);
      return { data: { message: 'Deleted' }, status: 200 };
    }
  }

  if (endpoint.startsWith('/inquiries')) {
    let inquiries = getStorage('admin_inquiries_data', []);
    if (method === 'GET') return { data: inquiries, status: 200 };
    if (method === 'POST') {
      const newInquiry = { ...body, _id: Date.now().toString(), createdAt: new Date().toISOString() };
      inquiries.unshift(newInquiry);
      setStorage('admin_inquiries_data', inquiries);
      return { data: newInquiry, status: 201 };
    }
    if (method === 'DELETE') {
      const id = endpoint.split('/')[2];
      inquiries = inquiries.filter((i) => i._id !== id);
      setStorage('admin_inquiries_data', inquiries);
      return { data: { message: 'Deleted' }, status: 200 };
    }
  }

  if (endpoint.startsWith('/settings')) {
    const defaultSettings = getStorage('admin_site_settings', {
      maintenanceMode: false,
      maintenanceMessage: 'We are improving the experience for you. Please check back shortly.',
      previewToken: '8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a',
      updatedAt: new Date().toISOString(),
      updatedBy: 'Admin'
    });

    if (endpoint === '/settings') {
      return {
        data: {
          maintenanceMode: !!defaultSettings.maintenanceMode,
          maintenanceMessage: defaultSettings.maintenanceMessage,
          updatedAt: defaultSettings.updatedAt,
          updatedBy: defaultSettings.updatedBy
        },
        status: 200,
        _fromFallback: false
      };
    }

    if (endpoint === '/settings/maintenance') {
      const updated = {
        ...defaultSettings,
        ...(body?.maintenanceMode !== undefined ? { maintenanceMode: !!body.maintenanceMode } : {}),
        ...(body?.maintenanceMessage !== undefined ? { maintenanceMessage: body.maintenanceMessage } : {}),
        updatedAt: new Date().toISOString(),
        updatedBy: 'Admin'
      };
      setStorage('admin_site_settings', updated);
      return {
        data: {
          message: `Maintenance Mode turned ${updated.maintenanceMode ? 'ON' : 'OFF'} successfully!`,
          setting: updated
        },
        status: 200
      };
    }

    if (endpoint === '/settings/preview-token') {
      const host = window.location.host || 'localhost:5173';
      const protocol = window.location.protocol || 'http:';
      return {
        data: {
          previewToken: defaultSettings.previewToken,
          fullPreviewUrl: `${protocol}//${host}/?preview=${defaultSettings.previewToken}`,
          updatedAt: defaultSettings.updatedAt,
          updatedBy: defaultSettings.updatedBy
        },
        status: 200
      };
    }

    if (endpoint === '/settings/regenerate-preview') {
      const newToken = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      const host = window.location.host || 'localhost:5173';
      const protocol = window.location.protocol || 'http:';
      const updated = {
        ...defaultSettings,
        previewToken: newToken,
        updatedAt: new Date().toISOString(),
        updatedBy: 'Admin'
      };
      setStorage('admin_site_settings', updated);
      return {
        data: {
          message: 'Preview token regenerated successfully!',
          previewToken: newToken,
          fullPreviewUrl: `${protocol}//${host}/?preview=${newToken}`,
          updatedAt: updated.updatedAt,
          updatedBy: updated.updatedBy
        },
        status: 200
      };
    }

    if (endpoint.startsWith('/settings/validate-preview')) {
      const urlParams = new URLSearchParams(endpoint.split('?')[1] || '');
      const queryToken = urlParams.get('token');
      return {
        data: { valid: queryToken === defaultSettings.previewToken },
        status: 200
      };
    }
  }

  return { data: {}, status: 200 };
};

const api = {
  get: (url, config) => request('GET', url, null, config),
  post: (url, data, config) => request('POST', url, data, config),
  put: (url, data, config) => request('PUT', url, data, config),
  delete: (url, config) => request('DELETE', url, null, config),
  interceptors: { request: { use: () => {} } }
};

export default api;
