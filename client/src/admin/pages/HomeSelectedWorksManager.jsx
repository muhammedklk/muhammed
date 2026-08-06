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
    const targetId = proj._id || proj.id;
    setSavingId(targetId);
    setMessage('');
    try {
      const categoryValue = proj.category || proj.subtitle || proj.shortDescription || 'UI/UX Design & Development';
      
      const payload = {
        ...proj,
        category: categoryValue,
        subtitle: categoryValue,
        shortDescription: categoryValue,
        heroImg: proj.heroImg || proj.image,
        image: proj.heroImg || proj.image,
        featured: true,
        caseStudy: {
          ...(proj.caseStudy || {}),
          category: categoryValue,
          subtitle: categoryValue
        }
      };

      const isMongoId = targetId && /^[0-9a-fA-F]{24}$/.test(targetId);
      if (isMongoId) {
        await projectsApi.update(targetId, payload);
      } else {
        await projectsApi.create({
          ...payload,
          slug: targetId || proj.title.toLowerCase().replace(/\s+/g, '-')
        });
      }

      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      setMessage(`Successfully updated "${proj.title}" mockup & subtitle live on Home Page!`);
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
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff' }}>Home Page Selected Works (2x2 Screen Layout)</h1>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Exclusively edit the top 4 mockup screenshots, titles, categories, and live links displayed on your public Home Page.</p>
        </div>
      </div>

      {message && (
        <div style={{ padding: '10px 16px', background: 'rgba(210, 234, 38, 0.15)', border: '1px solid rgba(210, 234, 38, 0.3)', color: '#d2ea26', borderRadius: '10px', marginBottom: '16px', fontWeight: '700', fontSize: '13px' }}>
          {message}
        </div>
      )}

      {/* 2x2 Grid of 4 Home Selected Works */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(540px, 1fr))', gap: '16px' }}>
        {featuredProjects.length === 0 ? (
          <div style={{ background: '#0f172a', padding: '30px', gridColumn: '1 / -1', borderRadius: '16px', textAlign: 'center', color: '#64748b' }}>
            No projects found. Add projects from the Projects Manager first.
          </div>
        ) : (
          featuredProjects.map((proj, index) => (
            <div key={proj._id || proj.id || index} style={{ background: '#0f172a', border: '1px solid rgba(210, 234, 38, 0.25)', borderRadius: '18px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Header Badge */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', padding: '3px 10px', background: '#d2ea26', color: '#0f172a', borderRadius: '20px' }}>
                  HOME SLOT #{index + 1}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>{proj.title}</span>
              </div>

              {/* Card Body Flex */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                {/* Mockup Preview Column */}
                <div style={{ width: '150px', flexShrink: 0 }}>
                  <div style={{ height: '145px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#090d16', position: 'relative' }}>
                    <img src={proj.heroImg || proj.image || '/assets/portfolio/gyogrea.png'} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>

                {/* Form Fields Column */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  
                  {/* Title & Subtitle side-by-side */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', color: '#94a3b8', fontWeight: '700', marginBottom: '3px' }}>TITLE</label>
                      <input
                        type="text"
                        value={proj.title || ''}
                        onChange={(e) => {
                          const newTitle = e.target.value;
                          setProjects(prev => prev.map(p => (p._id || p.id) === (proj._id || proj.id) ? { ...p, title: newTitle } : p));
                        }}
                        style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff', fontSize: '13px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', color: '#94a3b8', fontWeight: '700', marginBottom: '3px' }}>CATEGORY</label>
                      <input
                        type="text"
                        value={proj.category || proj.subtitle || proj.shortDescription || ''}
                        onChange={(e) => {
                          const newCat = e.target.value;
                          setProjects(prev => prev.map(p => (p._id || p.id) === (proj._id || proj.id) ? { ...p, category: newCat, subtitle: newCat, shortDescription: newCat } : p));
                        }}
                        style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  {/* Live Website Demo URL */}
                  <div>
                    <label style={{ display: 'block', fontSize: '10.5px', color: '#d2ea26', fontWeight: '700', marginBottom: '3px' }}>LIVE DEMO URL</label>
                    <input
                      type="text"
                      value={proj.liveUrl || ''}
                      placeholder="https://..."
                      onChange={(e) => {
                        const newUrl = e.target.value;
                        setProjects(prev => prev.map(p => (p._id || p.id) === (proj._id || proj.id) ? { ...p, liveUrl: newUrl } : p));
                      }}
                      style={{ width: '100%', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(210, 234, 38, 0.4)', borderRadius: '8px', color: '#ffffff', fontSize: '12.5px' }}
                    />
                  </div>

                  {/* Screenshot Image Upload */}
                  <ImageUploadInput
                    label="MOCKUP IMAGE"
                    value={proj.heroImg || proj.image || ''}
                    onChange={(uploadedUrl) => {
                      setProjects(prev => prev.map(p => (p._id || p.id) === (proj._id || proj.id) ? { ...p, heroImg: uploadedUrl, image: uploadedUrl } : p));
                    }}
                    placeholder="/assets/portfolio/... or upload file"
                  />

                  {/* Submit Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
                    <button
                      type="button"
                      onClick={() => handleUpdateProject(proj)}
                      disabled={savingId === (proj._id || proj.id)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#d2ea26', color: '#0f172a', borderRadius: '8px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: savingId === (proj._id || proj.id) ? 'not-allowed' : 'pointer' }}
                    >
                      <Save size={14} />
                      <span>{savingId === (proj._id || proj.id) ? 'Saving...' : 'Update Card'}</span>
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
