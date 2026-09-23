import React, { useEffect, useState } from 'react';
import { contentApi } from '../services/api';
import { Save } from '../components/Icons';

const SeoManager = () => {
  const [seoList, setSeoList] = useState([]);
  const [selectedPage, setSelectedPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const pages = [
    { id: 'global', label: 'Global Defaults' },
    { id: 'home', label: 'Home Page' },
    { id: 'works', label: 'Projects / Works Page' },
    { id: 'casestudy', label: 'Case Study Detail Template' },
    { id: 'about', label: 'About Page' },
    { id: 'contact', label: 'Contact Page' }
  ];

  const [formData, setFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonicalUrl: '',
    jsonLdSchema: '',
    robots: 'index, follow',
    googleVerification: '',
  });

  const fetchSeo = async () => {
    try {
      const res = await contentApi.getSeo();
      if (res.data && res.data.data) {
        const list = res.data.data.seo || [];
        setSeoList(list);
        loadPageData('home', list);
      }
    } catch (err) {
      console.error('Failed to fetch SEO settings:', err);
    }
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const loadPageData = (pageKey, list = seoList) => {
    setSelectedPage(pageKey);
    const match = list.find((item) => item.page === pageKey);
    if (match) {
      setFormData({
        metaTitle: match.metaTitle || '',
        metaDescription: match.metaDescription || '',
        keywords: (match.keywords || []).join(', '),
        ogTitle: match.ogTitle || '',
        ogDescription: match.ogDescription || '',
        ogImage: match.ogImage || '',
        canonicalUrl: match.canonicalUrl || '',
        jsonLdSchema: match.jsonLdSchema || '',
        robots: match.robots || 'index, follow',
        googleVerification: match.googleVerification || '',
      });
    } else {
      setFormData({
        metaTitle: 'Senior Full Stack Software Architect | Portfolio',
        metaDescription: 'Senior Full Stack Software Architect crafting high-performance web applications and scalable platforms.',
        keywords: 'Software Architect, Full Stack Developer, React, Node.js, Express, MongoDB',
        ogTitle: '',
        ogDescription: '',
        ogImage: '/assets/favicom-img.png',
        canonicalUrl: '',
        jsonLdSchema: '',
        robots: 'index, follow',
        googleVerification: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean),
      };
      await contentApi.updateSeo(selectedPage, payload);
      alert(`SEO metadata updated for ${selectedPage.toUpperCase()} page!`);
      fetchSeo();
    } catch (err) {
      alert('Failed to update SEO metadata');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: '#0f172a', letterSpacing: '-0.02em' }}>Dynamic SEO & Meta Manager</h1>
          <p style={{ fontSize: '13.5px', color: '#475569', margin: 0, fontWeight: '500' }}>Configure per-page title tags, meta descriptions, OpenGraph cards, and JSON-LD schema.</p>
        </div>
      </div>

      {/* Page Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => loadPageData(p.id)}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '700',
              border: selectedPage === p.id ? 'none' : '1px solid #cbd5e1',
              background: selectedPage === p.id ? '#0f172a' : '#ffffff',
              color: selectedPage === p.id ? '#ffffff' : '#475569',
              cursor: 'pointer',
              boxShadow: selectedPage === p.id ? '0 4px 12px rgba(15, 23, 42, 0.15)' : 'none'
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* SEO Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 10px 25px -5px rgba(15, 23, 42, 0.02)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>
            Metadata Settings for "{pages.find((p) => p.id === selectedPage)?.label}"
          </h3>

          <div className="row g-3">
            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>META TITLE TAG</label>
              <input type="text" required value={formData.metaTitle} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>

            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>META DESCRIPTION</label>
              <textarea rows={3} required value={formData.metaDescription} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>KEYWORDS (COMMA SEPARATED)</label>
              <input type="text" value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>

            <div className="col-12 col-md-6">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>OPENGRAPH PREVIEW IMAGE URL</label>
              <input type="text" value={formData.ogImage} onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })} style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontSize: '13.5px' }} />
            </div>

            <div className="col-12">
              <label style={{ display: 'block', fontSize: '12.5px', color: '#334155', fontWeight: '700', marginBottom: '6px' }}>JSON-LD SCHEMA.ORG STRUCTURED DATA (JSON)</label>
              <textarea rows={4} value={formData.jsonLdSchema} onChange={(e) => setFormData({ ...formData, jsonLdSchema: e.target.value })} placeholder='{"@context": "https://schema.org", "@type": "Person", "name": "UI/UX Designer & Front-End Developer"}' style={{ width: '100%', padding: '10px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#0f172a', fontFamily: 'monospace', fontSize: '12.5px' }} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#0f172a', color: '#ffffff', borderRadius: '12px', fontWeight: '800', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)' }}>
          <Save size={18} />
          <span>{saving ? 'Saving SEO Metadata...' : 'Save SEO Metadata'}</span>
        </button>
      </form>
    </div>
  );
};

export default SeoManager;
