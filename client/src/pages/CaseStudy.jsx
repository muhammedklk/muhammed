import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseStudiesDataMap as caseStudiesData } from '../data/caseStudiesData';
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
      <div className="premium-cs-container py-3 py-md-5">

        {/* 1. Top Navigation Bar */}
        <div className="premium-cs-top-nav">
          <Link to="/works" className="cs-back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Projects</span>
          </Link>

          <span className="service-pill" style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#0f172a', fontWeight: '700', border: '1px solid rgba(210, 234, 38, 0.4)' }}>
            {project.category} • {project.year}
          </span>
        </div>

        {/* 2. Top Header Title */}
        <div className="premium-cs-header">
          <h1 className="premium-cs-brand-title" id="cs-title">
            {project.title}
          </h1>
        </div>

        {/* 3. Main Featured Hero Mockup Screen */}
        <div className="premium-cs-hero-frame">
          <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="premium-cs-hero-img" />
        </div>

        {/* 4. Sub-Hero Intro Text & 4-Column Spec Items Bar */}
        <div className="premium-cs-specs-bar">
          <div>
            <p className="premium-cs-intro-text" id="cs-tagline">
              {project.tagline}
            </p>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="cs-live-btn"
                className="btn-primary-pill"
              >
                <span>Visit Website ↗</span>
              </a>
            )}
          </div>

          <div className="premium-cs-specs-grid">
            <div className="premium-cs-spec-item">
              <span className="premium-cs-spec-label">CLIENT</span>
              <span className="premium-cs-spec-value" id="cs-client">{project.client || 'Client Studio'}</span>
            </div>
            <div className="premium-cs-spec-item">
              <span className="premium-cs-spec-label">SERVICES</span>
              <span className="premium-cs-spec-value" id="cs-services">{project.services || 'UI/UX & Engineering'}</span>
            </div>
            <div className="premium-cs-spec-item">
              <span className="premium-cs-spec-label">CATEGORY</span>
              <span className="premium-cs-spec-value" id="cs-category">{project.category || 'Digital Experience'}</span>
            </div>
            <div className="premium-cs-spec-item">
              <span className="premium-cs-spec-label">YEAR</span>
              <span className="premium-cs-spec-value" id="cs-year">{project.year || '2026'}</span>
            </div>
          </div>
        </div>

        {/* 5. Executive Overview Narrative Block */}
        <div className="premium-cs-story-block">
          <div>
            <span className="premium-cs-section-label">OVERVIEW</span>
          </div>
          <div id="cs-description">
            {project.description.map((paragraph, index) => (
              <p key={index} className="premium-cs-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* 6. Secondary Desktop Full Showcase Image */}
        {project.bannerImg && (
          <div className="premium-cs-hero-frame">
            <img src={project.bannerImg} alt="Secondary Desktop View" className="premium-cs-hero-img" />
          </div>
        )}

        {/* 7. Mobile Experience Showcase */}
        {(project.mobileImg1 || project.mobileImg2) && (
          <div className="mb-5">
            <div className="text-center mb-4">
              <span className="premium-cs-section-label">RESPONSIVE UI</span>
              <h3 className="fw-extrabold" style={{ fontSize: '26px', letterSpacing: '-0.02em' }}>MOBILE EXPERIENCE</h3>
            </div>

            <div className="premium-cs-mobile-grid">
              {project.mobileImg1 && (
                <div className="premium-cs-mobile-card">
                  <img src={project.mobileImg1} alt="Mobile Screen 1" className="premium-cs-mobile-img" />
                </div>
              )}
              {project.mobileImg2 && (
                <div className="premium-cs-mobile-card">
                  <img src={project.mobileImg2} alt="Mobile Screen 2" className="premium-cs-mobile-img" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 8. Key Outcome Highlight Box */}
        {project.outcome && (
          <div className="premium-cs-outcome-card">
            <span className="premium-cs-section-label mb-2">KEY OUTCOME</span>
            <p id="cs-outcome-desc" style={{ fontSize: '17px', lineHeight: '1.7', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
              {project.outcome}
            </p>
          </div>
        )}

        {/* 9. Design System & Tech Architecture Cards */}
        <div className="premium-cs-system-grid">
          {/* Tech Stack */}
          <div className="premium-cs-system-card">
            <span className="premium-cs-section-label">TECH STACK</span>
            <h4 className="fw-extrabold mb-3" style={{ fontSize: '17px' }}>Technologies Used</h4>
            <div className="d-flex flex-wrap gap-2">
              {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                <span key={i} className="service-pill" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', fontWeight: '600', color: '#334155' }}>{tag.trim()}</span>
              ))}
            </div>
          </div>

          {/* Color Swatches */}
          <div className="premium-cs-system-card">
            <span className="premium-cs-section-label">COLOR PALETTE</span>
            <h4 className="fw-extrabold mb-3" style={{ fontSize: '17px' }}>Theme Swatches</h4>
            <div className="d-flex flex-wrap gap-3">
              {[
                { hex: project.color1Hex, name: project.color1Name },
                { hex: project.color2Hex, name: project.color2Name },
                { hex: project.color3Hex, name: project.color3Name },
                { hex: project.color4Hex, name: project.color4Name },
              ].filter(swatch => swatch.hex && typeof swatch.hex === 'string' && swatch.hex.trim() !== '').map((swatch, i) => (
                <div key={i} className="d-flex align-items-center gap-2">
                  <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: swatch.hex, display: 'inline-block', border: '1px solid rgba(0,0,0,0.15)' }}></span>
                  <div>
                    <span className="d-block fw-bold" style={{ fontSize: '12px' }}>{swatch.name || swatch.hex}</span>
                    <span className="d-block text-muted" style={{ fontSize: '11px' }}>{swatch.hex.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="premium-cs-system-card">
            <span className="premium-cs-section-label">TYPOGRAPHY</span>
            <h4 className="fw-extrabold mb-3" style={{ fontSize: '17px' }}>Font Hierarchy</h4>
            <div className="d-flex flex-column gap-2">
              <div>
                <span className="fw-bold d-block" style={{ fontSize: '14px' }}>{project.headingFont || 'Plus Jakarta Sans'}</span>
                <span className="text-muted" style={{ fontSize: '12px' }}>Headings & Display Titles</span>
              </div>
              <div>
                <span className="fw-bold d-block" style={{ fontSize: '14px' }}>{project.bodyFont || 'Inter / System Sans'}</span>
                <span className="text-muted" style={{ fontSize: '12px' }}>Body Text & Specifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* 10. Bottom Navigation Bar */}
        <div className="premium-cs-footer-nav">
          <Link to="/works" className="cs-back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>All Projects</span>
          </Link>

          <Link to="/contact" className="btn-primary-pill">
            <span>Start Your Project</span>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default CaseStudy;
