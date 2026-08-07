import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseStudiesDataMap } from '../data/caseStudiesData';
import { usePortfolio } from '../context/PortfolioContext';
import Maintenance from './Maintenance';

const CaseStudy = () => {
  const { id: paramId } = useParams();
  const { getProjectBySlug, settings } = usePortfolio();

  // Public Visitors Maintenance Guard
  const localSettingsStr = typeof window !== 'undefined' ? localStorage.getItem('portfolio_maintenance_settings') : null;
  let localSettings = null;
  try { localSettings = localSettingsStr ? JSON.parse(localSettingsStr) : null; } catch (e) {}

  const activeSettings = {
    ...localSettings,
    ...settings,
    maintenancePages: {
      ...(localSettings?.maintenancePages || {}),
      ...(settings?.maintenancePages || {})
    }
  };

  const isGlobalMaintenance = Boolean(activeSettings?.maintenanceMode);
  const isCaseStudyMaintenance = Boolean(
    activeSettings?.maintenancePages?.caseStudy ||
    activeSettings?.maintenancePages?.casestudy ||
    activeSettings?.maintenancePages?.['case-study'] ||
    activeSettings?.maintenancePages?.casestudies
  );

  const isAdminPreview = typeof window !== 'undefined' && (
    sessionStorage.getItem('admin_preview_active') === 'true' ||
    window.location.search.includes('preview=admin')
  );

  if (!isAdminPreview && (isGlobalMaintenance || isCaseStudyMaintenance)) {
    return (
      <Maintenance
        isGlobal={isGlobalMaintenance}
        pageName="Case Study Page"
        message={activeSettings?.maintenanceMessage}
      />
    );
  }

  const rawId = paramId ? paramId.toLowerCase() : "voyagera";
  const dynamicProject = getProjectBySlug(rawId);
  const staticProject = caseStudiesDataMap[rawId] || caseStudiesDataMap.voyagera;

  const pickImg = (...imgs) => imgs.find(img => img && typeof img === 'string' && img.trim() !== '') || '';

  const heroImg = pickImg(dynamicProject?.caseStudy?.heroImg, dynamicProject?.caseStudy?.showcaseImg, staticProject?.heroImg, dynamicProject?.heroImg);
  const showcaseImg = pickImg(dynamicProject?.caseStudy?.showcaseImg, dynamicProject?.caseStudy?.heroImg, staticProject?.showcaseImg, heroImg);
  const mobileImg1 = pickImg(dynamicProject?.caseStudy?.mobileImg1, staticProject?.mobileImg1, dynamicProject?.mobileImg1);
  const mobileImg2 = pickImg(dynamicProject?.caseStudy?.mobileImg2, staticProject?.mobileImg2, dynamicProject?.mobileImg2);
  const bannerImg = pickImg(dynamicProject?.caseStudy?.bannerImg, staticProject?.bannerImg, showcaseImg);

  const project = {
    ...staticProject,
    ...(dynamicProject || {}),
    ...(dynamicProject?.caseStudy || {}),
    title: dynamicProject?.title || staticProject?.title,
    tagline: dynamicProject?.caseStudy?.tagline || staticProject?.tagline,
    liveUrl: dynamicProject?.liveUrl || staticProject?.liveUrl,
    category: dynamicProject?.category || staticProject?.category,
    services: dynamicProject?.services || staticProject?.services,
    client: dynamicProject?.client || staticProject?.client,
    year: dynamicProject?.year || staticProject?.year,
    heroImg,
    showcaseImg,
    mobileImg1,
    mobileImg2,
    bannerImg,
    description: dynamicProject?.caseStudy?.description?.length ? dynamicProject.caseStudy.description : (dynamicProject?.description ? [dynamicProject.description] : staticProject?.description),
    outcome: dynamicProject?.caseStudy?.outcome || staticProject?.outcome,
    metrics: (dynamicProject?.caseStudy?.metrics?.length ? dynamicProject.caseStudy.metrics : staticProject?.metrics) || [],
  };

  // Previous & Next Project Calculation
  const caseKeys = Object.keys(caseStudiesDataMap);
  const currentIndex = caseKeys.indexOf(rawId);
  const nextKey = currentIndex !== -1 && currentIndex < caseKeys.length - 1 ? caseKeys[currentIndex + 1] : caseKeys[0];
  const prevKey = currentIndex > 0 ? caseKeys[currentIndex - 1] : caseKeys[caseKeys.length - 1];

  const nextProj = caseStudiesDataMap[nextKey];
  const prevProj = caseStudiesDataMap[prevKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rawId]);

  return (
    <main className="case-study-main grid-lines-bg">
      <div className="container">
        <div className="nexo-cs-container">

          {/* 1. Top Breadcrumb & Category Bar */}
          <div className="cs-top-bar">
            <Link to="/works" className="cs-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Works</span>
            </Link>

            <span className="nexo-pill-tag">
              {project.category} • {project.year}
            </span>
          </div>

          {/* 2. Hero Header: Clean Title & Tagline */}
          <header className="cs-hero-header">
            <h1 className="cs-main-title" id="cs-title">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="cs-main-tagline" id="cs-tagline">
                {project.tagline}
              </p>
            )}
          </header>

          {/* 3. Hairline Meta Strip (Client, Services, Year, Live Site Button) */}
          <div className="cs-meta-strip">
            <div className="cs-meta-col">
              <span className="cs-meta-label">Client / Company</span>
              <span className="cs-meta-value" id="cs-client">{project.client || 'Client Studio'}</span>
            </div>
            <div className="cs-meta-col">
              <span className="cs-meta-label">Services Provided</span>
              <span className="cs-meta-value" id="cs-services">{project.services || 'UI/UX & Web Dev'}</span>
            </div>
            <div className="cs-meta-col">
              <span className="cs-meta-label">Category / Year</span>
              <span className="cs-meta-value" id="cs-category">{project.category} ({project.year})</span>
            </div>
            <div className="cs-meta-col justify-content-end">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cs-live-btn"
                  className="cs-btn-live"
                >
                  <span>Visit Live Site ↗</span>
                </a>
              ) : (
                <span className="cs-meta-value text-muted">Internal Concept</span>
              )}
            </div>
          </div>

          {/* 4. Minimal Hero Showcase Frame */}
          <div className="nexo-hero-frame">
            <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="nexo-hero-img" />
          </div>

          {/* 5. Stat Metrics Row (If Metrics Exist) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="cs-metrics-grid">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="cs-metric-item">
                  <div className="cs-metric-num">{metric.value}</div>
                  <div className="cs-metric-label">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* 6. Section 01 / OVERVIEW */}
          <div className="cs-section-row">
            <div className="cs-section-tag">
              01 / OVERVIEW
            </div>
            <div className="cs-section-body" id="cs-description">
              {project.description && project.description.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "cs-lead-p" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* 7. Section 02 / DESIGN SYSTEM & SPECS */}
          <div className="cs-section-row">
            <div className="cs-section-tag">
              02 / SPECS & TECH
            </div>
            <div className="cs-section-body">
              <div className="nexo-specs-cards-grid">
                {/* Tech Stack */}
                <div className="nexo-spec-card">
                  <div>
                    <span className="cs-meta-label d-block mb-2">TECH STACK</span>
                    <h3 className="fw-extrabold mb-3" style={{ fontSize: '17px', color: 'var(--text-primary)' }}>Tools & Frameworks</h3>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                      <span key={i} className="nexo-pill-tag">{tag.trim()}</span>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div className="nexo-spec-card">
                  <div>
                    <span className="cs-meta-label d-block mb-2">COLOR PALETTE</span>
                    <h3 className="fw-extrabold mb-3" style={{ fontSize: '17px', color: 'var(--text-primary)' }}>Theme Colors</h3>
                  </div>
                  <div className="d-flex flex-column gap-2 mt-2">
                    {[
                      { hex: project.color1Hex, name: project.color1Name },
                      { hex: project.color2Hex, name: project.color2Name },
                      { hex: project.color3Hex, name: project.color3Name },
                      { hex: project.color4Hex, name: project.color4Name },
                    ].filter(swatch => swatch.hex && typeof swatch.hex === 'string' && swatch.hex.trim() !== '').slice(0, 3).map((swatch, i) => (
                      <div key={i} className="d-flex align-items-center gap-2">
                        <span className="nexo-swatch-circle" style={{ background: swatch.hex }}></span>
                        <div>
                          <span className="d-block fw-bold" style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{swatch.name || swatch.hex}</span>
                          <span className="d-block text-muted" style={{ fontSize: '11px' }}>{swatch.hex.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div className="nexo-spec-card">
                  <div>
                    <span className="cs-meta-label d-block mb-2">TYPOGRAPHY</span>
                    <h3 className="fw-extrabold mb-3" style={{ fontSize: '17px', color: 'var(--text-primary)' }}>Font Families</h3>
                  </div>
                  <div className="d-flex flex-column gap-2 mt-2">
                    <div>
                      <span className="fw-bold d-block" style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>{project.headingFont || 'Plus Jakarta Sans'}</span>
                      <span className="text-muted" style={{ fontSize: '11.5px' }}>Headings & Titles</span>
                    </div>
                    <div>
                      <span className="fw-bold d-block" style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>{project.bodyFont || 'Inter / System Sans'}</span>
                      <span className="text-muted" style={{ fontSize: '11.5px' }}>Body & Descriptions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Section 03 / VISUAL SHOWCASE */}
          <div className="cs-section-row">
            <div className="cs-section-tag">
              03 / VISUAL SHOWCASE
            </div>
            <div className="cs-section-body">
              {/* Secondary Desktop Showcase */}
              {project.showcaseImg && (
                <div className="nexo-showcase-frame mb-4">
                  <img src={project.showcaseImg} alt="Desktop Showcase" className="nexo-showcase-img" />
                </div>
              )}

              {/* Mobile Showcase Grid */}
              {(project.mobileImg1 || project.mobileImg2) && (
                <div className="nexo-mobile-grid">
                  {project.mobileImg1 && (
                    <div className="nexo-mobile-card">
                      <img src={project.mobileImg1} alt="Mobile View 1" className="nexo-mobile-img" />
                    </div>
                  )}
                  {project.mobileImg2 && (
                    <div className="nexo-mobile-card">
                      <img src={project.mobileImg2} alt="Mobile View 2" className="nexo-mobile-img" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 9. Section 04 / KEY OUTCOME */}
          {project.outcome && (
            <div className="cs-section-row">
              <div className="cs-section-tag">
                04 / IMPACT & RESULTS
              </div>
              <div className="cs-section-body">
                <div className="cs-outcome-box">
                  <p className="cs-outcome-text" id="cs-outcome-desc">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 10. Final Showcase Banner Frame if Available */}
          {project.bannerImg && project.bannerImg !== project.showcaseImg && project.bannerImg !== project.heroImg && (
            <div className="nexo-showcase-frame">
              <img src={project.bannerImg} alt="Final Showcase Banner" className="nexo-showcase-img" />
            </div>
          )}

          {/* 11. Previous & Next Project Navigation */}
          <div className="cs-pager-bar">
            {prevProj ? (
              <Link to={`/case-study/${prevProj.id}`} className="cs-pager-link">
                <span className="cs-pager-label">← Previous Project</span>
                <span className="cs-pager-title">{prevProj.title}</span>
              </Link>
            ) : <div />}

            {nextProj ? (
              <Link to={`/case-study/${nextProj.id}`} className="cs-pager-link align-items-end text-end">
                <span className="cs-pager-label">Next Project →</span>
                <span className="cs-pager-title">{nextProj.title}</span>
              </Link>
            ) : <div />}
          </div>

          {/* 12. Bottom CTA Banner */}
          <div className="cs-cta-banner">
            <h3 className="cs-cta-title">Have a project in mind?</h3>
            <p className="cs-cta-sub">Let's collaborate to build memorable digital products and intuitive user experiences.</p>
            <Link to="/contact" className="cs-btn-live">
              <span>Start A Project ↗</span>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CaseStudy;
