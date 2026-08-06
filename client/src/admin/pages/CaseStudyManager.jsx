import React, { useEffect, useState } from 'react';
import { projectsApi } from '../services/api';
import { Save, Sparkles, ArrowLeft, Image as ImageIcon } from '../components/Icons';
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
    heroImg: '',
    outcome: '',
    descriptionText: '',
    techTags: 'Figma, React, SCSS, Motion, Vercel',
    color1Hex: '#d2ea26',
    color1Name: 'Accent Lime',
    color2Hex: '#849a00',
    color2Name: 'Dark Lime Accent',
    color3Hex: '#0f172a',
    color3Name: 'Dark Surface',
    color4Hex: '#f8fafc',
    color4Name: 'Light Background',
    headerFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter / Outfit',
    mobileImg1: '',
    mobileImg2: '',
    bannerImg: '',
    metric1Val: '99+',
    metric1Label: 'PageSpeed Score',
    metric2Val: '+45%',
    metric2Label: 'Session Time',
    metric3Val: '2.4s',
    metric3Label: 'Average Load Time',
    metric4Val: '+124%',
    metric4Label: 'Leads Growth',
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
    const metrics = cs.metrics || [];

    setFormData({
      title: cs.title || proj.title || '',
      tagline: cs.tagline || proj.subtitle || proj.shortDescription || '',
      category: proj.category || cs.category || 'Travel & Hospitality',
      year: cs.year || proj.year || '2026',
      client: cs.client || proj.client || 'Client Name',
      services: cs.services || proj.services || 'UI/UX & Web Development',
      liveUrl: proj.liveUrl || cs.liveUrl || '',
      heroImg: proj.heroImg || proj.image || cs.heroImg || '',
      outcome: cs.outcome || 'Delivered high-performance responsive web experience.',
      descriptionText: desc,
      techTags: cs.techTags || (proj.tags ? proj.tags.join(', ') : 'Figma, React, SCSS, Motion, Vercel'),
      color1Hex: cs.color1Hex || '#d2ea26',
      color1Name: cs.color1Name || 'Accent Lime',
      color2Hex: cs.color2Hex || '#849a00',
      color2Name: cs.color2Name || 'Dark Lime Accent',
      color3Hex: cs.color3Hex || '#0f172a',
      color3Name: cs.color3Name || 'Dark Surface',
      color4Hex: cs.color4Hex || '#f8fafc',
      color4Name: cs.color4Name || 'Light Background',
      headerFont: cs.headerFont || 'Plus Jakarta Sans',
      bodyFont: cs.bodyFont || 'Inter / Outfit',
      mobileImg1: cs.mobileImg1 || proj.mobileImg1 || proj.heroImg || '',
      mobileImg2: cs.mobileImg2 || proj.mobileImg2 || proj.heroImg || '',
      bannerImg: cs.bannerImg || proj.showcaseImg || proj.heroImg || '',
      metric1Val: metrics[0]?.value || '99+',
      metric1Label: metrics[0]?.label || 'PageSpeed Score',
      metric2Val: metrics[1]?.value || '+45%',
      metric2Label: metrics[1]?.label || 'Session Time',
      metric3Val: metrics[2]?.value || '2.4s',
      metric3Label: metrics[2]?.label || 'Average Load Time',
      metric4Val: metrics[3]?.value || '+124%',
      metric4Label: metrics[3]?.label || 'Leads Growth',
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
        title: formData.title,
        tagline: formData.tagline,
        category: formData.category,
        year: formData.year,
        client: formData.client,
        services: formData.services,
        liveUrl: formData.liveUrl,
        heroImg: formData.heroImg,
        outcome: formData.outcome,
        description: formData.descriptionText.split('\n\n').filter(Boolean),
        techTags: formData.techTags,
        color1Hex: formData.color1Hex,
        color1Name: formData.color1Name,
        color2Hex: formData.color2Hex,
        color2Name: formData.color2Name,
        color3Hex: formData.color3Hex,
        color3Name: formData.color3Name,
        color4Hex: formData.color4Hex,
        color4Name: formData.color4Name,
        headerFont: formData.headerFont,
        bodyFont: formData.bodyFont,
        mobileImg1: formData.mobileImg1,
        mobileImg2: formData.mobileImg2,
        bannerImg: formData.bannerImg,
        metrics: [
          { value: formData.metric1Val, label: formData.metric1Label },
          { value: formData.metric2Val, label: formData.metric2Label },
          { value: formData.metric3Val, label: formData.metric3Label },
          { value: formData.metric4Val, label: formData.metric4Label },
        ]
      };

      const updatedProjectPayload = {
        ...selectedProject,
        title: formData.title,
        heroImg: formData.heroImg,
        image: formData.heroImg,
        liveUrl: formData.liveUrl,
        category: formData.category,
        client: formData.client,
        caseStudy: caseStudyData
      };

      const isMongoId = /^[0-9a-fA-F]{24}$/.test(selectedId);
      if (isMongoId) {
        await projectsApi.update(selectedId, updatedProjectPayload);
      } else {
        await projectsApi.create({
          ...updatedProjectPayload,
          slug: selectedProject?.slug || selectedProject?.id || selectedId || formData.title.toLowerCase().replace(/\s+/g, '-')
        });
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
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Full control over titles, metrics, hero mockups, design systems, and gallery screenshots.</p>
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
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>1. Case Study Header & Meta Information</h3>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CASE STUDY TITLE</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SUBTITLE TAGLINE</label>
              <input type="text" value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-3">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CLIENT NAME</label>
              <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-3">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SERVICES PROVIDED</label>
              <input type="text" value={formData.services} onChange={(e) => setFormData({ ...formData, services: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-3">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CATEGORY</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-3">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>YEAR</label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>LIVE WEBSITE BUTTON URL</label>
              <input type="text" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>
          </div>
        </div>

        {/* 2. Key Metrics Cards */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>2. Key Performance Metrics (4 Cards)</h3>
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '700', marginBottom: '4px' }}>METRIC 1 VALUE</label>
              <input type="text" value={formData.metric1Val} onChange={(e) => setFormData({ ...formData, metric1Val: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '700', margin: '6px 0 4px 0' }}>LABEL</label>
              <input type="text" value={formData.metric1Label} onChange={(e) => setFormData({ ...formData, metric1Label: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
            </div>

            <div className="col-6 col-md-3">
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '700', marginBottom: '4px' }}>METRIC 2 VALUE</label>
              <input type="text" value={formData.metric2Val} onChange={(e) => setFormData({ ...formData, metric2Val: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '700', margin: '6px 0 4px 0' }}>LABEL</label>
              <input type="text" value={formData.metric2Label} onChange={(e) => setFormData({ ...formData, metric2Label: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
            </div>

            <div className="col-6 col-md-3">
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '700', marginBottom: '4px' }}>METRIC 3 VALUE</label>
              <input type="text" value={formData.metric3Val} onChange={(e) => setFormData({ ...formData, metric3Val: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '700', margin: '6px 0 4px 0' }}>LABEL</label>
              <input type="text" value={formData.metric3Label} onChange={(e) => setFormData({ ...formData, metric3Label: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
            </div>

            <div className="col-6 col-md-3">
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '700', marginBottom: '4px' }}>METRIC 4 VALUE</label>
              <input type="text" value={formData.metric4Val} onChange={(e) => setFormData({ ...formData, metric4Val: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
              <label style={{ display: 'block', fontSize: '11px', color: '#94a3b8', fontWeight: '700', margin: '6px 0 4px 0' }}>LABEL</label>
              <input type="text" value={formData.metric4Label} onChange={(e) => setFormData({ ...formData, metric4Label: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
            </div>
          </div>
        </div>

        {/* 3. Hero Mockup Image */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>3. Hero Featured Mockup Image</h3>
          <ImageUploadInput
            label="FEATURED MOCKUP SCREENSHOT (UPLOAD FROM COMPUTER FOLDER)"
            value={formData.heroImg}
            onChange={(val) => setFormData({ ...formData, heroImg: val })}
            placeholder="Upload file from PC or enter image URL..."
          />
        </div>

        {/* 4. Executive Narrative Overview & Outcome */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>4. Narrative & Outcome Quote</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>EXECUTIVE OVERVIEW PARAGRAPHS (Separate paragraphs with double enter)</label>
              <textarea rows={4} value={formData.descriptionText} onChange={(e) => setFormData({ ...formData, descriptionText: e.target.value })} style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>PROJECT OUTCOME SUMMARY / QUOTE</label>
              <textarea rows={2} value={formData.outcome} onChange={(e) => setFormData({ ...formData, outcome: e.target.value })} style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>
          </div>
        </div>

        {/* 5. Design System & Tech Architecture */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>5. Design System & Tech Specs</h3>
          <div className="row g-3">
            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>TECHNOLOGIES USED (Comma Separated)</label>
              <input type="text" value={formData.techTags} onChange={(e) => setFormData({ ...formData, techTags: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>PRIMARY ACCENT COLOR HEX</label>
              <input type="text" value={formData.color1Hex} onChange={(e) => setFormData({ ...formData, color1Hex: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>DARK ACCENT COLOR HEX</label>
              <input type="text" value={formData.color2Hex} onChange={(e) => setFormData({ ...formData, color2Hex: e.target.value })} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }} />
            </div>
          </div>
        </div>

        {/* 6. Showcase Gallery Screenshots */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.8px' }}>6. Mockups & Showcase Screenshots</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ImageUploadInput
              label="SHOWCASE MOCKUP IMAGE #1 (LEFT SCREENSHOT - UPLOAD FROM PC)"
              value={formData.mobileImg1}
              onChange={(val) => setFormData({ ...formData, mobileImg1: val })}
              placeholder="Upload from PC or enter image URL..."
            />

            <ImageUploadInput
              label="SHOWCASE MOCKUP IMAGE #2 (RIGHT SCREENSHOT - UPLOAD FROM PC)"
              value={formData.mobileImg2}
              onChange={(val) => setFormData({ ...formData, mobileImg2: val })}
              placeholder="Upload from PC or enter image URL..."
            />

            <ImageUploadInput
              label="FULL WIDTH BANNER MOCKUP IMAGE (BOTTOM SCREENSHOT - UPLOAD FROM PC)"
              value={formData.bannerImg}
              onChange={(val) => setFormData({ ...formData, bannerImg: val })}
              placeholder="Upload from PC or enter image URL..."
            />
          </div>
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
