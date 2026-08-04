import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminContactEditor = () => {
  const [contactData, setContactData] = useState({
    contactBadge: 'GET IN TOUCH',
    contactTitle: "Let's Start a Project Together",
    contactSubtitle: "Whether you have a fully scoped design brief or just an early idea, I'm excited to hear from you. Fill out the form below or reach out directly.",
    email: 'muhammedklkm@gmail.com',
    phone: '+91 9656216086',
    location: 'Kerala, India (IST UTC+5:30)',
    availTitle: 'Available for New Projects',
    availSub: 'Accepting select client work for Q3/Q4 2026'
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchContactConfig = async () => {
      try {
        const res = await api.get('/profile');
        if (res.data) {
          setContactData((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Error loading Contact page config:', err);
      }
    };

    fetchContactConfig();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');

    try {
      await api.put('/profile', contactData);
      setFeedback('Contact Page content saved successfully!');
      setTimeout(() => setFeedback(''), 4000);
    } catch (err) {
      setFeedback('Failed to save Contact page content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>✉️ Contact Page Editor</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Edit Contact hero text, direct email & phone cards, and availability status badge
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
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
          <span>{saving ? 'Saving...' : 'Save Contact Page'}</span>
        </button>
      </div>

      {feedback && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '14px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, marginBottom: '28px' }}>
          ✓ {feedback}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* SECTION 1: CONTACT HERO */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 1: Contact Hero Header</h3>
            <span style={{ fontSize: '12px', background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '4px 10px', borderRadius: '20px' }}>Contact Top Section</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Badge</label>
              <input type="text" value={contactData.contactBadge} onChange={(e) => setContactData({ ...contactData, contactBadge: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Title</label>
              <input type="text" value={contactData.contactTitle} onChange={(e) => setContactData({ ...contactData, contactTitle: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Subtitle Paragraph</label>
            <textarea rows="3" value={contactData.contactSubtitle} onChange={(e) => setContactData({ ...contactData, contactSubtitle: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
          </div>
        </div>

        {/* SECTION 2: DIRECT CONNECTION & AVAILABILITY */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 2: Direct Connection & Availability Card</h3>
            <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '20px' }}>Contact Cards</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Email Address</label>
              <input type="email" value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Phone / WhatsApp</label>
              <input type="text" value={contactData.phone} onChange={(e) => setContactData({ ...contactData, phone: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Location</label>
              <input type="text" value={contactData.location} onChange={(e) => setContactData({ ...contactData, location: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '14px', color: '#10b981', margin: '0 0 10px 0', fontWeight: 700 }}>🟢 Availability Status Card</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Status Title</label>
                <input type="text" value={contactData.availTitle} onChange={(e) => setContactData({ ...contactData, availTitle: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Status Subtext</label>
                <input type="text" value={contactData.availSub} onChange={(e) => setContactData({ ...contactData, availSub: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff' }} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: INQUIRIES VAULT LINK */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: '#fff' }}>Section 3: Submitted Client Inquiries</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>View and manage client form submissions</p>
          </div>
          <Link to="/admin/inquiries" style={{ background: 'linear-gradient(135deg, #d2ea26 0%, #a3b814 100%)', color: '#0f172a', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '13px' }}>
            View Client Messages →
          </Link>
        </div>

      </form>
    </div>
  );
};

export default AdminContactEditor;
