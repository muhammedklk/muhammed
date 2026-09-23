import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsApi } from '../services/api';
import { Plus, Edit, Trash2, ExternalLink, Sparkles, GripVertical, ArrowLeft, ArrowRight, CheckCircle, Loader2 } from '../components/Icons';
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

  // Drag-and-drop & Touch Swipe reordering state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [orderToast, setOrderToast] = useState('');
  const touchStartRef = useRef({ x: 0, y: 0, index: null });

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
    order: 1,
    showCaseStudyBtn: true,
    showLiveUrlBtn: true,
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

      // Sort by order ascending
      combined.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

      setProjects(combined);
    } catch (err) {
      console.error('Failed to load projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- REORDER & DRAG/SWIPE HANDLERS ---
  const saveNewOrder = async (updatedProjects) => {
    const reorderedList = updatedProjects.map((p, idx) => ({
      ...p,
      order: idx + 1
    }));

    setProjects(reorderedList);
    setIsSavingOrder(true);

    try {
      const payload = reorderedList.map((p) => ({
        id: p._id || p.id,
        _id: p._id || p.id,
        order: p.order
      }));

      await projectsApi.reorder(payload);
      if (refreshPortfolio) {
        await refreshPortfolio();
      }
      setOrderToast('Priority order updated successfully!');
      setTimeout(() => setOrderToast(''), 3000);
    } catch (err) {
      console.error('Failed to save order:', err);
      setOrderToast('Error saving priority order.');
      setTimeout(() => setOrderToast(''), 3000);
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e, index) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }

    const updated = [...projects];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    setDraggedIndex(null);
    saveNewOrder(updated);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleShiftPriority = (index, direction) => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const updated = [...projects];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);

    saveNewOrder(updated);
  };

  const handleTouchStart = (e, index) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, index };
  };

  const handleTouchEnd = (e, index) => {
    if (touchStartRef.current.index !== index) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Detect horizontal swipe gesture (min 50px movement horizontally)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 60) {
      if (deltaX < 0) {
        // Swipe left -> move priority down (right)
        handleShiftPriority(index, 'right');
      } else {
        // Swipe right -> move priority up (left)
        handleShiftPriority(index, 'left');
      }
    }
    touchStartRef.current = { x: 0, y: 0, index: null };
  };

  // --- MODAL HANDLERS ---
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
        order: project.order !== undefined ? Number(project.order) : 1,
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
        order: projects.length + 1,
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
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a', letterSpacing: '-0.02em' }}>Projects & Case Studies</h1>
          <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, fontWeight: '500' }}>
            Manage client portfolio showcases. <span style={{ color: '#4f46e5', fontWeight: '700' }}>Drag & drop cards or use ← → arrows to reorder display priority.</span>
          </p>
        </div>

        <button onClick={() => handleOpenModal()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#0f172a', color: '#ffffff', borderRadius: '10px', fontWeight: '800', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' }}>
          <Plus size={18} />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Reorder Saving Status Toasts */}
      {orderToast && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#0f172a', color: '#ffffff', padding: '12px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(15,23,42,0.2)', zIndex: 9999 }}>
          <CheckCircle size={18} color="#22c55e" />
          <span>{orderToast}</span>
        </div>
      )}
      {isSavingOrder && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(15,23,42,0.1)', zIndex: 9999 }}>
          <Loader2 size={18} className="spin" color="#4f46e5" />
          <span>Saving updated project order...</span>
        </div>
      )}

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {projects.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '40px', gridColumn: '1 / -1', borderRadius: '16px', textAlign: 'center', color: '#64748b' }}>
            No projects added yet. Click "Add New Project" above to create your first portfolio work.
          </div>
        ) : (
          projects.map((project, index) => (
            <div
              key={project._id || project.id || index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={(e) => handleDragLeave(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onTouchStart={(e) => handleTouchStart(e, index)}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
              style={{
                background: '#ffffff',
                border: dragOverIndex === index ? '2px dashed #4f46e5' : '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                opacity: draggedIndex === index ? 0.4 : 1,
                transform: dragOverIndex === index ? 'scale(1.02)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'grab',
                position: 'relative',
                userSelect: 'none',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 10px 25px -5px rgba(15, 23, 42, 0.02)'
              }}
            >
              <div style={{ height: '180px', background: '#f8fafc', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #e2e8f0' }}>
                <img src={project.heroImg || project.image || '/assets/portfolio/gyogrea.png'} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                
                {/* Priority Badge with Grip Handle & Quick Move Arrows */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', color: '#ffffff', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '800', boxShadow: '0 4px 12px rgba(15,23,42,0.2)' }}>
                  <GripVertical size={14} style={{ opacity: 0.8 }} />
                  <span>Priority #{index + 1}</span>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', marginLeft: '4px', borderLeft: '1px solid rgba(255,255,255,0.25)', paddingLeft: '4px' }}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={(e) => { e.stopPropagation(); handleShiftPriority(index, 'left'); }}
                      title="Move Priority Up (Left)"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: index === 0 ? 'rgba(255,255,255,0.3)' : '#ffffff',
                        cursor: index === 0 ? 'default' : 'pointer',
                        padding: '0 2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ArrowLeft size={13} />
                    </button>
                    <button
                      type="button"
                      disabled={index === projects.length - 1}
                      onClick={(e) => { e.stopPropagation(); handleShiftPriority(index, 'right'); }}
                      title="Move Priority Down (Right)"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: index === projects.length - 1 ? 'rgba(255,255,255,0.3)' : '#ffffff',
                        cursor: index === projects.length - 1 ? 'default' : 'pointer',
                        padding: '0 2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                <span style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px 10px', background: 'rgba(255, 255, 255, 0.9)', color: '#0f172a', borderRadius: '20px', fontSize: '11px', fontWeight: '800', backdropFilter: 'blur(4px)', border: '1px solid #e2e8f0' }}>
                  {project.category}
                </span>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>{project.title}</h3>
                  <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 16px 0', lineHeight: 1.5, fontWeight: '500' }}>
                    {project.shortDescription || project.description || 'No description added.'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/projects/${project._id}/case-study`); }} style={{ flex: 1, padding: '8px 12px', background: '#eff6ff', color: '#2563eb', borderRadius: '10px', border: '1px solid #bfdbfe', cursor: 'pointer', fontSize: '12px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Sparkles size={14} />
                    <span>Case Study</span>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleOpenModal(project); }} style={{ padding: '8px 12px', background: '#ffffff', color: '#0f172a', borderRadius: '10px', border: '1px solid #cbd5e1', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
                    <Edit size={14} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(project._id); }} style={{ padding: '8px 12px', background: '#fef2f2', color: '#dc2626', borderRadius: '10px', border: '1px solid #fca5a5', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>{editingId ? 'Edit Project' : 'Create New Project'}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>PROJECT TITLE</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>CATEGORY</label>
                <input type="text" required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Travel & Hospitality, SaaS, E-Commerce" style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>SHORT DESCRIPTION</label>
                <textarea rows={3} value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
              </div>

              <ImageUploadInput label="HERO COVER IMAGE URL / FILE" value={formData.heroImg} onChange={(val) => setFormData({ ...formData, heroImg: val })} placeholder="/assets/portfolio/gyogrea.png or upload..." />

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>LIVE DEMO URL</label>
                <input type="text" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>DISPLAY PRIORITY ORDER (1 = First, 2 = Second, 3 = Third...)</label>
                <input type="number" min="1" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 1 })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontWeight: '800', fontSize: '13.5px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>TECHNOLOGIES (COMMA SEPARATED)</label>
                <input type="text" value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} placeholder="React, SCSS, Node.js" style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
              </div>

              {/* Button Visibility Toggles */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#0f172a', fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={formData.showCaseStudyBtn !== false}
                    onChange={(e) => setFormData({ ...formData, showCaseStudyBtn: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#4f46e5', cursor: 'pointer' }}
                  />
                  <span>Show Case Study Button</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#0f172a', fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={formData.showLiveUrlBtn !== false}
                    onChange={(e) => setFormData({ ...formData, showLiveUrlBtn: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#4f46e5', cursor: 'pointer' }}
                  />
                  <span>Show Live Link Button</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '10px 20px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#334155', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', background: '#0f172a', color: '#ffffff', borderRadius: '10px', fontWeight: '800', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' }}>Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
