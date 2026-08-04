import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminHomeEditor = () => {
  const [homeData, setHomeData] = useState({
    heroHeading1: 'Bringing ideas',
    heroHeading2: 'to life',
    heroHeading3: 'through design',
    heroSubtitle: 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products.',
    aboutBadge: 'ABOUT MY CRAFT',
    aboutHeadline: 'Helping brands achieve digital mastery through creative innovation & strategic planning',
    aboutBio: 'I specialize in transforming complex business problems into clean, memorable, and high-converting web interfaces.',
    service1Title: 'UI/UX Interface Design',
    service1Tag: 'Figma & Systems',
    service1Img: '/assets/portfolio/1-styleora.jpg',
    service2Title: 'Front-End Web Development',
    service2Tag: 'React & Speed',
    service2Img: '/assets/portfolio/gyogrea.png',
    service3Title: 'Mobile App Design',
    service3Tag: 'iOS & Android',
    service3Img: '/assets/portfolio/2-elve.jpg',
    footerEmail: 'muhammedklkm@gmail.com',
    footerPhone: '+91 9656216086',
    footerLocation: 'Kerala, India',
    footerLocationSub: 'Remote Worldwide',
    instagramUrl: 'https://www.instagram.com/___muhammedk/',
    linkedinUrl: 'https://www.linkedin.com/in/muhammed-klkm/',
    githubUrl: 'https://github.com/muhammedklk',
    copyrightText: '© 2026 Muhammed. All rights reserved.'
  });

  const [projects, setProjects] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const formatImgUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
    return `/${url}`;
  };

  const fetchHomeData = async () => {
    try {
      const [profileRes, projectsRes, faqsRes] = await Promise.all([
        api.get('/profile').catch(() => ({ data: null })),
        api.get('/projects').catch(() => ({ data: [] })),
        api.get('/faqs').catch(() => ({ data: [] }))
      ]);

      if (profileRes.data) {
        setHomeData((prev) => ({ ...prev, ...profileRes.data }));
      }
      setProjects(projectsRes.data || []);
      setFaqs(faqsRes.data || []);
    } catch (err) {
      console.error('Error loading home page config:', err);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await api.post('/upload', uploadData);
      if (res.data?.url) {
        setHomeData((prev) => ({ ...prev, [fieldName]: formatImgUrl(res.data.url) }));
      }
    } catch (err) {
      alert('Image upload failed');
    }
  };

  const handleProjectImageUpload = async (e, projectId) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await api.post('/upload', uploadData);
      if (res.data?.url) {
        const updatedProjects = projects.map((p) =>
          p._id === projectId ? { ...p, heroImg: formatImgUrl(res.data.url) } : p
        );
        setProjects(updatedProjects);
        await api.put(`/projects/${projectId}`, { heroImg: formatImgUrl(res.data.url) });
      }
    } catch (err) {
      alert('Project image upload failed');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');

    try {
      await api.put('/profile', homeData);
      setFeedback('Home Page & Footer content saved successfully!');
      setTimeout(() => setFeedback(''), 4000);
    } catch (err) {
      setFeedback('Failed to save Home page content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>🏠 Home Page & Footer Editor</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Manage Hero text, Service cards, Selected Works images, FAQs, and Footer links
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
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {feedback && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '14px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, marginBottom: '28px' }}>
          ✓ {feedback}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* SECTION 1: HERO STAGE & HEADLINES */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 1: Hero Stage & Main Headlines</h3>
            <span style={{ fontSize: '12px', background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '4px 10px', borderRadius: '20px' }}>Hero Section</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Hero Line 1</label>
              <input type="text" value={homeData.heroHeading1} onChange={(e) => setHomeData({ ...homeData, heroHeading1: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Hero Line 2 (Highlighted)</label>
              <input type="text" value={homeData.heroHeading2} onChange={(e) => setHomeData({ ...homeData, heroHeading2: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Hero Line 3</label>
              <input type="text" value={homeData.heroHeading3} onChange={(e) => setHomeData({ ...homeData, heroHeading3: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Hero Subtitle Paragraph</label>
            <textarea rows="3" value={homeData.heroSubtitle} onChange={(e) => setHomeData({ ...homeData, heroSubtitle: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
          </div>
        </div>

        {/* SECTION 2: ABOUT TEASER & SERVICE CARDS */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 2: About Teaser & Service Cards</h3>
            <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '4px 10px', borderRadius: '20px' }}>Services Section</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>About Teaser Main Headline</label>
            <input type="text" value={homeData.aboutHeadline} onChange={(e) => setHomeData({ ...homeData, aboutHeadline: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
          </div>

          <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '14px', fontWeight: 700 }}>Service Cards & Figma Image Specifications</h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* Service 1 */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
              <span style={{ fontSize: '11px', background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginBottom: '8px' }}>
                📐 Figma Spec: 400 × 300 px (4:3)
              </span>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Service 1 Title</label>
              <input type="text" value={homeData.service1Title} onChange={(e) => setHomeData({ ...homeData, service1Title: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', marginBottom: '10px' }} />

              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Card Image</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {homeData.service1Img && <img src={formatImgUrl(homeData.service1Img)} alt="" style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />}
                <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                  Upload
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'service1Img')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Service 2 */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
              <span style={{ fontSize: '11px', background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginBottom: '8px' }}>
                📐 Figma Spec: 400 × 300 px (4:3)
              </span>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Service 2 Title</label>
              <input type="text" value={homeData.service2Title} onChange={(e) => setHomeData({ ...homeData, service2Title: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', marginBottom: '10px' }} />

              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Card Image</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {homeData.service2Img && <img src={formatImgUrl(homeData.service2Img)} alt="" style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />}
                <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                  Upload
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'service2Img')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Service 3 */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
              <span style={{ fontSize: '11px', background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginBottom: '8px' }}>
                📐 Figma Spec: 400 × 300 px (4:3)
              </span>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Service 3 Title</label>
              <input type="text" value={homeData.service3Title} onChange={(e) => setHomeData({ ...homeData, service3Title: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', marginBottom: '10px' }} />

              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Card Image</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {homeData.service3Img && <img src={formatImgUrl(homeData.service3Img)} alt="" style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />}
                <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                  Upload
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'service3Img')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: HOME PAGE SELECTED WORKS & PROJECT IMAGES EDIT EDITOR */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: '#d2ea26' }}>Section 3: Home Page Selected Works Projects & Images</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Directly edit showcase titles, subtexts, and upload crisp project images for the Home Page grid</p>
            </div>
            <Link to="/admin/projects" style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '6px 14px', borderRadius: '10px', textDecoration: 'none', fontSize: '12px', fontWeight: 700 }}>
              Full Case Studies Manager →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {projects.slice(0, 4).map((proj) => (
              <div key={proj._id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
                <span style={{ fontSize: '11px', background: '#eab308', color: '#000', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, display: 'inline-block', marginBottom: '8px' }}>
                  📐 Figma Spec: 1440 × 900 px (16:9)
                </span>
                
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' }}>Project Title</label>
                  <input type="text" value={proj.title} onChange={(e) => {
                    const newTitle = e.target.value;
                    setProjects(projects.map((p) => p._id === proj._id ? { ...p, title: newTitle } : p));
                    api.put(`/projects/${proj._id}`, { title: newTitle });
                  }} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '13px', fontWeight: 700 }} />
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '4px' }}>Subtitle / Category</label>
                  <input type="text" value={proj.tagline || proj.category} onChange={(e) => {
                    const newTag = e.target.value;
                    setProjects(projects.map((p) => p._id === proj._id ? { ...p, tagline: newTag } : p));
                    api.put(`/projects/${proj._id}`, { tagline: newTag });
                  }} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#94a3b8', fontSize: '12px' }} />
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {proj.heroImg && <img src={formatImgUrl(proj.heroImg)} alt="" style={{ width: '64px', height: '42px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />}
                  <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                    Upload Image
                    <input type="file" accept="image/*" onChange={(e) => handleProjectImageUpload(e, proj._id)} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: FAQS SECTION CONFIG */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 4: Home Page FAQs Items</h3>
            <Link to="/admin/faqs" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '6px 14px', borderRadius: '10px', textDecoration: 'none', fontSize: '12px', fontWeight: 700 }}>
              Full FAQs Manager →
            </Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((f) => (
              <div key={f._id} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '12px 16px' }}>
                <strong style={{ color: '#fff', fontSize: '14px', display: 'block', marginBottom: '4px' }}>{f.question}</strong>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: FOOTER CONTENT & SOCIAL LINKS CONFIG */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 5: Footer Content & Social Media Links</h3>
            <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '20px' }}>Global Footer</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Footer Large Email</label>
              <input type="email" value={homeData.footerEmail} onChange={(e) => setHomeData({ ...homeData, footerEmail: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Phone / WhatsApp</label>
              <input type="text" value={homeData.footerPhone} onChange={(e) => setHomeData({ ...homeData, footerPhone: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Location Line 1</label>
              <input type="text" value={homeData.footerLocation} onChange={(e) => setHomeData({ ...homeData, footerLocation: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Instagram Link</label>
              <input type="text" value={homeData.instagramUrl} onChange={(e) => setHomeData({ ...homeData, instagramUrl: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>LinkedIn Link</label>
              <input type="text" value={homeData.linkedinUrl} onChange={(e) => setHomeData({ ...homeData, linkedinUrl: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>GitHub Link</label>
              <input type="text" value={homeData.githubUrl} onChange={(e) => setHomeData({ ...homeData, githubUrl: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AdminHomeEditor;
