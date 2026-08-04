import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');

  const emptyProject = {
    slug: '',
    title: '',
    tagline: '',
    category: 'UI/UX Design',
    services: 'UI/UX & Web Development',
    client: '',
    year: '2026',
    liveUrl: '',
    heroImg: '',
    showcaseImg: '',
    mobileImg1: '',
    mobileImg2: '',
    bannerImg: '',
    descriptionParagraph1: '',
    descriptionParagraph2: '',
    techTags: 'Figma, React, SCSS, Vercel',
    outcome: '',
    featured: true
  };

  const [formData, setFormData] = useState(emptyProject);

  const formatImgUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
    return `/${url}`;
  };

  const fetchProjects = async () => {
    // ⚡ Show localStorage cache IMMEDIATELY (zero wait)
    try {
      const cached = JSON.parse(localStorage.getItem('admin_projects_cached') || '[]');
      if (cached.length > 0) {
        setProjects(cached);
        setLoading(false);
      }
    } catch (_) {}

    // Then fetch fresh data from API in background
    try {
      const res = await api.get('/projects');
      const apiProjects = res.data || [];
      // Merge with locally saved images
      const imgStore = JSON.parse(localStorage.getItem('project_images_store') || '{}');
      const merged = apiProjects.map((p) => ({
        ...p,
        ...(imgStore[p._id] || {})
      }));
      setProjects(merged);
      // Cache for next instant load
      try { localStorage.setItem('admin_projects_cached', JSON.stringify(merged)); } catch (_) {}
    } catch (err) {
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  const openCreateModal = () => {
    setEditingProject(null);
    setFormData(emptyProject);
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      ...proj,
      title: proj?.title || '',
      slug: proj?.slug || '',
      tagline: proj?.tagline || '',
      category: proj?.category || 'UI/UX Design',
      services: proj?.services || 'UI/UX & Web Development',
      client: proj?.client || '',
      year: proj?.year || '2026',
      liveUrl: proj?.liveUrl || '',
      heroImg: formatImgUrl(proj?.heroImg),
      showcaseImg: formatImgUrl(proj?.showcaseImg),
      mobileImg1: formatImgUrl(proj?.mobileImg1),
      mobileImg2: formatImgUrl(proj?.mobileImg2),
      bannerImg: formatImgUrl(proj?.bannerImg),
      descriptionParagraph1: proj?.descriptionParagraph1 || proj?.description?.[0] || '',
      descriptionParagraph2: proj?.descriptionParagraph2 || proj?.description?.[1] || '',
      techTags: proj?.techTags || 'Figma, React, CSS, Vercel',
      outcome: proj?.outcome || ''
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        alert('Failed to delete project: ' + (err.response?.data?.message || err.message));
      }
    }
  };


  // Compress image using Canvas — reduces to ~100-200KB per image (safe for MongoDB via Vercel)
  const compressImage = (file, maxWidth = 1200, quality = 0.75) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        // Fallback: direct FileReader without compression
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result || '');
        reader.readAsDataURL(file);
      };

      img.src = url;
    });
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const compressed = await compressImage(file);
      setFormData((prev) => ({ ...prev, [fieldName]: compressed }));
      setToast('✅ Image ready! Click Save to apply.');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error('Image processing failed:', err);
      setToast('❌ Image failed. Try a smaller file.');
      setTimeout(() => setToast(''), 3000);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      description: [
        formData.descriptionParagraph1,
        formData.descriptionParagraph2
      ].filter(Boolean)
    };

    try {
      let savedProject;
      if (editingProject) {
        const res = await api.put(`/projects/${editingProject._id}`, payload);
        savedProject = { ...payload, _id: editingProject._id, ...(res.data && res.data._id ? res.data : {}) };
        setProjects((prev) => prev.map((p) => p._id === editingProject._id ? savedProject : p));
      } else {
        const res = await api.post('/projects', payload);
        savedProject = (res.data && res.data._id) ? res.data : { ...payload, _id: Date.now().toString() };
        setProjects((prev) => [...prev, savedProject]);
      }

      // Persist images to localStorage (cross-session reliability)
      try {
        const imgStore = JSON.parse(localStorage.getItem('project_images_store') || '{}');
        imgStore[savedProject._id] = {
          heroImg: payload.heroImg,
          showcaseImg: payload.showcaseImg,
          mobileImg1: payload.mobileImg1,
          mobileImg2: payload.mobileImg2,
          bannerImg: payload.bannerImg,
        };
        localStorage.setItem('project_images_store', JSON.stringify(imgStore));
      } catch (_) {}

      // Update full project cache for instant admin load
      try {
        const cached = JSON.parse(localStorage.getItem('admin_projects_cached') || '[]');
        const updated = editingProject
          ? cached.map((p) => p._id === editingProject._id ? savedProject : p)
          : [...cached, savedProject];
        localStorage.setItem('admin_projects_cached', JSON.stringify(updated));
      } catch (_) {}

      setModalOpen(false);
      setToast('✅ Case study saved successfully!');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      alert('Error saving project: ' + (err.response?.data?.message || err.message));
    }
  };



  return (
    <div style={{ width: '100%' }}>

      {/* Page-level toast (visible even after modal closes) */}
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '24px', zIndex: 9999, background: toast.startsWith('✅') ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', border: `1px solid ${toast.startsWith('✅') ? '#22c55e' : '#ef4444'}`, borderRadius: '12px', padding: '12px 20px', color: toast.startsWith('✅') ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: '14px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>📁 Case Studies Manager</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Add, edit, or delete portfolio projects and full Case Study page details
          </p>
        </div>

        <button
          onClick={openCreateModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #d2ea26 0%, #a3b814 100%)',
            color: '#0f172a',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Projects Table List */}
      <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
              <th style={{ padding: '16px 20px' }}>Project Title</th>
              <th style={{ padding: '16px 20px' }}>Slug</th>
              <th style={{ padding: '16px 20px' }}>Category</th>
              <th style={{ padding: '16px 20px' }}>Year</th>
              <th style={{ padding: '16px 20px' }}>Live Link</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>Loading Case Studies...</td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: '#94a3b8' }}>No case studies created yet. Click "Add New Case Study" to start!</td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p._id || p.slug || Math.random()} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {p.heroImg ? (
                        <img src={formatImgUrl(p.heroImg)} alt="" style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      )}
                      <span>{p.title || 'Untitled Project'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#cbd5e1', fontFamily: 'monospace' }}>{p.slug || '-'}</td>
                  <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{p.category || '-'}</td>
                  <td style={{ padding: '16px 20px', color: '#94a3b8' }}>{p.year || '2026'}</td>
                  <td style={{ padding: '16px 20px' }}>
                    {p.liveUrl ? (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#d2ea26', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> Live
                      </a>
                    ) : (
                      <span style={{ color: '#64748b' }}>-</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <Link
                      to={`/admin/case-study/${p.slug || p._id}`}
                      style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', textDecoration: 'none', borderRadius: '8px', padding: '6px 12px', marginRight: '8px', fontSize: '12px', fontWeight: 700 }}
                    >
                      📖 Edit Case Study Page
                    </Link>
                    <button
                      onClick={() => openEditModal(p)}
                      style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: 'none', borderRadius: '8px', padding: '6px 12px', marginRight: '8px', cursor: 'pointer' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Case Study Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#12141a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', width: '100%', maxWidth: '880px', maxHeight: '90vh', overflowY: 'auto', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#fff' }}>
                {editingProject ? `Edit Case Study: ${formData.title}` : 'Create New Case Study'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            {/* In-modal toast — for image upload feedback */}
            {toast && !toast.includes('saved') && (
              <div style={{ background: toast.startsWith('✅') ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${toast.startsWith('✅') ? '#22c55e' : '#ef4444'}`, borderRadius: '10px', padding: '10px 16px', color: toast.startsWith('✅') ? '#22c55e' : '#ef4444', fontSize: '14px', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                {toast}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Basic Meta Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Slug (URL identifier)</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="e.g. styleora"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Tagline & Live URL */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Headline / Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="Modern Luxury E-Commerce & Retail Flagship"
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Live Website URL</label>
                  <input
                    type="text"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Case Study Meta Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Category</label>
                  <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Services</label>
                  <input type="text" value={formData.services} onChange={(e) => setFormData({ ...formData, services: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Client</label>
                  <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Year</label>
                  <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
                </div>
              </div>

              {/* Case Study Overview Paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Case Study Overview Paragraph 1</label>
                  <textarea rows="2" value={formData.descriptionParagraph1} onChange={(e) => setFormData({ ...formData, descriptionParagraph1: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Case Study Overview Paragraph 2</label>
                  <textarea rows="2" value={formData.descriptionParagraph2} onChange={(e) => setFormData({ ...formData, descriptionParagraph2: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
                </div>
              </div>

              {/* Tech Tags */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>Tech Stack Tags (Comma separated)</label>
                <input type="text" value={formData.techTags} onChange={(e) => setFormData({ ...formData, techTags: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
              </div>

              {/* Cloudinary Image Assets with Figma Dimension Badges */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' }}>
                <h4 style={{ fontSize: '15px', color: '#d2ea26', margin: '0 0 16px 0', fontWeight: 700 }}>🖼️ Image Assets & Figma Canvas Dimensions</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {/* Hero Image */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px' }}>
                    <span style={{ fontSize: '11px', background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginBottom: '6px' }}>
                      📐 Figma Spec: 1440 × 900 px (16:9 Desktop)
                    </span>
                    <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Hero Laptop Showcase</label>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {formData.heroImg && <img src={formatImgUrl(formData.heroImg)} alt="" style={{ width: '64px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />}
                      <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                        Upload
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'heroImg')} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  {/* Secondary Showcase Image */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px' }}>
                    <span style={{ fontSize: '11px', background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginBottom: '6px' }}>
                      📐 Figma Spec: 1440 × 900 px (16:9 Desktop)
                    </span>
                    <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Secondary Showcase Image</label>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {formData.showcaseImg && <img src={formatImgUrl(formData.showcaseImg)} alt="" style={{ width: '64px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />}
                      <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                        Upload
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'showcaseImg')} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  {/* Mobile Image 1 */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px' }}>
                    <span style={{ fontSize: '11px', background: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginBottom: '6px' }}>
                      📐 Figma Spec: 414 × 896 px (9:19.5 Mobile)
                    </span>
                    <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Mobile Phone Mockup 1</label>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {formData.mobileImg1 && <img src={formatImgUrl(formData.mobileImg1)} alt="" style={{ width: '32px', height: '56px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />}
                      <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                        Upload
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'mobileImg1')} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  {/* Mobile Image 2 */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px' }}>
                    <span style={{ fontSize: '11px', background: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginBottom: '6px' }}>
                      📐 Figma Spec: 414 × 896 px (9:19.5 Mobile)
                    </span>
                    <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>Mobile Phone Mockup 2</label>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {formData.mobileImg2 && <img src={formatImgUrl(formData.mobileImg2)} alt="" style={{ width: '32px', height: '56px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />}
                      <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                        Upload
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'mobileImg2')} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Outcome Statement</label>
                <textarea rows="2" value={formData.outcome} onChange={(e) => setFormData({ ...formData, outcome: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={uploading} style={{ background: 'linear-gradient(135deg, #d2ea26 0%, #a3b814 100%)', color: '#0f172a', border: 'none', borderRadius: '10px', padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
                  {uploading ? 'Uploading...' : 'Save Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectsManager;
