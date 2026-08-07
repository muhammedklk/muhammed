import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsApi } from '../services/api';
import { Plus, Edit, Trash2, ExternalLink, Sparkles } from '../components/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import { caseStudiesData } from '../../data/caseStudiesData';
import ImageUploadInput from '../components/ImageUploadInput';

const ProjectsManager = () => {
  const navigate = useNavigate();
  const { refreshPortfolio } = usePortfolio();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Travel & Hospitality',
    shortDescription: '',
    heroImg: '',
    showcaseImg: '',
    liveUrl: '',
    githubUrl: '',
    technologies: 'React, Node.js, Tailwind',
    status: 'publish',
    featured: false,
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
              showcaseImg: staticProj.showcaseImg,
              shortDescription: staticProj.tagline || staticProj.overview || '',
              technologies: typeof staticProj.techTags === 'string' ? staticProj.techTags.split(',').map(s => s.trim()) : (staticProj.techTags || []),
              tags: typeof staticProj.techTags === 'string' ? staticProj.techTags.split(',').map(s => s.trim()) : (staticProj.techTags || []),
              caseStudy: staticProj
            });
          }
        });
      }

      setProjects(combined);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingId(project._id);
      setFormData({
        title: project.title || '',
        category: project.category || 'Travel & Hospitality',
        shortDescription: project.shortDescription || project.description || '',
        heroImg: project.heroImg || project.image || '',
        showcaseImg: project.showcaseImg || '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        technologies: Array.isArray(project.tags) ? project.tags.join(', ') : project.technologies?.join(', ') || '',
        status: project.status || 'publish',
        featured: project.featured || false,
        showCaseStudyBtn: project.showCaseStudyBtn !== undefined ? project.showCaseStudyBtn : true,
        showLiveUrlBtn: project.showLiveUrlBtn !== undefined ? project.showLiveUrlBtn : true,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        category: 'Travel & Hospitality',
        shortDescription: '',
        heroImg: '',
        showcaseImg: '',
        liveUrl: '',
        githubUrl: '',
        technologies: 'React, Node.js, Tailwind',
        status: 'publish',
        featured: false,
        showCaseStudyBtn: true,
        showLiveUrlBtn: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: typeof formData.technologies === 'string' 
          ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean) 
          : formData.technologies
      };

      const isMongoId = editingId && /^[0-9a-fA-F]{24}$/.test(editingId);
      if (isMongoId) {
        await projectsApi.update(editingId, payload);
      } else {
        await projectsApi.create({
          ...payload,
          slug: editingId || payload.title.toLowerCase().replace(/\s+/g, '-')
        });
      }
      
      if (refreshPortfolio) {
        await refreshPortfolio();
      }

      handleCloseModal();
      fetchProjects();
    } catch (err) {
      alert('Error saving project: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsApi.delete(id);
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      fetchProjects();
    } catch (err) {
      alert('Error deleting project: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#ffffff' }}>Projects & Case Studies</h1>
          <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0 }}>Manage client portfolio showcases, live URLs, images, and case study pages.</p>
        </div>

        <button onClick={() => handleOpenModal()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#d2ea26', color: '#0f172a', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
          <Plus size={18} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {projects.length === 0 ? (
          <div style={{ background: '#0f172a', padding: '40px', gridColumn: '1 / -1', borderRadius: '20px', textAlign: 'center', color: '#64748b' }}>
            No projects added yet. Click "Add New Project" above to create your first portfolio work.
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '180px', background: '#1e293b', position: 'relative', overflow: 'hidden' }}>
                <img src={project.heroImg || project.image || '/assets/portfolio/gyogrea.png'} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', background: 'rgba(15, 23, 42, 0.8)', color: '#d2ea26', borderRadius: '20px', fontSize: '11px', fontWeight: '800', backdropFilter: 'blur(4px)' }}>
                  {project.category}
                </span>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0' }}>{project.title}</h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                    {project.shortDescription || project.description || 'No description added.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button onClick={() => navigate(`/admin/projects/${project._id}/case-study`)} style={{ flex: 1, padding: '8px 12px', background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', borderRadius: '10px', border: '1px solid rgba(210, 234, 38, 0.3)', cursor: 'pointer', fontSize: '12px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Sparkles size={14} />
                    <span>Case Study</span>
                  </button>
                  <button onClick={() => handleOpenModal(project)} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.05)', color: '#ffffff', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
                    <Edit size={14} />
                  </button>
                  <button onClick={() => handleDelete(project._id)} style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.3)', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(210, 234, 38, 0.3)', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#d2ea26', marginBottom: '20px' }}>{editingId ? 'Edit Project' : 'Create New Project'}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>PROJECT TITLE</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>CATEGORY</label>
                <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Travel & Hospitality, SaaS, E-Commerce" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>SHORT DESCRIPTION</label>
                <textarea rows={3} value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
              </div>

              <ImageUploadInput label="HERO COVER IMAGE URL / FILE" value={formData.heroImg} onChange={(val) => setFormData({ ...formData, heroImg: val })} placeholder="/assets/portfolio/gyogrea.png or upload..." />

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>LIVE DEMO URL</label>
                <input type="text" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', fontWeight: '700', marginBottom: '6px' }}>TECHNOLOGIES (COMMA SEPARATED)</label>
                <input type="text" value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} placeholder="React, SCSS, Node.js" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#ffffff' }} />
              </div>

              {/* Button Visibility Toggles */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', background: 'rgba(255,255,255,0.03)', padding: '14px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#ffffff', fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={formData.showCaseStudyBtn !== false}
                    onChange={(e) => setFormData({ ...formData, showCaseStudyBtn: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#d2ea26', cursor: 'pointer' }}
                  />
                  <span>Show Case Study Button</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#ffffff', fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={formData.showLiveUrlBtn !== false}
                    onChange={(e) => setFormData({ ...formData, showLiveUrlBtn: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#d2ea26', cursor: 'pointer' }}
                  />
                  <span>Show Live Link Button</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: '#d2ea26', color: '#0f172a', borderRadius: '10px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
