import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const SelectedWorks = () => {
  // Start with empty array — no hardcoded defaults, no stale images flash
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        if (!res._fromFallback && res.data && res.data.length > 0) {
          // Real MongoDB data — map and take first 4
          const mapped = res.data.slice(0, 4).map((p) => ({
            id: p.slug || p._id,
            title: p.title || '',
            subtitle: p.tagline || p.category || '',
            imgSrc: p.heroImg || '',
            liveUrl: p.liveUrl || '#',
            hideLiveLink: !p.liveUrl,
            hideCaseStudy: false,
          }));
          setProjects(mapped);
          // Cache for next load (but NOT as initial state — always fresh from API)
          try { localStorage.setItem('public_home_works_cache', JSON.stringify(mapped)); } catch (_) {}
        } else if (res._fromFallback) {
          // API timed out — use localStorage cache (not hardcoded defaults)
          try {
            const cached = localStorage.getItem('public_home_works_cache');
            if (cached) setProjects(JSON.parse(cached));
          } catch (_) {}
        }
      } catch (err) {
        // Network error — use localStorage cache
        try {
          const cached = localStorage.getItem('public_home_works_cache');
          if (cached) setProjects(JSON.parse(cached));
        } catch (_) {}
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="demos-section grid-lines-bg" id="selected-work">
      <div className="container">
        {/* Section Header */}
        <div className="demos-header text-center">
          <div className="outlined-stat-num">14+</div>
          <h2 className="demos-main-title">Selected Works</h2>
          <div className="demos-badges-group">
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

        {/* Selected Works Dynamic Grid (2x2 Grid) */}
        <div className="row g-4 demos-grid-row">
          {loading ? (
            /* Skeleton — no old images flash while waiting for API */
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="col-md-6 col-sm-12">
                <div className="demo-card-item style-link-card">
                  <div
                    className="demo-mockup-frame"
                    style={{
                      background: '#f1f5f9',
                      minHeight: '220px',
                      borderRadius: '12px',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                  <div style={{ height: '18px', background: '#f1f5f9', borderRadius: '8px', margin: '14px 0 8px', width: '55%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '13px', background: '#f1f5f9', borderRadius: '6px', width: '38%', animation: 'pulse 1.5s ease-in-out infinite' }} />
                </div>
              </div>
            ))
          ) : projects.length === 0 ? (
            <div className="col-12" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <p>Projects coming soon.</p>
            </div>
          ) : (
            projects.map((work) => (
              <div key={work.id} className="col-md-6 col-sm-12">
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
                    </div>
                  </div>
                  <Link to={`/case-study?id=${work.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="demo-card-caption">{work.title}</h3>
                    <span className="demo-card-subtext">{work.subtitle}</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All Works CTA Button */}
        <div className="d-flex justify-content-center align-items-center text-center mt-5 w-100">
          <Link to="/works" className="btn-discover-outline" style={{ padding: '14px 36px', fontWeight: 700 }}>
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
