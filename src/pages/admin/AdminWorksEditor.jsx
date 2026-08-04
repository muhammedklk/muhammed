import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminWorksEditor = () => {
  const [worksPageData, setWorksPageData] = useState({
    pageBadge: 'PORTFOLIO',
    pageTitle: 'Selected Works',
    pageSubtitle: 'A curated collection of digital products, web experiences, and UI systems designed and built with focus, clarity, and precision.',
    ctaBadge: "LET'S COLLABORATE",
    ctaTitle: 'Have a project in mind?',
    ctaSubtitle: "Let's build something clean, functional, and visually memorable together.",
    ctaButtonText: 'Start a Conversation'
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchWorksConfig = async () => {
      try {
        const res = await api.get('/profile');
        if (res.data) {
          setWorksPageData((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Error fetching Works page config:', err);
      }
    };

    fetchWorksConfig();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');

    try {
      await api.put('/profile', worksPageData);
      setFeedback('Works Page content saved successfully!');
      setTimeout(() => setFeedback(''), 4000);
    } catch (err) {
      setFeedback('Failed to save Works page content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>💼 Works Page Editor</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Edit Portfolio hero header, case study grid settings, and bottom CTA card
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
          <span>{saving ? 'Saving...' : 'Save Works Page'}</span>
        </button>
      </div>

      {feedback && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '14px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, marginBottom: '28px' }}>
          ✓ {feedback}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* SECTION 1: PORTFOLIO HERO */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 1: Portfolio Hero Header</h3>
            <span style={{ fontSize: '12px', background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '4px 10px', borderRadius: '20px' }}>Works Top Section</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Page Badge</label>
              <input type="text" value={worksPageData.pageBadge} onChange={(e) => setWorksPageData({ ...worksPageData, pageBadge: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Page Main Title</label>
              <input type="text" value={worksPageData.pageTitle} onChange={(e) => setWorksPageData({ ...worksPageData, pageTitle: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Page Subtitle Paragraph</label>
            <textarea rows="3" value={worksPageData.pageSubtitle} onChange={(e) => setWorksPageData({ ...worksPageData, pageSubtitle: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
          </div>
        </div>

        {/* SECTION 2: CASE STUDIES DIRECT LINK */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: '#fff' }}>Section 2: Case Studies Grid & Image Specs</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Add, edit, or upload project images with Figma canvas dimensions</p>
          </div>
          <Link to="/admin/projects" style={{ background: 'linear-gradient(135deg, #d2ea26 0%, #a3b814 100%)', color: '#0f172a', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '13px' }}>
            Manage Case Studies →
          </Link>
        </div>

        {/* SECTION 3: BOTTOM CTA CARD */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 3: Bottom Call-To-Action Card</h3>
            <span style={{ fontSize: '12px', background: 'rgba(234, 179, 8, 0.15)', color: '#eab308', padding: '4px 10px', borderRadius: '20px' }}>CTA Banner</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>CTA Badge</label>
              <input type="text" value={worksPageData.ctaBadge} onChange={(e) => setWorksPageData({ ...worksPageData, ctaBadge: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>CTA Main Title</label>
              <input type="text" value={worksPageData.ctaTitle} onChange={(e) => setWorksPageData({ ...worksPageData, ctaTitle: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>CTA Subtitle</label>
            <input type="text" value={worksPageData.ctaSubtitle} onChange={(e) => setWorksPageData({ ...worksPageData, ctaSubtitle: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
          </div>
        </div>

      </form>
    </div>
  );
};

export default AdminWorksEditor;
