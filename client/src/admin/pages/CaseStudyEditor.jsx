import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { projectsApi } from '../services/api';
import { ArrowLeft, Save, Sparkles, Plus, Trash2 } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import ImageUploadInput from '../components/ImageUploadInput';

const CaseStudyEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshPortfolio } = usePortfolio();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [projectTitle, setProjectTitle] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    client: '',
    role: '',
    timeline: '',
    liveUrl: '',
    githubUrl: '',
    overview: '',
    challenge: '',
    solution: '',
    impact: '',
    techStack: [],
    keyFeatures: [],
    gallery: []
  });

  const [newFeature, setNewFeature] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await projectsApi.getAllAdmin();
        const rawData = res.data?.data;
        const projects = Array.isArray(rawData) ? rawData : (rawData?.projects || []);
        const found = projects.find(p => p._id === id || p.id === id);

        if (found) {
          setProjectTitle(found.title);
          const cs = found.caseStudy || {};
          setFormData({
            title: cs.title || found.title || '',
            subtitle: cs.subtitle || found.shortDescription || found.description || '',
            client: cs.client || '',
            role: cs.role || '',
            timeline: cs.timeline || '',
            liveUrl: cs.liveUrl || found.liveUrl || '',
            githubUrl: cs.githubUrl || found.githubUrl || '',
            overview: cs.overview || found.shortDescription || found.description || '',
            challenge: cs.challenge || '',
            solution: cs.solution || '',
            impact: cs.impact || '',
            techStack: cs.techStack || found.tags || [],
            keyFeatures: cs.keyFeatures || [],
            gallery: cs.gallery || [found.heroImg || found.image].filter(Boolean)
          });
        }
      } catch (err) {
        console.error('Failed to fetch project for case study:', err);
      }
    };
    fetchProject();
  }, [id]);

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, newFeature.trim()] }));
    setNewFeature('');
  };

  const removeFeature = (idx) => {
    setFormData(prev => ({ ...prev, keyFeatures: prev.keyFeatures.filter((_, i) => i !== idx) }));
  };

  const addGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData(prev => ({ ...prev, gallery: [...prev.gallery, newGalleryUrl.trim()] }));
    setNewGalleryUrl('');
  };

  const removeGalleryImage = (idx) => {
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await projectsApi.updateCaseStudy(id, formData);
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      setMessage('Case Study saved & updated live on website successfully!');
      setTimeout(() => setMessage(''), 3500);
    } catch (err) {
      setMessage('Error saving Case Study: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={() => navigate('/admin/projects')} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '700' }}>
            <ArrowLeft size={16} />
            <span>Back to Projects</span>
          </button>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#ffffff' }}>Edit Case Study: {projectTitle || 'Project'}</h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Configure comprehensive showcase narrative, mockups, and client result metrics.</p>
          </div>
        </div>
      </div>

      {message && (
        <div style={{ padding: '14px 18px', background: 'rgba(210, 234, 38, 0.15)', border: '1px solid rgba(210, 234, 38, 0.3)', color: '#d2ea26', borderRadius: '12px', marginBottom: '24px', fontWeight: '700', fontSize: '13.5px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Section 1: Overview Metadata */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>1. Hero & Client Metadata</h3>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CASE STUDY DISPLAY TITLE</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SUBTITLE TAGLINE</label>
              <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CLIENT NAME / INDUSTRY</label>
              <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} placeholder="e.g. Gyogrea Tech Ltd" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>YOUR ROLE</label>
              <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Lead UI/UX & Frontend Architect" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>TIMELINE / YEAR</label>
              <input type="text" value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} placeholder="e.g. 2026 (3 Months)" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>
          </div>
        </div>

        {/* Section 2: Narrative Overview */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>2. Project Narrative & Case Details</h3>
          <div className="row g-3">
            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>EXECUTIVE OVERVIEW</label>
              <textarea rows={3} value={formData.overview} onChange={(e) => setFormData({ ...formData, overview: e.target.value })} placeholder="Comprehensive overview of the client project background..." style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>THE CHALLENGE</label>
              <textarea rows={3} value={formData.challenge} onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} placeholder="Key problems and engineering bottlenecks solved..." style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>THE ARCHITECTURAL SOLUTION</label>
              <textarea rows={3} value={formData.solution} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} placeholder="Design system approach and frontend technologies leveraged..." style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
            </div>
          </div>
        </div>

        {/* Section 3: Showcase Screenshots Gallery */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#d2ea26', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>3. Showcase Screenshots & Mockups Gallery</h3>
          
          <ImageUploadInput
            label="ADD NEW MOCKUP SCREENSHOT / UPLOAD FROM PC"
            value={newGalleryUrl}
            onChange={(val) => setNewGalleryUrl(val)}
            placeholder="Upload screenshot from PC folder or paste URL..."
          />

          <button
            type="button"
            onClick={addGalleryImage}
            disabled={!newGalleryUrl}
            style={{ padding: '10px 20px', background: '#d2ea26', color: '#0f172a', fontWeight: '800', border: 'none', borderRadius: '10px', cursor: newGalleryUrl ? 'pointer' : 'not-allowed', marginBottom: '20px' }}
          >
            Add Screenshot to Gallery
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
            {formData.gallery.map((url, idx) => (
              <div key={idx} style={{ position: 'relative', height: '110px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={url} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button type="button" onClick={() => removeGalleryImage(idx)} style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(239, 68, 68, 0.8)', border: 'none', color: '#ffffff', borderRadius: '6px', padding: '4px', cursor: 'pointer' }}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '15px' }}>
            <Save size={18} />
            <span>{saving ? 'Saving Case Study...' : 'Save Case Study'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaseStudyEditor;
