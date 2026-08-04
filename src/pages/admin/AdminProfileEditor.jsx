import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { setMaintenanceMode } from '../../utils/maintenanceStatus';

const AdminProfileEditor = () => {
  const [profile, setProfile] = useState({
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
    cvUrl: 'assets/cv/Muhammed_K_Resume.pdf',
    socials: {
      linkedin: 'https://www.linkedin.com/in/muhammed-klkm/',
      github: 'https://github.com/muhammedklk',
      instagram: 'https://www.instagram.com/___muhammedk/'
    },
    isMaintenanceMode: false,
    maintenanceMessage: 'We are currently updating our portfolio with fresh projects & case studies. Please check back shortly!'
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        if (res.data) {
          setProfile((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');

    try {
      await api.put('/profile', profile);
      await setMaintenanceMode(!!profile.isMaintenanceMode, profile.maintenanceMessage);
      setFeedback('Profile updated successfully!');
      setTimeout(() => setFeedback(''), 4000);
    } catch (err) {
      setFeedback('Failed to update profile: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>Profile & Hero Settings</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Update hero headlines, bio, contact details, and social links displayed across the site
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #d2ea26 0%, #a3b814 100%)',
            color: '#0f172a',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: saving ? 'not-allowed' : 'pointer'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      {feedback && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#10b981',
          padding: '14px 20px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: Hero Settings */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0', color: '#d2ea26' }}>Hero Section Config</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Hero Line 1</label>
              <input
                type="text"
                value={profile.heroHeading1}
                onChange={(e) => setProfile({ ...profile, heroHeading1: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Hero Line 2</label>
              <input
                type="text"
                value={profile.heroHeading2}
                onChange={(e) => setProfile({ ...profile, heroHeading2: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Hero Line 3</label>
              <input
                type="text"
                value={profile.heroHeading3}
                onChange={(e) => setProfile({ ...profile, heroHeading3: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Hero Description Paragraph</label>
            <textarea
              rows="3"
              value={profile.heroDescription}
              onChange={(e) => setProfile({ ...profile, heroDescription: e.target.value })}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
            />
          </div>
        </div>

        {/* Section 2: About & Bio Settings */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0', color: '#d2ea26' }}>About & Bio Content</h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>About Section Main Headline</label>
            <input
              type="text"
              value={profile.aboutHeadline}
              onChange={(e) => setProfile({ ...profile, aboutHeadline: e.target.value })}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>About Page Bio Paragraph</label>
            <textarea
              rows="4"
              value={profile.aboutBio}
              onChange={(e) => setProfile({ ...profile, aboutBio: e.target.value })}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
            />
          </div>
        </div>

        {/* Section 3: Contact Info & Resume Link */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0', color: '#d2ea26' }}>Contact Info & Resume PDF</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Phone / WhatsApp</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Resume / CV Path</label>
              <input
                type="text"
                value={profile.cvUrl}
                onChange={(e) => setProfile({ ...profile, cvUrl: e.target.value })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Links */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0', color: '#d2ea26' }}>Social Links</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>LinkedIn URL</label>
              <input
                type="text"
                value={profile.socials?.linkedin || ''}
                onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, linkedin: e.target.value } })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>GitHub URL</label>
              <input
                type="text"
                value={profile.socials?.github || ''}
                onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, github: e.target.value } })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Instagram URL</label>
              <input
                type="text"
                value={profile.socials?.instagram || ''}
                onChange={(e) => setProfile({ ...profile, socials: { ...profile.socials, instagram: e.target.value } })}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
              />
            </div>
          </div>
        </div>

        {/* Section 5: Maintenance / Updating Screen Settings */}
        <div style={{ background: '#12141a', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#eab308', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🚧</span> Maintenance / Updating Mode Screen
            </h3>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#fff' }}>
              <input
                type="checkbox"
                checked={!!profile.isMaintenanceMode}
                onChange={(e) => setProfile({ ...profile, isMaintenanceMode: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#eab308', cursor: 'pointer' }}
              />
              {profile.isMaintenanceMode ? 'ON (Visitors see Updating Screen)' : 'OFF (Portfolio is Live)'}
            </label>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
              Custom Maintenance Message (Shown to visitors when Updating Screen is ON)
            </label>
            <textarea
              rows="2"
              value={profile.maintenanceMessage || ''}
              onChange={(e) => setProfile({ ...profile, maintenanceMessage: e.target.value })}
              placeholder="We are currently updating our portfolio with fresh projects & case studies..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '14px' }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProfileEditor;
