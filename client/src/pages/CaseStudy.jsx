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
      <div className="cs-v2-container py-4 py-md-5">

        {/* 1. Top Bar: Back to Projects Link & Category Badge */}
        <div className="cs-v2-top-bar">
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

        {/* 2. Giant Brand Title (Centered) */}
        <h1 className="cs-v2-main-title" id="cs-title">
          {project.title}
        </h1>

        {/* 3. Hero Showcase Card (Large Rounded Full-Bleed Mockup Frame) */}
        <div className="cs-v2-hero-card">
          <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="cs-v2-hero-img" />
        </div>

        {/* 4. Sleek Tagline & 4-Column Metadata Grid (Directly Under Hero) */}
        <div className="cs-v2-header-info">
          <div>
            <p className="cs-v2-tagline" id="cs-tagline">
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

          <div className="cs-v2-specs-grid">
            <div>
              <span className="cs-v2-spec-label">CLIENT</span>
              <span className="cs-v2-spec-val" id="cs-client">{project.client || 'Client Studio'}</span>
            </div>
            <div>
              <span className="cs-v2-spec-label">SERVICES</span>
              <span className="cs-v2-spec-val" id="cs-services">{project.services || 'UI/UX & Engineering'}</span>
            </div>
            <div>
              <span className="cs-v2-spec-label">CATEGORY</span>
              <span className="cs-v2-spec-val" id="cs-category">{project.category || 'Digital Experience'}</span>
            </div>
            <div>
              <span className="cs-v2-spec-label">YEAR</span>
              <span className="cs-v2-spec-val" id="cs-year">{project.year || '2026'}</span>
            </div>
          </div>
        </div>

        {/* 5. Executive Overview Narrative Section */}
        <div className="cs-v2-narrative-section">
          <div>
            <span className="cs-v2-section-tag">OVERVIEW</span>
          </div>

          <div className="cs-v2-body-text" id="cs-description">
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {project.outcome && (
              <div className="cs-v2-outcome-banner">
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.12em', color: '#849a00', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>KEY OUTCOME</span>
                <p id="cs-outcome-desc" style={{ fontSize: '16px', lineHeight: '1.6', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                  {project.outcome}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 6. Secondary Desktop Showcase Screen */}
        {project.bannerImg && (
          <div className="cs-v2-hero-card mb-5">
            <img src={project.bannerImg} alt="Secondary Desktop View" className="cs-v2-hero-img" />
          </div>
        )}

        {/* 7. Mobile Experience Showcase (2 Devices Side-by-Side) */}
        {(project.mobileImg1 || project.mobileImg2) && (
          <div className="cs-v2-mobile-section">
            <span className="cs-v2-section-tag" style={{ letterSpacing: '0.15em' }}>IMMERSIVE EXPERIENCE</span>
            <h3 className="fw-extrabold mt-2 mb-0" style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.02em' }}>MOBILE EXPERIENCE</h3>

            <div className="cs-v2-mobile-grid">
              {project.mobileImg1 && (
                <div className="cs-v2-mobile-card">
                  <img src={project.mobileImg1} alt="Mobile Screen 1" className="cs-v2-mobile-img" />
                </div>
              )}
              {project.mobileImg2 && (
                <div className="cs-v2-mobile-card">
                  <img src={project.mobileImg2} alt="Mobile Screen 2" className="cs-v2-mobile-img" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 8. Design System & Technical Specs */}
        <div className="cs-v2-card-grid">
          {/* Tech Stack */}
          <div className="cs-v2-system-card">
            <span className="cs-v2-section-tag d-block mb-2">TECH STACK</span>
            <h4 className="fw-extrabold mb-0" style={{ fontSize: '17px' }}>Technologies Used</h4>
            <div className="cs-v2-tech-pills">
              {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                <span key={i} className="cs-v2-tech-pill">{tag.trim()}</span>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="cs-v2-system-card">
            <span className="cs-v2-section-tag d-block mb-2">COLOR PALETTE</span>
            <h4 className="fw-extrabold mb-0" style={{ fontSize: '17px' }}>Color Swatches</h4>
            <div className="cs-v2-swatches-grid">
              {[
                { hex: project.color1Hex, name: project.color1Name },
                { hex: project.color2Hex, name: project.color2Name },
                { hex: project.color3Hex, name: project.color3Name },
                { hex: project.color4Hex, name: project.color4Name },
              ].filter(swatch => swatch.hex && typeof swatch.hex === 'string' && swatch.hex.trim() !== '').map((swatch, i) => (
                <div key={i} className="cs-v2-swatch-item">
                  <span className="cs-v2-swatch-circle" style={{ background: swatch.hex }}></span>
                  <div className="cs-v2-swatch-info">
                    <span className="cs-v2-swatch-name">{swatch.name || swatch.hex}</span>
                    <span className="cs-v2-swatch-hex">{swatch.hex.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="cs-v2-system-card">
            <span className="cs-v2-section-tag d-block mb-2">TYPOGRAPHY</span>
            <h4 className="fw-extrabold mb-0" style={{ fontSize: '17px' }}>Font Hierarchy</h4>
            <div className="cs-v2-typo-block">
              <div>
                <span className="cs-v2-typo-name">{project.headingFont || 'Plus Jakarta Sans'}</span>
                <span className="cs-v2-typo-usage">Headings & Titles</span>
              </div>
              <div>
                <span className="cs-v2-typo-name">{project.bodyFont || 'Inter / Outfit'}</span>
                <span className="cs-v2-typo-usage">Body Text & Specifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* 9. Bottom Navigation Bar */}
        <div className="pt-4 mt-5 border-top">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
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

      </div>
    </main>
  );
};

export default CaseStudy;
