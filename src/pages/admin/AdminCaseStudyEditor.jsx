import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

const AdminCaseStudyEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentId = id || 'voyagera';

  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const [caseData, setCaseData] = useState({
    slug: 'voyagera',
    title: 'Voyagera',
    tagline: 'World Expeditions & Luxury Havens Travel Platform',
    category: 'Travel & Hospitality',
    services: 'UI/UX & Web Development',
    client: 'Voyagera Group',
    year: '2026',
    liveUrl: 'https://voyageratravel.vercel.app/',
    heroImg: '/assets/portfolio/gyogrea.png',
    showcaseImg: '/assets/portfolio/gyogrea.png',
    mobileImg1: '/assets/portfolio/3-greentrack.jpg',
    mobileImg2: '/assets/portfolio/2-elve.jpg',
    bannerImg: '/assets/portfolio/gyogrea.png',
    descriptionParagraph1: 'Voyagera is a next-generation luxury travel expedition platform engineered to connect discerning global explorers with handpicked luxury retreats and sacred sanctuaries around the globe.',
    descriptionParagraph2: 'Built with a strong focus on immersive visual storytelling, fluid interactive destination filtering, and frictionless reservation workflows, the application balances rich photography with crisp typography and modern component architecture.',
    descriptionParagraph3: 'Every breakpoint and asset pipeline was tuned to ensure sub-second rendering, micro-animations, and fluid touch interactions across all mobile and desktop browsers.',
    outcome: 'Delivered a 99+ PageSpeed performance rating with 45% increase in user session duration and seamless booking conversion across mobile and desktop.',
    techTags: 'Figma, HTML5/SCSS, JavaScript, GSAP Animations, Lenis Scroll, Vercel',
    color1Hex: '#D2EA26',
    color1Name: 'Accent Lime',
    color2Hex: '#849A00',
    color2Name: 'Dark Lime Accent',
    color3Hex: '#0F172A',
    color3Name: 'Dark Surface',
    color4Hex: '#F8FAFC',
    color4Name: 'Light Background',
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter / System Sans'
  });

  const formatImgUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
    return `/${url}`;
  };

  const fetchCaseStudyData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      if (res.data && res.data.length > 0) {
        setProjectsList(res.data);
        const selected = res.data.find((p) => p.slug === currentId || p._id === currentId) || res.data[0];
        
        if (selected) {
          setCaseData({
            slug: selected.slug || 'voyagera',
            title: selected.title || 'Voyagera',
            tagline: selected.tagline || 'World Expeditions & Luxury Havens Travel Platform',
            category: selected.category || 'Travel & Hospitality',
            services: selected.services || 'UI/UX & Web Development',
            client: selected.client || 'Voyagera Group',
            year: selected.year || '2026',
            liveUrl: selected.liveUrl || '',
            heroImg: formatImgUrl(selected.heroImg) || '/assets/portfolio/gyogrea.png',
            showcaseImg: formatImgUrl(selected.showcaseImg) || '/assets/portfolio/gyogrea.png',
            mobileImg1: formatImgUrl(selected.mobileImg1) || '/assets/portfolio/3-greentrack.jpg',
            mobileImg2: formatImgUrl(selected.mobileImg2) || '/assets/portfolio/2-elve.jpg',
            bannerImg: formatImgUrl(selected.bannerImg) || '/assets/portfolio/gyogrea.png',
            descriptionParagraph1: selected.descriptionParagraph1 || selected.description?.[0] || 'Voyagera is a next-generation luxury travel expedition platform.',
            descriptionParagraph2: selected.descriptionParagraph2 || selected.description?.[1] || 'Built with a strong focus on immersive visual storytelling.',
            descriptionParagraph3: selected.descriptionParagraph3 || selected.description?.[2] || '',
            outcome: selected.outcome || 'Delivered a 99+ PageSpeed performance rating with seamless booking conversion.',
            techTags: selected.techTags || 'Figma, React, GSAP Animations, Lenis Scroll, Vercel',
            color1Hex: formatImgUrl(selected.color1Hex) || selected.color1Hex || '#D2EA26',
            color1Name: selected.color1Name || 'Accent Lime',
            color2Hex: selected.color2Hex || '#849A00',
            color2Name: selected.color2Name || 'Dark Lime Accent',
            color3Hex: selected.color3Hex || '#0F172A',
            color3Name: selected.color3Name || 'Dark Surface',
            color4Hex: selected.color4Hex || '#F8FAFC',
            color4Name: selected.color4Name || 'Light Background',
            headingFont: selected.headingFont || 'Plus Jakarta Sans',
            bodyFont: selected.bodyFont || 'Inter / System Sans',
            _id: selected._id
          });
        }
      }
    } catch (err) {
      console.error('Error fetching Case Study data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudyData();
  }, [currentId]);

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await api.post('/upload', uploadData);
      if (res.data?.url) {
        setCaseData((prev) => ({ ...prev, [fieldName]: formatImgUrl(res.data.url) }));
      }
    } catch (err) {
      alert('Image upload failed');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');

    try {
      const payload = {
        ...caseData,
        description: [
          caseData.descriptionParagraph1,
          caseData.descriptionParagraph2,
          caseData.descriptionParagraph3
        ].filter(Boolean)
      };

      if (caseData._id) {
        await api.put(`/projects/${caseData._id}`, payload);
      } else {
        await api.post('/projects', payload);
      }

      setFeedback(`Case Study for "${caseData.title}" saved successfully!`);
      setTimeout(() => setFeedback(''), 4000);
    } catch (err) {
      setFeedback('Failed to save Case Study details');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Top Header & Project Selector Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>
            📖 Real-Time Case Study Page Editor
          </h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Edit full Case Study layout, Hero laptop frame, specs, tech stack, color palette, and mobile phone mockups
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Project Switcher Select */}
          <select
            value={currentId}
            onChange={(e) => navigate(`/admin/case-study/${e.target.value}`)}
            style={{
              background: '#12141a',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#d2ea26',
              padding: '10px 16px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {projectsList.map((p) => (
              <option key={p.slug || p._id} value={p.slug || p._id}>
                Project: {p.title}
              </option>
            ))}
          </select>

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
              whiteSpace: 'nowrap',
              minWidth: '160px',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            <span>{saving ? 'Saving...' : 'Save Case Study'}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '14px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, marginBottom: '28px' }}>
          ✓ {feedback}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* SECTION 1: HERO SHOWCASE & TOP BRAND */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 1: Brand Title & Laptop Hero Frame</h3>
            <a href={`/case-study?id=${caseData.slug}`} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#d2ea26', textDecoration: 'none' }}>
              Preview Live Page ↗
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Project Title</label>
              <input type="text" value={caseData.title} onChange={(e) => setCaseData({ ...caseData, title: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Headline / Tagline</label>
              <input type="text" value={caseData.tagline} onChange={(e) => setCaseData({ ...caseData, tagline: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>

          {/* Hero Laptop Showcase Image Uploader */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
            <span style={{ fontSize: '11px', background: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, display: 'inline-block', marginBottom: '8px' }}>
              📐 Figma Recommended: 1440 × 900 px (16:9 Laptop Screen)
            </span>
            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>Hero Laptop Showcase Image</label>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {caseData.heroImg && <img src={formatImgUrl(caseData.heroImg)} alt="" style={{ width: '120px', height: '75px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} />}
              <div style={{ flex: 1 }}>
                <input type="text" value={caseData.heroImg} onChange={(e) => setCaseData({ ...caseData, heroImg: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '12px', marginBottom: '8px' }} />
                <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-block' }}>
                  Upload Hero Laptop Image
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'heroImg')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SPECS GRID & OVERVIEW STORY */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 2: Specifications & Overview Story</h3>
            <span style={{ fontSize: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '4px 10px', borderRadius: '20px' }}>Meta & Story</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Category</label>
              <input type="text" value={caseData.category} onChange={(e) => setCaseData({ ...caseData, category: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Services</label>
              <input type="text" value={caseData.services} onChange={(e) => setCaseData({ ...caseData, services: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Client</label>
              <input type="text" value={caseData.client} onChange={(e) => setCaseData({ ...caseData, client: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Year</label>
              <input type="text" value={caseData.year} onChange={(e) => setCaseData({ ...caseData, year: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#fff' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Overview Paragraph 1</label>
              <textarea rows="3" value={caseData.descriptionParagraph1} onChange={(e) => setCaseData({ ...caseData, descriptionParagraph1: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Overview Paragraph 2</label>
              <textarea rows="3" value={caseData.descriptionParagraph2} onChange={(e) => setCaseData({ ...caseData, descriptionParagraph2: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            </div>
          </div>
        </div>

        {/* SECTION 3: TECH STACK, COLOR PALETTE & TYPOGRAPHY */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 3: Design System — Tech, Colors & Typography</h3>
            <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '20px' }}>Design System</span>
          </div>

          {/* ── Tech Stack ── */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>⚙️ Tech Stack Tags</label>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0' }}>Comma separated — e.g. Figma, React, GSAP, Vercel</p>
            <input type="text" value={caseData.techTags} onChange={(e) => setCaseData({ ...caseData, techTags: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
            {/* Live Tag Preview */}
            {caseData.techTags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                {caseData.techTags.split(',').map((t, i) => (
                  <span key={i} style={{ background: 'rgba(210,234,38,0.1)', color: '#d2ea26', border: '1px solid rgba(210,234,38,0.2)', borderRadius: '20px', padding: '3px 10px', fontSize: '11px', fontWeight: 600 }}>{t.trim()}</span>
                ))}
              </div>
            )}
          </div>

          {/* ── Color Palette ── */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🎨 Color Palette (4 Swatches)</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {[{hex: 'color1Hex', name: 'color1Name', label: 'Swatch 1'},{hex: 'color2Hex', name: 'color2Name', label: 'Swatch 2'},{hex: 'color3Hex', name: 'color3Name', label: 'Swatch 3'},{hex: 'color4Hex', name: 'color4Name', label: 'Swatch 4'}].map((swatch) => (
                <div key={swatch.hex} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '12px' }}>
                  <div style={{ width: '100%', height: '44px', borderRadius: '8px', background: caseData[swatch.hex], marginBottom: '10px', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px' }}>
                    <input type="color" value={caseData[swatch.hex].startsWith('#') ? caseData[swatch.hex] : '#ffffff'} onChange={(e) => setCaseData({ ...caseData, [swatch.hex]: e.target.value })} style={{ width: '28px', height: '28px', padding: '2px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'none' }} />
                    <input type="text" value={caseData[swatch.hex]} onChange={(e) => setCaseData({ ...caseData, [swatch.hex]: e.target.value })} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '5px 7px', color: '#d2ea26', fontSize: '11px', fontFamily: 'monospace' }} />
                  </div>
                  <input type="text" value={caseData[swatch.name]} onChange={(e) => setCaseData({ ...caseData, [swatch.name]: e.target.value })} placeholder="Color Name" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', padding: '5px 7px', color: '#94a3b8', fontSize: '11px' }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Typography ── */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: 700, marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🔤 Typography / Fonts</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Heading / Display Font</label>
                <input type="text" value={caseData.headingFont} onChange={(e) => setCaseData({ ...caseData, headingFont: e.target.value })} placeholder="Plus Jakarta Sans" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontWeight: 700, fontSize: '13px' }} />
                <p style={{ fontSize: '11px', color: '#475569', margin: '6px 0 0 0' }}>Used for H1, H2, Brand Titles (Weights: 700, 800)</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px' }}>
                <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Body / UI Font</label>
                <input type="text" value={caseData.bodyFont} onChange={(e) => setCaseData({ ...caseData, bodyFont: e.target.value })} placeholder="Inter / System Sans" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '9px 12px', color: '#fff', fontWeight: 600, fontSize: '13px' }} />
                <p style={{ fontSize: '11px', color: '#475569', margin: '6px 0 0 0' }}>Used for Body Text, Specs & Labels (Weights: 400, 500, 600)</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: ALL SHOWCASE IMAGES — 3 LARGE + 2 MOBILE */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 4: Showcase Images (3 Large + 2 Mobile)</h3>
            <span style={{ fontSize: '12px', background: 'rgba(210,234,38,0.15)', color: '#d2ea26', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(210,234,38,0.25)' }}>Image Gallery</span>
          </div>

          {/* ─── 3 LARGE IMAGES ─── */}
          <p style={{ fontSize: '11px', color: '#d2ea26', marginBottom: '14px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, opacity: 0.7 }}>
            🖼️ 3 Large Desktop / Full-width Images
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>

            {/* Large Image 1 — heroImg */}
            <div style={{ background: 'rgba(210,234,38,0.04)', border: '1px solid rgba(210,234,38,0.2)', borderRadius: '14px', padding: '14px' }}>
              <span style={{ fontSize: '10px', background: '#d2ea26', color: '#0f172a', padding: '3px 10px', borderRadius: '20px', fontWeight: 800, display: 'inline-block', marginBottom: '8px', letterSpacing: '0.3px' }}>
                1440 × 900 px — Hero
              </span>
              <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: 600, marginBottom: '8px', opacity: 0.85 }}>Image 1 — Hero Laptop Frame</label>
              {caseData.heroImg ? (
                <img src={formatImgUrl(caseData.heroImg)} alt="Hero" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(210,234,38,0.25)', marginBottom: '10px', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100px', background: 'rgba(210,234,38,0.06)', borderRadius: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d2ea26', fontSize: '12px', opacity: 0.5 }}>No image</div>
              )}
              <input type="text" value={caseData.heroImg} onChange={(e) => setCaseData({ ...caseData, heroImg: e.target.value })} placeholder="/assets/portfolio/image.jpg" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px 8px', color: '#94a3b8', fontSize: '11px', marginBottom: '8px' }} />
              <label style={{ background: 'rgba(210,234,38,0.15)', color: '#d2ea26', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-block', width: '100%', textAlign: 'center', border: '1px solid rgba(210,234,38,0.2)' }}>
                📤 Upload Hero Image
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'heroImg')} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Large Image 2 — showcaseImg */}
            <div style={{ background: 'rgba(210,234,38,0.04)', border: '1px solid rgba(210,234,38,0.2)', borderRadius: '14px', padding: '14px' }}>
              <span style={{ fontSize: '10px', background: '#849a00', color: '#fff', padding: '3px 10px', borderRadius: '20px', fontWeight: 800, display: 'inline-block', marginBottom: '8px', letterSpacing: '0.3px' }}>
                1440 × 900 px — Showcase
              </span>
              <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: 600, marginBottom: '8px', opacity: 0.85 }}>Image 2 — Secondary Showcase</label>
              {caseData.showcaseImg ? (
                <img src={formatImgUrl(caseData.showcaseImg)} alt="Showcase" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(210,234,38,0.25)', marginBottom: '10px', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100px', background: 'rgba(210,234,38,0.06)', borderRadius: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d2ea26', fontSize: '12px', opacity: 0.5 }}>No image</div>
              )}
              <input type="text" value={caseData.showcaseImg} onChange={(e) => setCaseData({ ...caseData, showcaseImg: e.target.value })} placeholder="/assets/portfolio/image.jpg" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px 8px', color: '#94a3b8', fontSize: '11px', marginBottom: '8px' }} />
              <label style={{ background: 'rgba(210,234,38,0.15)', color: '#d2ea26', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-block', width: '100%', textAlign: 'center', border: '1px solid rgba(210,234,38,0.2)' }}>
                📤 Upload Showcase Image
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'showcaseImg')} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Large Image 3 — bannerImg */}
            <div style={{ background: 'rgba(210,234,38,0.04)', border: '1px solid rgba(210,234,38,0.2)', borderRadius: '14px', padding: '14px' }}>
              <span style={{ fontSize: '10px', background: '#5a6800', color: '#d2ea26', padding: '3px 10px', borderRadius: '20px', fontWeight: 800, display: 'inline-block', marginBottom: '8px', letterSpacing: '0.3px', border: '1px solid rgba(210,234,38,0.3)' }}>
                1920 × 1080 px — Banner
              </span>
              <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: 600, marginBottom: '8px', opacity: 0.85 }}>Image 3 — Outcome Banner</label>
              {caseData.bannerImg ? (
                <img src={formatImgUrl(caseData.bannerImg)} alt="Banner" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(210,234,38,0.25)', marginBottom: '10px', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100px', background: 'rgba(210,234,38,0.06)', borderRadius: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d2ea26', fontSize: '12px', opacity: 0.5 }}>No image</div>
              )}
              <input type="text" value={caseData.bannerImg} onChange={(e) => setCaseData({ ...caseData, bannerImg: e.target.value })} placeholder="/assets/portfolio/image.jpg" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px 8px', color: '#94a3b8', fontSize: '11px', marginBottom: '8px' }} />
              <label style={{ background: 'rgba(210,234,38,0.15)', color: '#d2ea26', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-block', width: '100%', textAlign: 'center', border: '1px solid rgba(210,234,38,0.2)' }}>
                📤 Upload Banner Image
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'bannerImg')} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* ─── 2 MOBILE IMAGES ─── */}
          <p style={{ fontSize: '11px', color: '#d2ea26', marginBottom: '14px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, opacity: 0.7 }}>
            📱 2 Mobile Screen Mockup Images
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            {/* Mobile Image 1 */}
            <div style={{ background: 'rgba(210,234,38,0.04)', border: '1px solid rgba(210,234,38,0.2)', borderRadius: '14px', padding: '14px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              {caseData.mobileImg1 ? (
                <img src={formatImgUrl(caseData.mobileImg1)} alt="Mobile 1" style={{ width: '55px', height: '110px', objectFit: 'cover', borderRadius: '10px', border: '2px solid rgba(210,234,38,0.3)', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '55px', height: '110px', background: 'rgba(210,234,38,0.06)', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d2ea26', fontSize: '10px', textAlign: 'center', opacity: 0.5 }}>No img</div>
              )}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '10px', background: '#d2ea26', color: '#0f172a', padding: '3px 10px', borderRadius: '20px', fontWeight: 800, display: 'inline-block', marginBottom: '8px' }}>414 × 896 px</span>
                <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: 600, marginBottom: '8px', opacity: 0.85 }}>Mobile Image 1</label>
                <input type="text" value={caseData.mobileImg1} onChange={(e) => setCaseData({ ...caseData, mobileImg1: e.target.value })} placeholder="/assets/portfolio/image.jpg" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px 8px', color: '#94a3b8', fontSize: '11px', marginBottom: '8px' }} />
                <label style={{ background: 'rgba(210,234,38,0.15)', color: '#d2ea26', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-block', width: '100%', textAlign: 'center', border: '1px solid rgba(210,234,38,0.2)' }}>
                  📤 Upload Mobile 1
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'mobileImg1')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Mobile Image 2 */}
            <div style={{ background: 'rgba(210,234,38,0.04)', border: '1px solid rgba(210,234,38,0.2)', borderRadius: '14px', padding: '14px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              {caseData.mobileImg2 ? (
                <img src={formatImgUrl(caseData.mobileImg2)} alt="Mobile 2" style={{ width: '55px', height: '110px', objectFit: 'cover', borderRadius: '10px', border: '2px solid rgba(210,234,38,0.3)', flexShrink: 0 }} />
              ) : (
                <div style={{ width: '55px', height: '110px', background: 'rgba(210,234,38,0.06)', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d2ea26', fontSize: '10px', textAlign: 'center', opacity: 0.5 }}>No img</div>
              )}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '10px', background: '#d2ea26', color: '#0f172a', padding: '3px 10px', borderRadius: '20px', fontWeight: 800, display: 'inline-block', marginBottom: '8px' }}>414 × 896 px</span>
                <label style={{ display: 'block', fontSize: '12px', color: '#d2ea26', fontWeight: 600, marginBottom: '8px', opacity: 0.85 }}>Mobile Image 2</label>
                <input type="text" value={caseData.mobileImg2} onChange={(e) => setCaseData({ ...caseData, mobileImg2: e.target.value })} placeholder="/assets/portfolio/image.jpg" style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '6px 8px', color: '#94a3b8', fontSize: '11px', marginBottom: '8px' }} />
                <label style={{ background: 'rgba(210,234,38,0.15)', color: '#d2ea26', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, display: 'inline-block', width: '100%', textAlign: 'center', border: '1px solid rgba(210,234,38,0.2)' }}>
                  📤 Upload Mobile 2
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'mobileImg2')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: OUTCOME TEXT */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 5: The Outcome Summary</h3>
            <span style={{ fontSize: '12px', background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '4px 10px', borderRadius: '20px' }}>Outcome</span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Outcome Summary Paragraph (shown below the banner image)</label>
            <textarea rows="4" value={caseData.outcome} onChange={(e) => setCaseData({ ...caseData, outcome: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px', color: '#fff', resize: 'vertical', lineHeight: '1.6' }} />
          </div>
        </div>

      </form>
    </div>
  );
};

export default AdminCaseStudyEditor;
