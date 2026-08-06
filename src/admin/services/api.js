const BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Native Fetch Client Wrapper with Bearer Auth & 401 Interceptors
 */
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('cms_token');
  const headers = {
    ...(options.isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    method: options.method || 'GET',
    headers,
    ...options,
  };

  if (options.body && !options.isFormData && typeof options.body !== 'string') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'API Request Failed');
    error.response = { status: response.status, data };
    throw error;
  }

  return { data, status: response.status };
};

const API = {
  get: (url, config) => {
    let endpoint = url;
    if (config?.params) {
      const query = new URLSearchParams(config.params).toString();
      if (query) endpoint += `?${query}`;
    }
    return request(endpoint, { method: 'GET' });
  },
  post: (url, body, config) => request(url, { method: 'POST', body, ...config }),
  put: (url, body, config) => request(url, { method: 'PUT', body, ...config }),
  patch: (url, body, config) => request(url, { method: 'PATCH', body, ...config }),
  delete: (url, config) => request(url, { method: 'DELETE', ...config }),
};

// --- AUTH API ---
export const authApi = {
  login: (credentials) => API.post('/auth/login', credentials),
  registerInitial: (data) => API.post('/auth/register-initial', data),
  getMe: () => API.get('/auth/me'),
  updateDetails: (data) => API.put('/auth/updatedetails', data),
  updatePassword: (data) => API.put('/auth/updatepassword', data),
};

// --- PROJECTS & CASE STUDY API ---
export const projectsApi = {
  getPublic: (params) => API.get('/projects', { params }),
  getBySlug: (slug) => API.get(`/projects/${slug}`),
  getAllAdmin: () => API.get('/projects/admin/all'),
  create: (data) => API.post('/projects', data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  updateCaseStudy: (id, data) => API.put(`/projects/${id}/casestudy`, data),
  delete: (id) => API.delete(`/projects/${id}`),
};

// --- CONTENT MODULES API ---
export const contentApi = {
  getBatchAll: () => API.get('/content/all'),
  getHero: () => API.get('/content/hero'),
  updateHero: (data) => API.put('/content/hero', data),
  getAbout: () => API.get('/content/about'),
  updateAbout: (data) => API.put('/content/about', data),
  getSettings: () => API.get('/content/settings'),
  updateSettings: (data) => API.put('/content/settings', data),
  getSeo: () => API.get('/content/seo'),
  updateSeo: (page, data) => API.put(`/content/seo/${page}`, data),
  getCrud: (module) => API.get(`/content/${module}`),
  createCrud: (module, data) => API.post(`/content/${module}`, data),
  updateCrud: (module, id, data) => API.put(`/content/${module}/${id}`, data),
  deleteCrud: (module, id) => API.delete(`/content/${module}/${id}`),
};

// --- CONTACT INBOX API ---
export const contactApi = {
  submit: (data) => API.post('/contact', data),
  getMessages: (params) => API.get('/contact/messages', { params }),
  toggleRead: (id, isRead) => API.patch(`/contact/messages/${id}/read`, { isRead }),
  replyMessage: (id, replyMessage) => API.post(`/contact/messages/${id}/reply`, { replyMessage }),
  deleteMessage: (id) => API.delete(`/contact/messages/${id}`),
};

// --- MEDIA LIBRARY API ---
export const mediaApi = {
  getAll: () => API.get('/media'),
  upload: (formData) => API.post('/media/upload', formData, { isFormData: true }),
  delete: (id) => API.delete(`/media/${id}`),
};

// --- DASHBOARD API ---
export const dashboardApi = {
  getStats: () => API.get('/dashboard/stats'),
  getLogs: () => API.get('/dashboard/logs'),
};

export default API;
