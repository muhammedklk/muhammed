import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Import raw unchanged project CSS stylesheets
import '../css/style.css';
import '../css/responsive.css';

// ─── Startup: Clear stale caches on new deploy ────────────────────────────
// Each deploy bumps APP_VERSION. On first load after a new deploy,
// all stale localStorage caches are cleared so visitors get fresh data.
const APP_VERSION = '2.2.0';
try {
  const storedVersion = localStorage.getItem('app_version');
  if (storedVersion !== APP_VERSION) {
    localStorage.setItem('app_version', APP_VERSION);
    // Clear stale maintenance flag
    localStorage.removeItem('portfolio_maintenance_status');
    // Clear all stale project caches — ensures fresh data from MongoDB
    localStorage.removeItem('public_works_cache');
    localStorage.removeItem('public_home_works_cache');
    localStorage.removeItem('admin_projects_cached');
    localStorage.removeItem('project_images_store');
    localStorage.removeItem('admin_projects_data');
  }
} catch (_) {}
// ───────────────────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
