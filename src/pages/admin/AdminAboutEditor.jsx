import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminAboutEditor = () => {
  const [aboutData, setAboutData] = useState({
    name: 'Muhammed',
    role: 'UI/UX Designer & Front-End Developer',
    profileImg: 'assets/profile_photo.jpg',
    location: 'Kerala, India (Remote Worldwide)',
    cvUrl: 'assets/cv/Muhammed_K_Resume.pdf',
    introHeadline: 'Helping brand achieve digital mastery of creative innovation and strategic planning',
    introBio: 'Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.',
    stat1Value: '14+',
    stat1Label: 'Selected Works Completed',
    stat2Value: '4+',
    stat2Label: 'Years Design Experience',
    stat3Value: '99%',
    stat3Label: 'Sub-Second Speed Rating',
    stat4Value: '100%',
    stat4Label: 'Client Satisfaction',
    step1Title: '01. Discovery & Strategy',
    step1Desc: 'Deep dive into product requirements, user personas, and target metrics.',
    step2Title: '02. Wireframing & UX',
    step2Desc: 'Mapping out user journeys, component hierarchy, and interactive prototypes.',
    step3Title: '03. Visual UI Design',
    step3Desc: 'Crafting pixel-perfect design systems, typography scales, and dark/light modes.',
    step4Title: '04. Build & Launch',
    step4Desc: 'Developing sub-second, accessible React applications ready for production.'
  });

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await api.get('/profile');
        if (res.data) {
          setAboutData((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Error fetching About data:', err);
      }
    };

    fetchAboutData();
  }, []);

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await api.post('/upload', uploadData);
      if (res.data?.url) {
        setAboutData((prev) => ({ ...prev, [fieldName]: res.data.url }));
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
      await api.put('/profile', aboutData);
      setFeedback('About Page content saved successfully!');
      setTimeout(() => setFeedback(''), 4000);
    } catch (err) {
      setFeedback('Failed to save About page content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 4px 0', color: '#fff' }}>👤 About Page Editor</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
            Edit Profile section, stats grid, craft philosophy, and 4-step workflow process
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
          <span>{saving ? 'Saving...' : 'Save About Page'}</span>
        </button>
      </div>

      {feedback && (
        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '14px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, marginBottom: '28px' }}>
          ✓ {feedback}
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* SECTION 1: PROFILE & HERO WITH FIGMA IMAGE SPECS */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 1: Profile Photo & Key Info</h3>
            <span style={{ fontSize: '12px', background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '4px 10px', borderRadius: '20px' }}>Profile Hero</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'flex-start' }}>
            {/* Profile Photo Uploader Card */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px' }}>
              <span style={{ fontSize: '11px', background: '#eab308', color: '#000', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, display: 'inline-block', marginBottom: '8px' }}>
                📐 Figma Recommended: 500 × 500 px (1:1)
              </span>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Profile Avatar Photo</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                {aboutData.profileImg ? (
                  <img src={aboutData.profileImg} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #d2ea26' }} />
                ) : (
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>M</div>
                )}
                
                <label style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                  Upload Profile Photo
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profileImg')} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            {/* Profile Info Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Full Name</label>
                <input type="text" value={aboutData.name} onChange={(e) => setAboutData({ ...aboutData, name: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Professional Role Title</label>
                <input type="text" value={aboutData.role} onChange={(e) => setAboutData({ ...aboutData, role: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Location & Availability</label>
                <input type="text" value={aboutData.location} onChange={(e) => setAboutData({ ...aboutData, location: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: CRAFT PHILOSOPHY */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 2: Craft Intro & Philosophy</h3>
            <span style={{ fontSize: '12px', background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7', padding: '4px 10px', borderRadius: '20px' }}>Bio & Vision</span>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Intro Headline</label>
            <input type="text" value={aboutData.introHeadline} onChange={(e) => setAboutData({ ...aboutData, introHeadline: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Bio Paragraph</label>
            <textarea rows="4" value={aboutData.introBio} onChange={(e) => setAboutData({ ...aboutData, introBio: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', color: '#fff' }} />
          </div>
        </div>

        {/* SECTION 3: STATS & EXPERIENCE GRID */}
        <div style={{ background: '#12141a', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#d2ea26' }}>Section 3: Experience & Metrics Grid</h3>
            <span style={{ fontSize: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '20px' }}>4 Metric Stats</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Stat 1 Value</label>
              <input type="text" value={aboutData.stat1Value} onChange={(e) => setAboutData({ ...aboutData, stat1Value: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', marginBottom: '6px' }} />
              <input type="text" value={aboutData.stat1Label} onChange={(e) => setAboutData({ ...aboutData, stat1Label: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#94a3b8', fontSize: '12px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Stat 2 Value</label>
              <input type="text" value={aboutData.stat2Value} onChange={(e) => setAboutData({ ...aboutData, stat2Value: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', marginBottom: '6px' }} />
              <input type="text" value={aboutData.stat2Label} onChange={(e) => setAboutData({ ...aboutData, stat2Label: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#94a3b8', fontSize: '12px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Stat 3 Value</label>
              <input type="text" value={aboutData.stat3Value} onChange={(e) => setAboutData({ ...aboutData, stat3Value: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', marginBottom: '6px' }} />
              <input type="text" value={aboutData.stat3Label} onChange={(e) => setAboutData({ ...aboutData, stat3Label: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#94a3b8', fontSize: '12px' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Stat 4 Value</label>
              <input type="text" value={aboutData.stat4Value} onChange={(e) => setAboutData({ ...aboutData, stat4Value: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#fff', marginBottom: '6px' }} />
              <input type="text" value={aboutData.stat4Label} onChange={(e) => setAboutData({ ...aboutData, stat4Label: e.target.value })} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px', color: '#94a3b8', fontSize: '12px' }} />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AdminAboutEditor;
