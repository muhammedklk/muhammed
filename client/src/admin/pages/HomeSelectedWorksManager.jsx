import React, { useEffect, useState } from 'react';
import { projectsApi } from '../services/api';
import { Save, Sparkles, Plus, Edit, Trash2 } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import ImageUploadInput from '../components/ImageUploadInput';

const HomeSelectedWorksManager = () => {
  const { refreshPortfolio } = usePortfolio();
  const [projects, setProjects] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await projectsApi.getAllAdmin();
      const rawData = res.data?.data;
      const list = Array.isArray(rawData) ? rawData : (rawData?.projects || []);
      setProjects(list);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleUpdateProject = async (proj) => {
    setSavingId(proj._id);
    setMessage('');
    try {
      await projectsApi.update(proj._id, {
        ...proj,
        featured: true
      });
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      setMessage(`Successfully updated "${proj.title}" mockup & live link on Home Page!`);
      setTimeout(() => setMessage(''), 3500);
      fetchProjects();
    } catch (err) {
      alert('Error updating project: ' + (err.response?.data?.message || err.message));
    } finally {
      setSavingId(null);
    }
  };

  const featuredProjects = projects.slice(0, 4);

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Home Page Selected Works Mockups</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Exclusively edit the top 4 mockup screenshots, titles, and live website links displayed on your public Home Page.</p>
        </div>
      </div>

      {message && (
        <div style={{ padding: '14px 18px', background: 'rgba(210, 234, 38, 0.15)', border: '1px solid rgba(210, 234, 38, 0.3)', color: '#d2ea26', borderRadius: '12px', marginBottom: '24px', fontWeight: '700', fontSize: '13.5px' }}>
          {message}
        </div>
      )}

      {/* 4 Home Selected Works Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {featuredProjects.length === 0 ? (
          <div style={{ background: '#0f172a', padding: '40px', borderRadius: '20px', textAlign: 'center', color: '#64748b' }}>
            No projects found. Add projects from the Projects Manager first.
          </div>
        ) : (
          featuredProjects.map((proj, index) => (
            <div key={proj._id} style={{ background: '#0f172a', border: '1px solid rgba(210, 234, 38, 0.25)', borderRadius: '24px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', padding: '4px 12px', background: '#d2ea26', color: '#0f172a', borderRadius: '20px' }}>
                  HOME SLOT #{index + 1}
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>ID: {proj._id}</span>
              </div>

              <div className="row g-3 align-items-center">
                {/* Mockup Preview Column */}
                <div className="col-12 col-md-4">
                  <div style={{ height: '210px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#090d16', position: 'relative' }}>
                    <img src={proj.heroImg || proj.image || '/assets/portfolio/gyogrea.png'} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>

                {/* Form Fields Column */}
                <div className="col-12 col-md-8" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>PROJECT TITLE</label>
                    <input
                      type="text"
                      value={proj.title || ''}
                      onChange={(e) => {
                        const newTitle = e.target.value;
                        setProjects(prev => prev.map(p => p._id === proj._id ? { ...p, title: newTitle } : p));
                      }}
                      style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CATEGORY / SUBTITLE</label>
                    <input
                      type="text"
                      value={proj.category || ''}
                      onChange={(e) => {
                        const newCat = e.target.value;
                        setProjects(prev => prev.map(p => p._id === proj._id ? { ...p, category: newCat } : p));
                      }}
                      style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: '700', marginBottom: '6px' }}>LIVE WEBSITE DEMO URL (https://...)</label>
                    <input
                      type="text"
                      value={proj.liveUrl || ''}
                      placeholder="https://yourdomain.com or https://..."
                      onChange={(e) => {
                        const newUrl = e.target.value;
                        setProjects(prev => prev.map(p => p._id === proj._id ? { ...p, liveUrl: newUrl } : p));
                      }}
                      style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(210, 234, 38, 0.4)', borderRadius: '10px', color: '#ffffff' }}
                    />
                  </div>

                  <ImageUploadInput
                    label="HOME MOCKUP SCREENSHOT IMAGE (UPLOAD FROM PC)"
                    value={proj.heroImg || proj.image || ''}
                    onChange={(uploadedUrl) => {
                      setProjects(prev => prev.map(p => p._id === proj._id ? { ...p, heroImg: uploadedUrl, image: uploadedUrl } : p));
                    }}
                    placeholder="/assets/portfolio/... or choose file"
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                    <button
                      type="button"
                      onClick={() => handleUpdateProject(proj)}
                      disabled={savingId === proj._id}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#d2ea26', color: '#0f172a', borderRadius: '10px', fontWeight: '800', border: 'none', cursor: savingId === proj._id ? 'not-allowed' : 'pointer' }}
                    >
                      <Save size={16} />
                      <span>{savingId === proj._id ? 'Updating Live...' : 'Update Mockup & Live Link'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeSelectedWorksManager;
