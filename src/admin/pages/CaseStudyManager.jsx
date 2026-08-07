import React, { useEffect, useState } from 'react';
import { projectsApi } from '../services/api';
import { Save, Sparkles } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import { caseStudiesData } from '../../data/caseStudiesData';
import ImageUploadInput from '../components/ImageUploadInput';

const CaseStudyManager = () => {
  const { refreshPortfolio } = usePortfolio();
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    category: '',
    year: '2026',
    client: '',
    services: 'UI/UX & Web Development',
    liveUrl: '',
    showCaseStudyBtn: true,
    showLiveUrlBtn: true,
    heroImg: '',
    showcaseImg: '',
    outcome: '',
    descriptionText: '',
    mobileImg1: '',
    mobileImg2: '',
    bannerImg: '',
  });

  const fetchProjects = async () => {
    try {
      const res = await projectsApi.getAllAdmin();
      const rawData = res.data?.data;
      const dbList = Array.isArray(rawData) ? rawData : (rawData?.projects || []);

      const combined = [...dbList];
      if (Array.isArray(caseStudiesData)) {
        caseStudiesData.forEach(staticProj => {
          const exists = combined.some(p => 
            (p.slug && p.slug.toLowerCase() === (staticProj.id || staticProj.slug || '').toLowerCase()) ||
            (p.title && p.title.toLowerCase() === staticProj.title.toLowerCase())
          );
          if (!exists) {
            combined.push({
              _id: staticProj.id,
              id: staticProj.id,
              title: staticProj.title,
              category: staticProj.category,
              client: staticProj.client,
              year: staticProj.year,
              services: staticProj.services,
              liveUrl: staticProj.liveUrl,
              heroImg: staticProj.heroImg,
              caseStudy: staticProj
            });
          }
        });
      }

      setProjects(combined);
      if (combined.length > 0 && !selectedId) {
        loadProjectIntoForm(combined[0]);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const loadProjectIntoForm = (proj) => {
    if (!proj) return;
    setSelectedId(proj._id || proj.id);
    const cs = proj.caseStudy || {};
    const desc = Array.isArray(cs.description) ? cs.description.join('\n\n') : (proj.description || '');

    setFormData({
      title: cs.title || proj.title || '',
      tagline: cs.tagline || proj.subtitle || proj.shortDescription || '',
      category: proj.category || cs.category || 'Travel & Hospitality',
      year: cs.year || proj.year || '2026',
      client: cs.client || proj.client || 'Client Name',
      services: cs.services || proj.services || 'UI/UX & Web Development',
      liveUrl: proj.liveUrl || cs.liveUrl || '',
      showCaseStudyBtn: proj.showCaseStudyBtn !== undefined ? proj.showCaseStudyBtn : true,
      showLiveUrlBtn: proj.showLiveUrlBtn !== undefined ? proj.showLiveUrlBtn : true,
      heroImg: proj.heroImg || cs.heroImg || proj.image || '',
      showcaseImg: cs.showcaseImg || proj.showcaseImg || '',
      outcome: cs.outcome || '',
      descriptionText: desc,
      mobileImg1: cs.mobileImg1 || proj.mobileImg1 || '',
      mobileImg2: cs.mobileImg2 || proj.mobileImg2 || '',
      bannerImg: cs.bannerImg || proj.bannerImg || '',
    });
  };

  const handleSelectProject = (e) => {
    const pId = e.target.value;
    const found = projects.find(p => p._id === pId || p.id === pId);
    if (found) {
      loadProjectIntoForm(found);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return;

    setSaving(true);
    setMessage('');

    try {
      const selectedProject = projects.find(p => p._id === selectedId || p.id === selectedId);
      if (!selectedProject) return;

      const caseStudyData = {
        heroImg: formData.heroImg,
        showcaseImg: formData.showcaseImg || formData.heroImg,
        tagline: formData.tagline,
        description: formData.descriptionText.split('\n\n').filter(Boolean),
        outcome: formData.outcome,
        mobileImg1: formData.mobileImg1,
        mobileImg2: formData.mobileImg2,
        bannerImg: formData.bannerImg
      };

      const updatedProjectPayload = {
        ...selectedProject,
        slug: selectedProject?.slug || selectedProject?.id || selectedId,
        title: formData.title,
        heroImg: formData.heroImg,
        image: formData.heroImg,
        showcaseImg: formData.showcaseImg,
        mobileImg1: formData.mobileImg1,
        mobileImg2: formData.mobileImg2,
        bannerImg: formData.bannerImg,
        liveUrl: formData.liveUrl,
        showCaseStudyBtn: formData.showCaseStudyBtn,
        showLiveUrlBtn: formData.showLiveUrlBtn,
        category: formData.category,
        client: formData.client,
        year: formData.year,
        services: formData.services,
        caseStudy: caseStudyData
      };

      const res = await projectsApi.update(selectedId, updatedProjectPayload);
      const savedProj = res?.data?.data?.project || res?.data?.project;
      if (savedProj && savedProj._id) {
        setSelectedId(savedProj._id);
      }
      if (refreshPortfolio) {
        refreshPortfolio();
      }
      setMessage(`Case Study for "${formData.title}" saved & updated live on website!`);
      setTimeout(() => setMessage(''), 3500);
      fetchProjects();
    } catch (err) {
      alert('Error saving Case Study: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Case Study Pages Manager</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Easily edit content, hero mockups, narrative story, mobile experience cards, and showcase images.</p>
        </div>
      </div>

      {message && (
        <div style={{ padding: '14px 18px', background: 'rgba(210, 234, 38, 0.15)', border: '1px solid rgba(210, 234, 38, 0.3)', color: '#d2ea26', borderRadius: '12px', marginBottom: '24px', fontWeight: '700', fontSize: '13.5px' }}>
          {message}
        </div>
      )}

      {/* Project Selector Bar */}
      <div style={{ background: '#0f172a', border: '1px solid rgba(210, 234, 38, 0.3)', borderRadius: '20px', padding: '20px 24px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <label style={{ fontSize: '13.5px', fontWeight: '800', color: '#d2ea26', whiteSpace: 'nowrap' }}>SELECT PROJECT TO EDIT CASE STUDY:</label>
        <select
          value={selectedId}
          onChange={handleSelectProject}
          style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', color: '#ffffff', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
        >
          {projects.map(p => (
            <option key={p._id || p.id} value={p._id || p.id} style={{ background: '#0f172a', color: '#ffffff' }}>
              {p.title} ({p.category || 'Project'})
            </option>
          ))}
        </select>
      </div>

      {/* Case Study Full Form */}
      <form onSubmit={handleSubmit} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* 1. Header & Client Metadata */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>1. Header & Page Metadata</h3>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CASE STUDY TITLE</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SERVICES PROVIDED</label>
              <input type="text" value={formData.services} onChange={(e) => setFormData({ ...formData, services: e.target.value })} placeholder="UI/UX & Web Development" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>INDUSTRY / CATEGORY</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Travel & Hospitality" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>COMPANY / CLIENT</label>
              <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} placeholder="Client Name" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>YEAR</label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="2026" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>LIVE WEBSITE BUTTON URL</label>
              <input type="text" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6 d-flex align-items-center gap-4 pt-4">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#ffffff', fontWeight: '600' }}>
                <input
                  type="checkbox"
                  checked={formData.showCaseStudyBtn !== false}
                  onChange={(e) => setFormData({ ...formData, showCaseStudyBtn: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#d2ea26', cursor: 'pointer' }}
                />
                <span>Show Case Study Button</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#ffffff', fontWeight: '600' }}>
                <input
                  type="checkbox"
                  checked={formData.showLiveUrlBtn !== false}
                  onChange={(e) => setFormData({ ...formData, showLiveUrlBtn: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: '#d2ea26', cursor: 'pointer' }}
                />
                <span>Show Live Link Button</span>
              </label>
            </div>
          </div>
        </div>

        {/* 2. Main Top Hero Mockup Image */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>2. Top Hero Featured Mockup Image</h3>
          <ImageUploadInput
            label="MAIN HERO FEATURED SCREENSHOT (UPLOAD FROM PC / SELECT FILE)"
            value={formData.heroImg}
            onChange={(val) => setFormData({ ...formData, heroImg: val })}
            placeholder="Upload file from PC or enter image URL..."
          />
        </div>

        {/* 3. Narrative Story (THE BRIEF & THE APPROACH) */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>3. Narrative Story ("THE BRIEF" & "THE APPROACH")</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>THE BRIEF - TAGLINE / INTRO PARAGRAPH</label>
              <textarea rows={2} value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} placeholder="Short project tagline or intro paragraph for The Brief section..." style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>NARRATIVE OVERVIEW PARAGRAPHS (Separate paragraphs with double enter)</label>
              <textarea rows={4} value={formData.descriptionText} onChange={(e) => setFormData({ ...formData, descriptionText: e.target.value })} placeholder="Detailed narrative paragraphs explaining project goals and strategy..." style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>THE APPROACH - SUMMARY / OUTCOME PARAGRAPH</label>
              <textarea rows={3} value={formData.outcome} onChange={(e) => setFormData({ ...formData, outcome: e.target.value })} placeholder="Summary paragraph for The Approach section..." style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>
          </div>
        </div>

        {/* 4. Secondary Desktop Showcase Image */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>4. Secondary Showcase Card Image</h3>
          <ImageUploadInput
            label="SECONDARY DESKTOP MOCKUP CARD (UPLOAD FROM PC)"
            value={formData.showcaseImg}
            onChange={(val) => setFormData({ ...formData, showcaseImg: val })}
            placeholder="Upload file from PC or enter image URL..."
          />
        </div>

        {/* 5. Mobile Experience Screenshots */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>5. Mobile Experience Screenshots ("Designed for every screen")</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ImageUploadInput
              label="MOBILE SCREEN #1 (LEFT CARD - UPLOAD FROM PC)"
              value={formData.mobileImg1}
              onChange={(val) => setFormData({ ...formData, mobileImg1: val })}
              placeholder="Upload file from PC or enter image URL..."
            />

            <ImageUploadInput
              label="MOBILE SCREEN #2 (RIGHT CARD - UPLOAD FROM PC)"
              value={formData.mobileImg2}
              onChange={(val) => setFormData({ ...formData, mobileImg2: val })}
              placeholder="Upload file from PC or enter image URL..."
            />
          </div>
        </div>

        {/* 6. Bottom Full-Width Banner Image */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>6. Bottom Showcase Banner Image</h3>
          <ImageUploadInput
            label="BOTTOM FULL-WIDTH BANNER IMAGE (UPLOAD FROM PC)"
            value={formData.bannerImg}
            onChange={(val) => setFormData({ ...formData, bannerImg: val })}
            placeholder="Upload file from PC or enter image URL..."
          />
        </div>

        {/* Submit */}
        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '15px' }}>
            <Save size={18} />
            <span>{saving ? 'Saving Case Study...' : 'Save Case Study Live'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseStudyManager;
