import React, { useEffect, useState } from 'react';
import { contentApi } from '../services/api';
import { Shield, Save } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';

const SettingsManager = () => {
  const { refreshPortfolio } = usePortfolio();
  const [settings, setSettings] = useState({
    siteTitle: 'Developer Portfolio',
    logoText: 'MUHAMMED',
    contactEmail: 'contact@portfolio.dev',
    contactPhone: '+1 (555) 019-2834',
    location: 'Kochi, Kerala / Remote',
    footerText: '© 2026 Developer Portfolio. All rights reserved.',
    maintenanceMode: false,
    maintenanceMessage: 'We are currently upgrading the portfolio. Please check back soon!',
    maintenancePages: {
      home: false,
      about: false,
      projects: false,
      caseStudy: false,
      services: false,
      contact: false
    }
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await contentApi.getSettings();
      if (res.data && res.data.data && res.data.data.settings) {
        const fetched = res.data.data.settings;
        setSettings(prev => ({
          ...prev,
          ...fetched,
          maintenancePages: {
            home: false,
            about: false,
            projects: false,
            caseStudy: false,
            services: false,
            contact: false,
            ...(fetched.maintenancePages || {})
          }
        }));
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggleGlobalMaintenance = async (isChecked) => {
    const updated = {
      ...settings,
      maintenanceMode: isChecked
    };
    setSettings(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_maintenance_settings', JSON.stringify(updated));
    }
    try {
      await contentApi.updateSettings(updated);
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      setMessage(isChecked ? 'Entire Website Maintenance Mode ENABLED live!' : 'Website Maintenance Mode DISABLED (Public Live)');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to auto-save global maintenance mode:', err);
    }
  };

  const handleTogglePageMaintenance = async (pageKey, isChecked) => {
    const updatedPages = {
      ...(settings.maintenancePages || {}),
      [pageKey]: isChecked
    };
    if (pageKey === 'caseStudy') {
      updatedPages.casestudy = isChecked;
      updatedPages['case-study'] = isChecked;
      updatedPages.casestudies = isChecked;
    }
    const updated = {
      ...settings,
      maintenancePages: updatedPages
    };
    setSettings(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_maintenance_settings', JSON.stringify(updated));
    }
    try {
      await contentApi.updateSettings(updated);
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      setMessage(`Updated ${pageKey} maintenance lock live!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Failed to auto-save page maintenance mode:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_maintenance_settings', JSON.stringify(settings));
      if (settings.contactEmail) {
        localStorage.setItem('portfolio_contact_email', settings.contactEmail);
      }
    }
    if (refreshPortfolio) {
      refreshPortfolio();
    }

    try {
      await contentApi.updateSettings(settings);
      setMessage('Site settings & per-page maintenance modes saved successfully!');
      setTimeout(() => setMessage(''), 3500);
    } catch (err) {
      alert('Failed to save settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const pagesList = [
    { key: 'caseStudy', label: '📖 Case Study Pages Maintenance', desc: 'Lock case study pages with Maintenance screen while editing narrative and mockups' },
    { key: 'home', label: '🏠 Home Page Maintenance', desc: 'Lock main landing page' },
    { key: 'projects', label: '💼 Projects Page Maintenance', desc: 'Lock full works gallery page' },
    { key: 'about', label: '👤 About Page Maintenance', desc: 'Lock about bio and capabilities page' },
    { key: 'contact', label: '📬 Contact Page Maintenance', desc: 'Lock contact inbox & form page' },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a', letterSpacing: '-0.02em' }}>Site Settings & Per-Page Maintenance</h1>
          <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, fontWeight: '500' }}>Configure global branding, contact details, and lock individual pages under maintenance mode.</p>
        </div>
      </div>

      {message && (
        <div style={{ padding: '14px 18px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', borderRadius: '12px', marginBottom: '24px', fontWeight: '700', fontSize: '13.5px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Global Maintenance Mode Box */}
        <div style={{ background: settings.maintenanceMode ? '#fef2f2' : '#ffffff', border: settings.maintenanceMode ? '1px solid #fecaca' : '1px solid #e2e8f0', borderRadius: '24px', padding: '28px', marginBottom: '28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Shield size={26} color={settings.maintenanceMode ? '#ef4444' : '#16a34a'} />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Entire Website Maintenance Mode</h3>
                <span style={{ fontSize: '12.5px', color: '#475569', fontWeight: '500' }}>Locks the whole website for public visitors.</span>
              </div>
            </div>
            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleToggleGlobalMaintenance(e.target.checked)}
                style={{ width: '22px', height: '22px', accentColor: '#ef4444' }}
              />
              <span style={{ fontSize: '14px', fontWeight: '800', color: settings.maintenanceMode ? '#ef4444' : '#16a34a' }}>
                {settings.maintenanceMode ? 'ACTIVE (ALL PAGES LOCKED)' : 'OFF (PUBLIC)'}
              </span>
            </label>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '8px' }}>MAINTENANCE ANNOUNCEMENT MESSAGE</label>
            <textarea
              rows={2}
              value={settings.maintenanceMessage}
              onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
              style={{ width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', color: '#0f172a', fontSize: '13.5px' }}
            />
          </div>
        </div>

        {/* Per-Page Maintenance Toggles Grid */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '28px', marginBottom: '28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Per-Page Maintenance Toggles</h3>
          <p style={{ fontSize: '13px', color: '#475569', marginBottom: '20px', fontWeight: '500' }}>Turn ON maintenance for a specific page while editing it (e.g. Case Study page). Visitors opening that page will see a Maintenance Screen with a "Go Back" button!</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pagesList.map(item => {
              const isLocked = settings.maintenancePages?.[item.key] || false;
              return (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: isLocked ? '#fef2f2' : '#f8fafc', border: isLocked ? '1px solid #fecaca' : '1px solid #e2e8f0', borderRadius: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>{item.label}</h4>
                    <p style={{ fontSize: '12.5px', color: '#475569', margin: 0 }}>{item.desc}</p>
                  </div>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isLocked}
                      onChange={(e) => handleTogglePageMaintenance(item.key, e.target.checked)}
                      style={{ width: '20px', height: '20px', accentColor: '#ef4444' }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: '800', color: isLocked ? '#ef4444' : '#16a34a' }}>
                      {isLocked ? 'LOCKED' : 'ACTIVE'}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Branding & Contact */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '28px', marginBottom: '28px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>General Portfolio Settings</h3>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>SITE TITLE</label>
              <input type="text" value={settings.siteTitle} onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>LOGO TEXT</label>
              <input type="text" value={settings.logoText} onChange={(e) => setSettings({ ...settings, logoText: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>CONTACT EMAIL</label>
              <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>CONTACT PHONE</label>
              <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>LOCATION</label>
              <input type="text" value={settings.location} onChange={(e) => setSettings({ ...settings, location: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: '#0f172a', color: '#ffffff', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '15px', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' }}>
          <Save size={18} />
          <span>{saving ? 'Saving Settings...' : 'Save All Settings & Maintenance'}</span>
        </button>
      </form>
    </div>
  );
};

export default SettingsManager;
