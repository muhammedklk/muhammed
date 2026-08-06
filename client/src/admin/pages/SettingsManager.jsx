import React, { useEffect, useState } from 'react';
import { contentApi } from '../services/api';
import { Shield, Save } from '../components/Icons';

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'Developer Portfolio',
    logoText: 'MUHAMMED',
    contactEmail: 'contact@portfolio.dev',
    contactPhone: '+1 (555) 019-2834',
    location: 'Kochi, Kerala / Remote',
    footerText: '© 2026 Developer Portfolio. All rights reserved.',
    maintenanceMode: false,
    maintenanceMessage: 'We are currently upgrading the portfolio. Please check back soon!',
    previewToken: 'preview-secret-token-12345',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await contentApi.getSettings();
      if (res.data && res.data.data && res.data.data.settings) {
        setSettings({ ...settings, ...res.data.data.settings });
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await contentApi.updateSettings(settings);
      alert('Site Settings and Maintenance Mode updated successfully!');
    } catch (err) {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Site Settings & Maintenance System</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Configure global portfolio branding, contact info, and toggle live Maintenance Mode.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: settings.maintenanceMode ? 'rgba(239, 68, 68, 0.08)' : '#0f172a', border: settings.maintenanceMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Shield size={24} color={settings.maintenanceMode ? '#ef4444' : '#22c55e'} />
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>Maintenance Mode</h3>
                <span style={{ fontSize: '12.5px', color: '#94a3b8' }}>When enabled, non-admin visitors see the maintenance screen.</span>
              </div>
            </div>
            <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                style={{ width: '22px', height: '22px', accentColor: '#ef4444' }}
              />
              <span style={{ fontSize: '14px', fontWeight: '800', color: settings.maintenanceMode ? '#ef4444' : '#22c55e' }}>
                {settings.maintenanceMode ? 'ACTIVE (SITE LOCKED)' : 'OFF (PUBLIC)'}
              </span>
            </label>
          </div>

          {settings.maintenanceMode && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#ef4444', fontWeight: '800', marginBottom: '8px' }}>MAINTENANCE ANNOUNCEMENT MESSAGE</label>
              <textarea
                rows={3}
                value={settings.maintenanceMessage}
                onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
                style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', color: '#ffffff', fontSize: '13.5px' }}
              />
            </div>
          )}
        </div>

        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginBottom: '20px' }}>General Portfolio Settings</h3>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SITE TITLE</label>
              <input type="text" value={settings.siteTitle} onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>LOGO TEXT</label>
              <input type="text" value={settings.logoText} onChange={(e) => setSettings({ ...settings, logoText: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CONTACT EMAIL</label>
              <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CONTACT PHONE</label>
              <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>LOCATION</label>
              <input type="text" value={settings.location} onChange={(e) => setSettings({ ...settings, location: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
          <Save size={18} />
          <span>{saving ? 'Saving Settings...' : 'Save All Settings'}</span>
        </button>
      </form>
    </div>
  );
};

export default SettingsManager;
