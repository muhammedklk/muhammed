import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Works = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await api.get('/projects');
        if (!res._fromFallback && res.data && res.data.length > 0) {
          // Real MongoDB data — map to works format
          const mapped = res.data.map((p) => ({
            id: p.slug || p._id,
            title: p.title || '',
            subtitle: p.tagline || p.category || '',
            category: (p.category || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim(),
            imgSrc: p.heroImg || '',
            liveUrl: p.liveUrl || '#',
            hideLiveLink: !p.liveUrl,
            hideCaseStudy: false,
          }));
          setWorks(mapped);
          // Cache for instant reload
          try { localStorage.setItem('public_works_cache', JSON.stringify(mapped)); } catch (_) {}
        } else if (res._fromFallback) {
          // API timed out — try localStorage cache first
          const cached = localStorage.getItem('public_works_cache');
          if (cached) {
            setWorks(JSON.parse(cached));
          }
        }
      } catch (err) {
        // Network error — use localStorage cache
        try {
          const cached = localStorage.getItem('public_works_cache');
          if (cached) setWorks(JSON.parse(cached));
        } catch (_) {}
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  const filteredWorks = works.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category.includes(selectedFilter);
  });

  return (
    <>
      {/* Hero Inner Header */}
      <section className="page-inner-hero minimal-works-hero text-center">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-md-10 col-sm-12 text-center d-flex flex-column align-items-center">
              <span className="page-badge">PORTFOLIO</span>
              <h1 className="page-title text-center">
                Selected <span className="text-highlight">Works</span>
              </h1>
              <p className="page-subtitle text-center mx-auto">
                A curated collection of digital products, web experiences, and UI systems designed and built with focus, clarity, and precision.
              </p>

              <div className="demos-badges-group my-4">
                <span className="demo-badge badge-blue">
                  <span className="badge-dot dot-blue"></span>
                  UI/UX &amp; Web Dev
                </span>
                <span className="demo-badge badge-yellow">
                  <span className="badge-dot dot-yellow"></span>
                  Sub-second Speed
                </span>
                <span className="demo-badge badge-green">
                  <span className="badge-dot dot-green"></span>
                  High Conversion
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="minimal-projects-section grid-lines-bg py-4">
        <div className="container">
          {loading ? (
            /* Skeleton loader — no old images flash */
            <div className="row g-4 works-showcase-grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="col-md-6 col-sm-12">
                  <div className="demo-card-item style-link-card">
                    <div className="demo-mockup-frame" style={{ background: '#f1f5f9', minHeight: '220px', borderRadius: '12px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: '16px', background: '#f1f5f9', borderRadius: '8px', margin: '12px 0 6px', width: '60%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: '12px', background: '#f1f5f9', borderRadius: '6px', width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredWorks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <p style={{ fontSize: '16px' }}>No projects found.</p>
            </div>
          ) : (
            <div className="row g-4 works-showcase-grid" id="works-grid">
              {filteredWorks.map((work) => (
                <div key={work.id} className="col-md-6 col-sm-12 work-grid-item" data-category={work.category}>
                  <div className="demo-card-item style-link-card">
                    <div className="demo-mockup-frame">
                      <div className="demo-img-wrapper">
                        {work.imgSrc ? (
                          <img src={work.imgSrc} alt={work.title} className="demo-mockup-img" />
                        ) : (
                          <div style={{ width: '100%', minHeight: '220px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          </div>
                        )}
                        {(!work.hideLiveLink || !work.hideCaseStudy) && (
                          <div className="minimal-hover-overlay">
                            {!work.hideLiveLink && (
                              <a href={work.liveUrl} target="_blank" rel="noopener noreferrer" className="minimal-btn-hover btn-hover-live">
                                Live Website
                              </a>
                            )}
                            {!work.hideCaseStudy && (
                              <Link to={`/case-study?id=${work.id}`} className="minimal-btn-hover btn-hover-case">
                                Case Study
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 className="demo-card-caption">{work.title}</h3>
                      <span className="demo-card-subtext">{work.subtitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Simple Minimal Centered CTA Section */}
      <section className="minimal-cta-section">
        <div className="container">
          <div className="minimal-cta-card text-center d-flex flex-column align-items-center justify-content-center">
            <span className="minimal-badge mb-2 text-center">LET'S COLLABORATE</span>
            <h2 className="minimal-cta-title mb-3 text-center">Have a project in mind?</h2>
            <p className="minimal-cta-subtitle mb-4 text-center">
              Let's build something clean, functional, and visually memorable together.
            </p>
            <div className="d-flex justify-content-center align-items-center w-100">
              <Link to="/contact" className="btn-spotlight-primary" style={{ padding: '16px 40px', fontWeight: 700, fontSize: '15px' }}>
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Works;
