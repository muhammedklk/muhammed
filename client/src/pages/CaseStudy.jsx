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
      <div className="container py-4 py-md-5">
        <div className="new-cs-wrapper">

          {/* Top Bar: Back to Projects Link & Category Badge */}
          <div className="d-flex align-items-center justify-content-between w-100 mb-4">
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

          {/* New Clean Header Title & Subtitle */}
          <div className="new-cs-header">
            <h1 className="new-cs-title" id="cs-title">
              {project.title}
            </h1>
            <p className="new-cs-tagline" id="cs-tagline">
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
                <span>Visit Live Website ↗</span>
              </a>
            )}
          </div>

          {/* 4-Column Minimal Metadata Strip */}
          <div className="new-cs-meta-strip">
            <div>
              <span className="new-cs-meta-label">CLIENT</span>
              <span className="new-cs-meta-value" id="cs-client">{project.client || 'Client Studio'}</span>
            </div>
            <div>
              <span className="new-cs-meta-label">SERVICES</span>
              <span className="new-cs-meta-value" id="cs-services">{project.services || 'UI/UX & Engineering'}</span>
            </div>
            <div>
              <span className="new-cs-meta-label">CATEGORY</span>
              <span className="new-cs-meta-value" id="cs-category">{project.category || 'Digital Experience'}</span>
            </div>
            <div>
              <span className="new-cs-meta-label">YEAR</span>
              <span className="new-cs-meta-value" id="cs-year">{project.year || '2026'}</span>
            </div>
          </div>

          {/* Clean Main Desktop Mockup Image Container */}
          <div className="new-cs-hero-container">
            <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="new-cs-hero-img" />
          </div>

          {/* 2-Column Split: Story Overview (Left) & Design Specs (Right) */}
          <div className="row g-4 mb-5">
            {/* Left Column: Narrative Overview & Outcome */}
            <div className="col-lg-7 col-md-12">
              <div className="new-cs-story-card h-100">
                <span className="cs-section-label" style={{ color: '#849a00', fontSize: '11px', fontWeight: '800', letterSpacing: '0.12em', display: 'block', marginBottom: '12px' }}>PROJECT OVERVIEW</span>
                <div id="cs-description">
                  {project.description.map((paragraph, index) => (
                    <p key={index} style={{ fontSize: '16.5px', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {project.outcome && (
                  <div className="new-cs-outcome-box">
                    <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', color: '#849a00', display: 'block', marginBottom: '6px' }}>KEY OUTCOME</span>
                    <p id="cs-outcome-desc" style={{ fontSize: '15.5px', lineHeight: '1.6', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                      {project.outcome}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Design System & Tech Stack */}
            <div className="col-lg-5 col-md-12">
              <div className="d-flex flex-column gap-3 h-100">
                {/* Tech Stack Box */}
                <div className="new-cs-story-card">
                  <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', color: '#849a00', display: 'block', marginBottom: '8px' }}>TECH STACK</span>
                  <h4 className="fw-extrabold mb-3" style={{ fontSize: '16px' }}>Technologies Used</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                      <span key={i} className="service-pill" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', fontWeight: '600', color: '#334155' }}>{tag.trim()}</span>
                    ))}
                  </div>
                </div>

                {/* Color Palette Box */}
                <div className="new-cs-story-card">
                  <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', color: '#849a00', display: 'block', marginBottom: '8px' }}>COLOR PALETTE</span>
                  <h4 className="fw-extrabold mb-3" style={{ fontSize: '16px' }}>Color Swatches</h4>
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

                {/* Typography Box */}
                <div className="new-cs-story-card">
                  <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', color: '#849a00', display: 'block', marginBottom: '8px' }}>TYPOGRAPHY</span>
                  <div className="d-flex flex-column gap-2">
                    <div>
                      <span className="fw-bold d-block" style={{ fontSize: '13.5px' }}>{project.headingFont || 'Plus Jakarta Sans'}</span>
                      <span className="text-muted" style={{ fontSize: '11.5px' }}>Headings & Display Titles</span>
                    </div>
                    <div>
                      <span className="fw-bold d-block" style={{ fontSize: '13.5px' }}>{project.bodyFont || 'Inter / System Sans'}</span>
                      <span className="text-muted" style={{ fontSize: '11.5px' }}>Body Text & Specifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Showcase Cards */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <div className="mb-5">
              <span className="cs-section-label" style={{ color: '#849a00', fontSize: '11px', fontWeight: '800', letterSpacing: '0.12em', display: 'block', marginBottom: '16px' }}>MOBILE SHOWCASE</span>
              <div className="row g-4">
                {project.mobileImg1 && (
                  <div className="col-md-6">
                    <div className="new-cs-hero-container mb-0">
                      <img src={project.mobileImg1} alt="Mobile View 1" className="w-100 d-block" style={{ maxHeight: '480px', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}
                {project.mobileImg2 && (
                  <div className="col-md-6">
                    <div className="new-cs-hero-container mb-0">
                      <img src={project.mobileImg2} alt="Mobile View 2" className="w-100 d-block" style={{ maxHeight: '480px', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Secondary Full Showcase Frame */}
          {project.bannerImg && (
            <div className="mb-5">
              <div className="new-cs-hero-container mb-0">
                <img src={project.bannerImg} alt="Secondary Showcase View" className="w-100 d-block" style={{ maxHeight: '580px', objectFit: 'cover' }} />
              </div>
            </div>
          )}

          {/* Bottom Footer Navigation Bar */}
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
      </div>
    </main>
  );
};

export default CaseStudy;
