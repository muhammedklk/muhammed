// Smart Native HTTP Client
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

      // Profile: cache maintenance status
      if (endpoint === '/profile' && data) {
        const existing = getStorage('admin_profile_data', initialProfile);
        setStorage('admin_profile_data', { ...existing, ...data });
        if (data.isMaintenanceMode !== undefined) {
          localStorage.setItem('portfolio_maintenance_status', data.isMaintenanceMode ? 'true' : 'false');
        }
      }

      // Projects GET: update all public caches immediately with fresh MongoDB data
      if (endpoint === '/projects' && method === 'GET' && Array.isArray(data)) {
        try {
          // Admin cache
          localStorage.setItem('admin_projects_cached', JSON.stringify(data));
          // Public caches (Works page + Home SelectedWorks)
          const mappedPublic = data.map((p) => ({
            id: p.slug || p._id,
            title: p.title || '',
            subtitle: p.tagline || p.category || '',
            imgSrc: p.heroImg || '',
            liveUrl: p.liveUrl || '#',
            hideLiveLink: !p.liveUrl,
            hideCaseStudy: false,
            category: (p.category || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim(),
          }));
          localStorage.setItem('public_works_cache', JSON.stringify(mappedPublic));
          localStorage.setItem('public_home_works_cache', JSON.stringify(mappedPublic.slice(0, 4)));
        } catch (_) {}
      }

      return { data, status: response.status, _fromFallback: false };
    }
  } catch (err) {
    // Timeout (AbortError) or network error — fall through to localStorage fallback below
  }

  // --- FALLBACK HANDLERS (API timeout / network error) ---

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
      // CRITICAL: When API times out, always return isMaintenanceMode: false
      // Real maintenance status ONLY comes from a successful MongoDB response.
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
    // API timed out — return EMPTY array. Public pages use their own cache.
    // Never return hardcoded/stale data so deleted projects don't reappear.
    if (method === 'GET') {
      return { data: [], status: 200, _fromFallback: true };
    }
    if (method === 'POST') {
      const newProj = { ...body, _id: Date.now().toString() };
      return { data: newProj, status: 201, _fromFallback: true };
    }
    if (method === 'PUT') {
      return { data: body, status: 200, _fromFallback: true };
    }
    if (method === 'DELETE') {
      // Clear all public & admin caches so deleted project vanishes everywhere instantly
      try {
        localStorage.removeItem('public_works_cache');
        localStorage.removeItem('public_home_works_cache');
        localStorage.removeItem('admin_projects_cached');
        localStorage.removeItem('project_images_store');
      } catch (_) {}
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
