import React, { useEffect, useState } from 'react';
import { contentApi } from '../services/api';
import { Save, Sparkles } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import ImageUploadInput from '../components/ImageUploadInput';

const HeroAboutManager = () => {
  const { refreshPortfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [heroForm, setHeroForm] = useState({
    badge: 'AVAILABLE FOR PROJECTS',
    titlePrefix: 'Bringing ideas',
    highlightText: 'to life',
    titleSuffix: 'through design',
    subtitle: 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products.',
    primaryBtnText: 'View Works',
    primaryBtnLink: '/works',
    secondaryBtnText: 'About me',
    secondaryBtnLink: '/about',
    orbitName: 'Muhammed',
    orbitRole: 'UI/UX & FRONTEND CRAFT',
    isActive: true
  });

  const [aboutForm, setAboutForm] = useState({
    title: "Hi, I'm Muhammed 👋",
    subtitle: 'Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.',
    bioParagraphs: [
      "I bridge the gap between creative visual artistry and technical front-end engineering. My goal is to build digital products that not only look breathtaking, but perform flawlessly across every screen size.",
      "My approach combines rigorous user research with meticulous typographic hierarchies, smooth micro-interactions, and resilient code to ensure every project leaves a lasting impact."
    ],
    experienceYears: 6,
    completedProjects: 40,
    satisfiedClients: 35,
    avatarUrl: '/assets/profile_photo.jpg',
    resumeUrl: '#'
  });

  const fetchData = async () => {
    try {
      const [heroRes, aboutRes] = await Promise.all([
        contentApi.getHero().catch(() => null),
        contentApi.getAbout().catch(() => null)
      ]);

      if (heroRes && heroRes.data && heroRes.data.data) {
        setHeroForm(prev => ({ ...prev, ...heroRes.data.data }));
      }

      if (aboutRes && aboutRes.data && aboutRes.data.data) {
        setAboutForm(prev => ({ ...prev, ...aboutRes.data.data }));
      }
    } catch (err) {
      console.error('Error fetching hero & about content:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await contentApi.updateHero(heroForm);
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      setMessage('Hero Section updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error updating Hero section: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await contentApi.updateAbout(aboutForm);
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      setMessage('About Section updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error updating About section: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Hero & About Manager</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Configure main landing hero banner text, CTAs, orbit avatar badges, and personal about bio.</p>
        </div>
      </div>

      {message && (
        <div style={{ padding: '14px 18px', background: 'rgba(210, 234, 38, 0.15)', border: '1px solid rgba(210, 234, 38, 0.3)', color: '#d2ea26', borderRadius: '12px', marginBottom: '24px', fontWeight: '700', fontSize: '13.5px' }}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('hero')}
          style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'hero' ? '#d2ea26' : 'rgba(255,255,255,0.05)', color: activeTab === 'hero' ? '#0f172a' : '#ffffff', fontWeight: '800', border: 'none', cursor: 'pointer' }}
        >
          Hero Banner Configuration
        </button>
        <button
          onClick={() => setActiveTab('about')}
          style={{ padding: '10px 20px', borderRadius: '10px', background: activeTab === 'about' ? '#d2ea26' : 'rgba(255,255,255,0.05)', color: activeTab === 'about' ? '#0f172a' : '#ffffff', fontWeight: '800', border: 'none', cursor: 'pointer' }}
        >
          About Bio & Metrics
        </button>
      </div>

      {activeTab === 'hero' ? (
        <form onSubmit={handleHeroSubmit} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="row g-3">
            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>TOP AVAILABILITY BADGE</label>
              <input type="text" value={heroForm.badge} onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>TITLE PREFIX (BEFORE HIGHLIGHT)</label>
              <input type="text" value={heroForm.titlePrefix} onChange={(e) => setHeroForm({ ...heroForm, titlePrefix: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>HIGHLIGHTED LIME TEXT</label>
              <input type="text" value={heroForm.highlightText} onChange={(e) => setHeroForm({ ...heroForm, highlightText: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>TITLE SUFFIX (AFTER HIGHLIGHT)</label>
              <input type="text" value={heroForm.titleSuffix} onChange={(e) => setHeroForm({ ...heroForm, titleSuffix: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SUBTITLE DESCRIPTION</label>
              <textarea rows={3} value={heroForm.subtitle} onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>ORBIT AVATAR NAME</label>
              <input type="text" value={heroForm.orbitName} onChange={(e) => setHeroForm({ ...heroForm, orbitName: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>ORBIT AVATAR ROLE / BADGE</label>
              <input type="text" value={heroForm.orbitRole} onChange={(e) => setHeroForm({ ...heroForm, orbitRole: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>PRIMARY BUTTON TEXT</label>
              <input type="text" value={heroForm.primaryBtnText} onChange={(e) => setHeroForm({ ...heroForm, primaryBtnText: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SECONDARY BUTTON TEXT</label>
              <input type="text" value={heroForm.secondaryBtnText} onChange={(e) => setHeroForm({ ...heroForm, secondaryBtnText: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button type="submit" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
              <Save size={18} />
              <span>{saving ? 'Saving...' : 'Save Hero Changes'}</span>
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleAboutSubmit} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>DISPLAY NAME / TITLE</label>
              <input type="text" value={aboutForm.title} onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>ROLE / TAGLINE SUBTITLE</label>
              <input type="text" value={aboutForm.subtitle} onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>BIO PARAGRAPHS (SEPARATE BY NEWLINE)</label>
              <textarea rows={4} value={Array.isArray(aboutForm.bioParagraphs) ? aboutForm.bioParagraphs.join('\n') : aboutForm.bioParagraphs} onChange={(e) => setAboutForm({ ...aboutForm, bioParagraphs: e.target.value.split('\n') })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>YEARS OF EXPERIENCE</label>
              <input type="number" value={aboutForm.experienceYears} onChange={(e) => setAboutForm({ ...aboutForm, experienceYears: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>COMPLETED PROJECTS COUNT</label>
              <input type="number" value={aboutForm.completedProjects} onChange={(e) => setAboutForm({ ...aboutForm, completedProjects: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SATISFIED CLIENTS COUNT</label>
              <input type="number" value={aboutForm.satisfiedClients} onChange={(e) => setAboutForm({ ...aboutForm, satisfiedClients: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12">
              <ImageUploadInput label="PROFILE AVATAR IMAGE URL / PHOTO" value={aboutForm.avatarUrl} onChange={(val) => setAboutForm({ ...aboutForm, avatarUrl: val })} placeholder="/assets/profile_photo.jpg or choose file..." />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button type="submit" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}>
              <Save size={18} />
              <span>{saving ? 'Saving...' : 'Save About Changes'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HeroAboutManager;
