// Smart Native HTTP Client with complete portfolio project images
const baseURL = import.meta.env.VITE_API_URL || '/api';

// Initial projects synced 100% with website projects & real assets images (with leading /)
const initialProjects = [
  {
    _id: '1',
    slug: 'styleora',
    title: 'Styleora',
    tagline: 'Modern Luxury E-Commerce & Retail Flagship',
    category: 'E-Commerce & Fashion',
    services: 'UI/UX & Frontend Development',
    client: 'Styleora Studio',
    year: '2026',
    liveUrl: 'https://styleorashop.vercel.app/',
    heroImg: '/assets/portfolio/1-styleora.jpg',
    showcaseImg: '/assets/portfolio/gyogrea.png',
    mobileImg1: '/assets/portfolio/1-styleora.jpg',
    mobileImg2: '/assets/portfolio/2-elve.jpg',
    bannerImg: '/assets/portfolio/1-styleora.jpg',
    descriptionParagraph1: 'Styleora is an ultra-minimalist e-commerce digital flagship tailored for luxury apparel, haute couture, and premium fashion accessories.',
    descriptionParagraph2: 'The system highlights an intuitive product gallery grid, instant multi-attribute filter drawers, seamless dark and light mode aesthetics, and an optimized single-step cart checkout experience.',
    description: [
      'Styleora is an ultra-minimalist e-commerce digital flagship tailored for luxury apparel, haute couture, and premium fashion accessories.',
      'The system highlights an intuitive product gallery grid, instant multi-attribute filter drawers, seamless dark and light mode aesthetics, and an optimized single-step cart checkout experience.'
    ],
    techTags: 'Figma, React, SCSS, Tailwind, Vercel',
    outcome: 'Engineered a high-conversion digital boutique layout with refined typography and responsive product drawers.'
  },
  {
    _id: '2',
    slug: 'elve',
    title: 'Elve',
    tagline: 'Next-Gen Vehicle & Asset Rental Platform',
    category: 'Rental & Mobility',
    services: 'UI/UX Design & Development',
    client: 'Elve Mobility',
    year: '2025',
    liveUrl: 'https://elve.vercel.app/',
    heroImg: '/assets/portfolio/2-elve.jpg',
    showcaseImg: '/assets/portfolio/2-elve.jpg',
    mobileImg1: '/assets/portfolio/2-elve.jpg',
    mobileImg2: '/assets/portfolio/1-styleora.jpg',
    bannerImg: '/assets/portfolio/2-elve.jpg',
    descriptionParagraph1: 'Elve is a sleek mobility rental platform engineered for effortless online fleet discovery, real-time availability checks, and instant vehicle reservations.',
    descriptionParagraph2: 'Featuring interactive specification cards, custom date selection calendars, and category filtering, Elve simplifies complex rental logistics into an intuitive user journey.',
    description: [
      'Elve is a sleek mobility rental platform engineered for effortless online fleet discovery, real-time availability checks, and instant vehicle reservations.',
      'Featuring interactive specification cards, custom date selection calendars, and category filtering, Elve simplifies complex rental logistics into an intuitive user journey.'
    ],
    techTags: 'Figma, React, Node.js, Vercel',
    outcome: 'Simplified multi-step reservation flows into a frictionless single-page booking experience.'
  },
  {
    _id: '3',
    slug: 'greentrack',
    title: 'Green Track',
    tagline: 'Eco-Tracking & Sustainability Analytics Dashboard',
    category: 'SaaS & Analytics',
    services: 'UI/UX Design & Development',
    client: 'GreenTrack Eco',
    year: '2025',
    liveUrl: 'https://greentrack-ten.vercel.app/',
    heroImg: '/assets/portfolio/3-greentrack.jpg',
    showcaseImg: '/assets/portfolio/3-greentrack.jpg',
    mobileImg1: '/assets/portfolio/3-greentrack.jpg',
    mobileImg2: '/assets/portfolio/gyogrea.png',
    bannerImg: '/assets/portfolio/3-greentrack.jpg',
    descriptionParagraph1: 'Green Track is an advanced environmental analytics dashboard created to help enterprises and individuals track carbon footprints and sustainability metrics in real time.',
    descriptionParagraph2: 'Through visual chart widgets, color-coded status badges, and interactive progress timelines, complex environmental datasets are converted into clear, actionable insights.',
    description: [
      'Green Track is an advanced environmental analytics dashboard created to help enterprises and individuals track carbon footprints and sustainability metrics in real time.',
      'Through visual chart widgets, color-coded status badges, and interactive progress timelines, complex environmental datasets are converted into clear, actionable insights.'
    ],
    techTags: 'Figma, Chart.js, React, SCSS',
    outcome: 'Transformed complex sustainability metrics into clean dashboard visualizations.'
  },
  {
    _id: '4',
    slug: 'voyagera',
    title: 'Voyagera',
    tagline: 'World Expeditions & Luxury Havens Travel Platform',
    category: 'Travel & Hospitality',
    services: 'UI/UX & Web Development',
    client: 'Voyagera Group',
    year: '2026',
    liveUrl: 'https://voyageratravel.vercel.app/',
    heroImg: '/assets/portfolio/gyogrea.png',
    showcaseImg: '/assets/portfolio/gyogrea.png',
    mobileImg1: '/assets/portfolio/3-greentrack.jpg',
    mobileImg2: '/assets/portfolio/2-elve.jpg',
    bannerImg: '/assets/portfolio/gyogrea.png',
    descriptionParagraph1: 'Voyagera is a next-generation luxury travel expedition platform engineered to connect discerning global explorers with handpicked luxury retreats and sacred sanctuaries around the globe.',
    descriptionParagraph2: 'Built with a strong focus on immersive visual storytelling, fluid interactive destination filtering, and frictionless reservation workflows, the application balances rich photography with crisp typography and modern component architecture.',
    description: [
      'Voyagera is a next-generation luxury travel expedition platform engineered to connect discerning global explorers with handpicked luxury retreats and sacred sanctuaries around the globe.',
      'Built with a strong focus on immersive visual storytelling, fluid interactive destination filtering, and frictionless reservation workflows, the application balances rich photography with crisp typography and modern component architecture.'
    ],
    techTags: 'Figma, React, GSAP, Lenis Scroll',
    outcome: 'Delivered a 99+ PageSpeed rating with 45% increase in session duration.'
  },
  {
    _id: '5',
    slug: 'travelgallery',
    title: 'Travell Gallery',
    tagline: 'Interactive Destination Showcase & Visual Stories',
    category: 'Travel & Media',
    services: 'UI/UX Design & Interactive Frontend',
    client: 'Travell Media',
    year: '2024',
    liveUrl: 'https://voyageratravel.vercel.app/',
    heroImg: '/assets/portfolio/4-travellgallery.jpg',
    showcaseImg: '/assets/portfolio/4-travellgallery.jpg',
    mobileImg1: '/assets/portfolio/4-travellgallery.jpg',
    mobileImg2: '/assets/portfolio/1-styleora.jpg',
    bannerImg: '/assets/portfolio/4-travellgallery.jpg',
    descriptionParagraph1: 'Travell Gallery is an immersive visual showcase highlighting landscape photography and destination stories.',
    description: ['Travell Gallery is an immersive visual showcase highlighting landscape photography and destination stories.'],
    techTags: 'Figma, React, Lightbox API',
    outcome: 'Achieved seamless high-resolution image loading with zero layout shift.'
  },
  {
    _id: '6',
    slug: 'iconehotel',
    title: 'Icone Hotel Booking',
    tagline: 'Luxury Boutique Hotel Mobile & Web Application',
    category: 'Hospitality',
    services: 'Mobile UI/UX & Web App',
    client: 'Icone Hotels',
    year: '2024',
    liveUrl: 'https://styleorashop.vercel.app/',
    heroImg: '/assets/portfolio/5-icone-hotel-booking.jpg',
    showcaseImg: '/assets/portfolio/5-icone-hotel-booking.jpg',
    mobileImg1: '/assets/portfolio/5-icone-hotel-booking.jpg',
    mobileImg2: '/assets/portfolio/2-elve.jpg',
    bannerImg: '/assets/portfolio/5-icone-hotel-booking.jpg',
    descriptionParagraph1: 'Icone Hotel is a mobile-first suite booking app designed for luxury boutique stays.',
    description: ['Icone Hotel is a mobile-first suite booking app designed for luxury boutique stays.'],
    techTags: 'Figma, Mobile React, Node.js',
    outcome: 'Created an award-worthy hospitality mobile UI.'
  },
  {
    _id: '7',
    slug: 'modernbrand',
    title: 'Modern Brand',
    tagline: 'Brand Identity & Digital Design System',
    category: 'Branding & Systems',
    services: 'Brand Strategy & UI System',
    client: 'Modern Brand Co.',
    year: '2024',
    liveUrl: 'https://styleorashop.vercel.app/',
    heroImg: '/assets/portfolio/7-modernbrand.jpg',
    showcaseImg: '/assets/portfolio/7-modernbrand.jpg',
    mobileImg1: '/assets/portfolio/7-modernbrand.jpg',
    mobileImg2: '/assets/portfolio/3-greentrack.jpg',
    bannerImg: '/assets/portfolio/7-modernbrand.jpg',
    descriptionParagraph1: 'A comprehensive design system and visual identity guide created for modern tech agencies.',
    description: ['A comprehensive design system and visual identity guide created for modern tech agencies.'],
    techTags: 'Figma, Design Tokens, Storybook',
    outcome: 'Provided a cohesive, scalable brand identity system.'
  },
  {
    _id: '8',
    slug: 'chrona',
    title: 'Chrona',
    tagline: 'Time Tracking & Workflow Optimization Platform',
    category: 'SaaS Productivity',
    services: 'UI/UX & Web Development',
    client: 'Chrona Tech',
    year: '2024',
    liveUrl: 'https://greentrack-ten.vercel.app/',
    heroImg: '/assets/portfolio/6-chrona.jpg',
    showcaseImg: '/assets/portfolio/6-chrona.jpg',
    mobileImg1: '/assets/portfolio/6-chrona.jpg',
    mobileImg2: '/assets/portfolio/2-elve.jpg',
    bannerImg: '/assets/portfolio/6-chrona.jpg',
    descriptionParagraph1: 'Chrona is a productivity web application that enables remote teams to track project hours.',
    description: ['Chrona is a productivity web application that enables remote teams to track project hours.'],
    techTags: 'Figma, React, Redux, Node.js',
    outcome: 'Streamlined daily workflow tracking into a simple, beautiful interface.'
  }
];

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

const request = async (method, endpoint, body = null, config = {}) => {
  const token = localStorage.getItem('admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(config.headers || {})
  };

  if (body instanceof FormData) {
    delete headers['Content-Type'];
  }

  try {
    const controller = new AbortController();
    // GET: 15s timeout (gives Vercel cold start enough time to query MongoDB). PUT/POST/DELETE: 25s
    const timeoutMs = method === 'GET' ? 15000 : 25000;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(`${baseURL}${endpoint}`, {
      method,
      headers,
      signal: controller.signal,
      ...(body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {})
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (endpoint === '/profile' && data) {
        const existing = getStorage('admin_profile_data', initialProfile);
        setStorage('admin_profile_data', { ...existing, ...data });
        if (data.isMaintenanceMode !== undefined) {
          localStorage.setItem('portfolio_maintenance_status', data.isMaintenanceMode ? 'true' : 'false');
        }
      }
      return { data, status: response.status, _fromFallback: false };
    }
  } catch (err) {
    // Timeout (AbortError) or network error — fall through to localStorage fallback below
  }

  // --- LOCAL DEV FALLBACK HANDLERS ---
  if (endpoint === '/auth/login' && method === 'POST') {
    const username = body?.username;
    const password = body?.password;

    if ((username === 'admin' && password === 'admin123') || (username === 'admin' && password === 'admin')) {
      return {
        data: {
          token: 'mock_jwt_admin_token_2026',
          user: { username: 'admin', role: 'admin' }
        },
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
          reader.onloadend = () => {
            resolve({ data: { url: reader.result }, status: 200 });
          };
          reader.onerror = () => {
            resolve({ data: { url: '' }, status: 400 });
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }

  if (endpoint === '/profile') {
    if (method === 'GET') {
      const profile = getStorage('admin_profile_data', initialProfile);
      // CRITICAL: When API times out (fallback), always return isMaintenanceMode: false
      // This prevents stale localStorage from permanently blocking the site.
      // Real maintenance status ONLY comes from a successful MongoDB response (not _fromFallback).
      return { data: { ...profile, isMaintenanceMode: false }, status: 200, _fromFallback: true };
    }
    if (method === 'PUT') {
      const existing = getStorage('admin_profile_data', initialProfile);
      const updatedProfile = { ...existing, ...body };
      setStorage('admin_profile_data', updatedProfile);
      return { data: updatedProfile, status: 200 };
    }
  }

  if (endpoint.startsWith('/projects')) {
    let projects = getStorage('admin_projects_data', initialProjects);
    if (method === 'GET') {
      return { data: projects, status: 200, _fromFallback: true };
    }
    if (method === 'POST') {
      const newProj = { ...body, _id: Date.now().toString() };
      projects.push(newProj);
      setStorage('admin_projects_data', projects);
      return { data: newProj, status: 201, _fromFallback: true };
    }
    if (method === 'PUT') {
      const id = endpoint.split('/')[2];
      projects = projects.map((p) => (p._id === id ? { ...p, ...body } : p));
      setStorage('admin_projects_data', projects);
      return { data: body, status: 200, _fromFallback: true };
    }
    if (method === 'DELETE') {
      const id = endpoint.split('/')[2];
      projects = projects.filter((p) => p._id !== id);
      setStorage('admin_projects_data', projects);
      return { data: { message: 'Deleted' }, status: 200, _fromFallback: true };
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

  if (endpoint === '/upload' && method === 'POST') {
    return { data: { url: '/assets/portfolio/gyogrea.png' }, status: 200 };
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
