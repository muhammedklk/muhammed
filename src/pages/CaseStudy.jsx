import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseStudiesDataMap as caseStudiesData } from '../data/caseStudiesData';
import { usePortfolio } from '../context/PortfolioContext';
import Maintenance from './Maintenance';

const CaseStudy = () => {
  const { id: paramId } = useParams();
  const { getProjectBySlug, settings } = usePortfolio();

  // Public Visitors Maintenance Guard (Locks mobile phones, laptops, and all public browsers)
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
  const staticProject = caseStudiesData[rawId] || caseStudiesData.voyagera;

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
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rawId]);

  return (
    <main className="case-study-main grid-lines-bg">
      <div className="container">
        <div className="nexo-cs-container">

          {/* Top Bar: Back to All Projects Navigation */}
          <div className="d-flex align-items-center justify-content-between w-100 mb-4 pb-2">
            <Link to="/works" className="cs-back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to All Projects</span>
            </Link>

            <span className="nexo-pill-tag">
              {project.category} • {project.year}
            </span>
          </div>

          {/* 1. Centered Big Brand Title Header */}
          <h1 className="nexo-cs-top-title" id="cs-title">
            {project.title}
          </h1>

          {/* 2. Top Hero Featured Showcase Laptop Mockup Container */}
          <div className="nexo-hero-frame">
            <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="nexo-hero-img" />
          </div>

          {/* 3. Overview Split Row: Tagline + CTA (Left) & Metadata Grid (Right) */}
          <div className="nexo-overview-row">
            <div>
              <p className="nexo-tagline-text" id="cs-tagline">
                {project.tagline}
              </p>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cs-live-btn"
                  className="nexo-btn-website"
                >
                  <span>Visit Website ↗</span>
                </a>
              )}
            </div>

            <div className="nexo-meta-grid">
              <div className="nexo-meta-item">
                <span className="nexo-meta-label">Company / Client</span>
                <span className="nexo-meta-value" id="cs-client">{project.client || 'Client Studio'}</span>
              </div>
              <div className="nexo-meta-item">
                <span className="nexo-meta-label">Services</span>
                <span className="nexo-meta-value" id="cs-services">{project.services || 'UI/UX & Web Dev'}</span>
              </div>
              <div className="nexo-meta-item">
                <span className="nexo-meta-label">Category</span>
                <span className="nexo-meta-value" id="cs-category">{project.category || 'E-Commerce'}</span>
              </div>
              <div className="nexo-meta-item">
                <span className="nexo-meta-label">Year</span>
                <span className="nexo-meta-value" id="cs-year">{project.year || '2026'}</span>
              </div>
            </div>
          </div>

          {/* 4. Narrative Story Section: Left Small Label + Right Paragraphs */}
          <div className="nexo-story-section">
            <div className="nexo-section-label">
              THE OVERVIEW
            </div>
            <div className="nexo-story-content" id="cs-description">
              {project.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 5. Secondary Desktop Showcase Image Frame */}
          <div className="nexo-showcase-frame">
            <img src={project.showcaseImg || project.heroImg} alt="Secondary Desktop Showcase" className="nexo-showcase-img" />
          </div>

          {/* 6. Mobile Experience Section */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <div className="mb-5">
              <div className="nexo-mobile-title-block">
                <span className="nexo-mobile-sub">RESPONSIVE DESIGN</span>
                <h2 className="nexo-mobile-head">MOBILE EXPERIENCE</h2>
              </div>

              <div className="nexo-mobile-grid">
                {project.mobileImg1 && (
                  <div className="nexo-mobile-card">
                    <img src={project.mobileImg1} alt="Mobile Showcase 1" className="nexo-mobile-img" />
                  </div>
                )}
                {project.mobileImg2 && (
                  <div className="nexo-mobile-card">
                    <img src={project.mobileImg2} alt="Mobile Showcase 2" className="nexo-mobile-img" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 7. Design System & Tech Specs (3 Clean Cards) */}
          <div className="nexo-specs-cards-grid">
            {/* Tech Stack Card */}
            <div className="nexo-spec-card">
              <div>
                <span className="nexo-section-label d-block mb-2">TECH STACK</span>
                <h3 className="fw-extrabold mb-3" style={{ fontSize: '18px' }}>Technologies Used</h3>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                  <span key={i} className="nexo-pill-tag">{tag.trim()}</span>
                ))}
              </div>
            </div>

            {/* Color Theme Swatches Card */}
            <div className="nexo-spec-card">
              <div>
                <span className="nexo-section-label d-block mb-2">COLOR PALETTE</span>
                <h3 className="fw-extrabold mb-3" style={{ fontSize: '18px' }}>Theme Swatches</h3>
              </div>
              <div className="d-flex flex-wrap gap-3 mt-3">
                {[
                  { hex: project.color1Hex, name: project.color1Name },
                  { hex: project.color2Hex, name: project.color2Name },
                  { hex: project.color3Hex, name: project.color3Name },
                  { hex: project.color4Hex, name: project.color4Name },
                ].filter(swatch => swatch.hex && typeof swatch.hex === 'string' && swatch.hex.trim() !== '').map((swatch, i) => (
                  <div key={i} className="d-flex align-items-center gap-2">
                    <span className="nexo-swatch-circle" style={{ background: swatch.hex }}></span>
                    <div>
                      <span className="d-block fw-bold" style={{ fontSize: '12px' }}>{swatch.name || swatch.hex}</span>
                      <span className="d-block text-muted" style={{ fontSize: '11px' }}>{swatch.hex.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Card */}
            <div className="nexo-spec-card">
              <div>
                <span className="nexo-section-label d-block mb-2">TYPOGRAPHY</span>
                <h3 className="fw-extrabold mb-3" style={{ fontSize: '18px' }}>Font Families</h3>
              </div>
              <div className="d-flex flex-column gap-2 mt-3">
                <div>
                  <span className="fw-bold d-block" style={{ fontSize: '14px' }}>{project.headingFont || 'Plus Jakarta Sans'}</span>
                  <span className="text-muted" style={{ fontSize: '12px' }}>Headings & Hero Titles</span>
                </div>
                <div>
                  <span className="fw-bold d-block" style={{ fontSize: '14px' }}>{project.bodyFont || 'Inter / System Sans'}</span>
                  <span className="text-muted" style={{ fontSize: '12px' }}>Body Text & Descriptions</span>
                </div>
              </div>
            </div>
          </div>

          {/* 8. Project Key Outcome Section */}
          {project.outcome && (
            <div className="nexo-story-section mb-5">
              <div className="nexo-section-label">
                KEY OUTCOME
              </div>
              <div className="nexo-story-content">
                <div style={{ background: 'rgba(210, 234, 38, 0.08)', borderLeft: '4px solid #849a00', padding: '24px 28px', borderRadius: '16px' }}>
                  <p id="cs-outcome-desc" style={{ fontSize: '17px', lineHeight: '1.65', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                    {project.outcome}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 9. Final Full Width Desktop Showcase Banner */}
          {project.bannerImg && (
            <div className="nexo-showcase-frame">
              <img src={project.bannerImg} alt="Final Showcase Banner" className="nexo-showcase-img" />
            </div>
          )}

          {/* 10. Bottom Navigation Bar */}
          <div className="nexo-bottom-nav">
            <Link to="/works" className="cs-back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to All Projects</span>
            </Link>

            <Link to="/contact" className="nexo-btn-website">
              <span>Start Your Project</span>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CaseStudy;
