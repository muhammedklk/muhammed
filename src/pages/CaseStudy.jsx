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

  const heroImg = pickImg(dynamicProject?.heroImg, dynamicProject?.caseStudy?.heroImg, staticProject?.heroImg);
  const showcaseImg = pickImg(dynamicProject?.showcaseImg, dynamicProject?.caseStudy?.showcaseImg, heroImg);
  const mobileImg1 = pickImg(dynamicProject?.mobileImg1, dynamicProject?.caseStudy?.mobileImg1, staticProject?.mobileImg1);
  const mobileImg2 = pickImg(dynamicProject?.mobileImg2, dynamicProject?.caseStudy?.mobileImg2, staticProject?.mobileImg2);
  const bannerImg = pickImg(dynamicProject?.bannerImg, dynamicProject?.caseStudy?.bannerImg, showcaseImg, staticProject?.bannerImg);

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
    metrics: dynamicProject?.caseStudy?.metrics?.length ? dynamicProject.caseStudy.metrics : staticProject?.metrics,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rawId]);

  return (
    <main className="case-study-main grid-lines-bg">
      <div className="container py-2 py-md-4">
        <div className="cs-content-wrapper">

          {/* Top Navigation & Category Badge */}
          <div className="d-flex align-items-center justify-content-between w-100 gap-3 mb-3 mb-md-4">
            <Link to="/works" className="cs-back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Projects</span>
            </Link>

            <span className="minimal-badge mb-0 ms-auto d-none d-md-inline-flex" style={{ margin: '0 0 0 auto' }}>
              {project.category} • {project.year}
            </span>
          </div>

          {/* Hero Header Section */}
          <div className="cs-top-title-wrapper text-start mb-4 mb-md-5">
            <h1 className="cs-brand-title mb-2 mb-md-3" id="cs-title">
              {project.title}
            </h1>
            <p className="cs-headline-text text-muted mb-3 mb-md-4" id="cs-tagline">
              {project.tagline}
            </p>
            {project.liveUrl && (
              <div className="d-flex flex-wrap align-items-center gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cs-live-btn"
                  className="btn-primary-pill"
                >
                  <span>Visit Live Website</span>
                </a>
              </div>
            )}
          </div>

          {/* Floating Key Impact Metrics Strip */}
          <div className="row g-2 g-md-3 mb-4 mb-md-5">
            {(project.metrics || [
              { label: "Performance", value: "99+" },
              { label: "Session Time", value: "+45%" },
              { label: "Conversion Rate", value: "2.4x" },
              { label: "Speed Latency", value: "< 0.4s" }
            ]).map((metric, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="cs-system-card text-center p-3 h-100">
                  <span className="fs-3 fw-extrabold text-lime mb-1" style={{ color: '#849a00', letterSpacing: '-0.02em' }}>
                    {metric.value}
                  </span>
                  <span className="cs-spec-label mb-0">
                    {metric.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Hero Showcase Container (Laptop Glassmorphic Mockup Frame) */}
          <div className="cs-hero-frame mb-4 mb-md-5">
            <div className="cs-laptop-container">
              <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="cs-mockup-img" />
            </div>
          </div>

          {/* Project Meta Specifications Grid */}
          <div className="cs-specs-grid mb-4 mb-md-5">
            <div className="cs-spec-item">
              <span className="cs-spec-label">Client</span>
              <span className="cs-spec-value" id="cs-client">{project.client}</span>
            </div>
            <div className="cs-spec-item">
              <span className="cs-spec-label">Services</span>
              <span className="cs-spec-value" id="cs-services">{project.services}</span>
            </div>
            <div className="cs-spec-item">
              <span className="cs-spec-label">Category</span>
              <span className="cs-spec-value" id="cs-category">{project.category}</span>
            </div>
            <div className="cs-spec-item">
              <span className="cs-spec-label">Year</span>
              <span className="cs-spec-value" id="cs-year">{project.year}</span>
            </div>
          </div>

          {/* Executive Overview Section */}
          <div className="cs-story-block mb-4 mb-md-5">
            <h3 className="cs-section-label mb-2 mb-md-3">
              EXECUTIVE OVERVIEW
            </h3>
            <div className="cs-body-paragraphs mb-3 mb-md-4" id="cs-description">
              {project.description.map((paragraph, index) => (
                <p key={index} className="cs-paragraph lead mb-3">{paragraph}</p>
              ))}
            </div>

            {/* Highlights & Outcome Box */}
            <div className="cs-system-card p-3 p-md-4 rounded-4 mt-3 mt-md-4" style={{ borderLeft: '4px solid #849a00' }}>
              <span className="cs-sub-heading text-uppercase" style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', color: '#849a00' }}>PROJECT OUTCOME</span>
              <p className="cs-outcome-text mb-0 mt-2" id="cs-outcome-desc">
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Design System & Tech Specs Section */}
          <div className="cs-design-system-section mb-4 mb-md-5">
            <h3 className="cs-section-label mb-3 mb-md-4">
              DESIGN SYSTEM & TECH ARCHITECTURE
            </h3>
            <div className="row g-3 g-md-4">
              {/* Tech Stack Used */}
              <div className="col-lg-4 col-md-12">
                <div className="cs-system-card h-100">
                  <span className="cs-sub-heading text-uppercase">TECH STACK</span>
                  <h3 className="cs-system-card-title mb-3">Technologies Used</h3>
                  <div className="cs-tech-tags-flex" id="cs-tech-stack-tags">
                    {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                      <span key={i} className="cs-tech-tag">{tag.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color Palette Theme */}
              <div className="col-lg-4 col-md-12">
                <div className="cs-system-card h-100">
                  <span className="cs-sub-heading text-uppercase">COLOR THEME</span>
                  <h3 className="cs-system-card-title mb-3">Color Palette</h3>
                  <div className="cs-color-swatches-grid">
                    {[
                      { hex: project.color1Hex, name: project.color1Name },
                      { hex: project.color2Hex, name: project.color2Name },
                      { hex: project.color3Hex, name: project.color3Name },
                      { hex: project.color4Hex, name: project.color4Name },
                    ].filter(swatch => swatch.hex && typeof swatch.hex === 'string' && swatch.hex.trim() !== '').map((swatch, i) => (
                      <div key={i} className="cs-swatch-item">
                        <span className="cs-swatch-box" style={{ background: swatch.hex, border: swatch.hex === '#f8fafc' || swatch.hex === '#ffffff' ? '1px solid #cbd5e1' : 'none' }}></span>
                        <div className="cs-swatch-info">
                          <span className="cs-swatch-name">{swatch.name || swatch.hex}</span>
                          <span className="cs-swatch-hex">{swatch.hex.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography Hierarchy */}
              <div className="col-lg-4 col-md-12">
                <div className="cs-system-card h-100">
                  <span className="cs-sub-heading text-uppercase">TYPOGRAPHY</span>
                  <h3 className="cs-system-card-title mb-3">Font Hierarchy</h3>
                  <div className="cs-typo-info-list">
                    <div className="cs-typo-item">
                      <span className="cs-typo-family">{project.headingFont || 'Plus Jakarta Sans'}</span>
                      <span className="cs-typo-usage">Headings & Hero Brand Titles (Weights: 700, 800)</span>
                    </div>
                    <div className="cs-typo-item mt-2">
                      <span className="cs-typo-family">{project.bodyFont || 'Inter / System Sans'}</span>
                      <span className="cs-typo-usage">Body Text, Specs & Interface Labels (Weights: 400, 500, 600)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile & Responsive Experience Showcase */}
          <div className="cs-mobile-section mb-4 mb-md-5">
            <h3 className="cs-section-label mb-2 mb-md-3">
              MOBILE & RESPONSIVE EXPERIENCE
            </h3>

            <div className="row g-3 g-md-4 justify-content-center mt-1 mb-3 mb-md-4">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="cs-banner-frame">
                  <img
                    src={project.mobileImg1 || project.heroImg}
                    alt={`${project.title} Mobile View 1`}
                    className="cs-banner-img"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="cs-banner-frame">
                  <img
                    src={project.mobileImg2 || project.showcaseImg || project.heroImg}
                    alt={`${project.title} Mobile View 2`}
                    className="cs-banner-img"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Full Showcase Frame */}
          <div className="cs-showcase-frame mb-4 mb-md-5">
            <div className="cs-laptop-container">
              <img src={project.bannerImg || project.showcaseImg || project.heroImg} alt="Secondary Showcase View" className="cs-mockup-img" />
            </div>
          </div>

          {/* Bottom Project Navigation & CTA Bar */}
          <div className="cs-bottom-nav py-4 py-md-5">
            <div className="cs-nav-grid">
              <Link to="/works" className="cs-back-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>All Projects</span>
              </Link>

              <Link to="/contact" className="btn-primary-pill cs-cta-btn">
                <span>Start Your Project</span>
              </Link>

              <Link to={`/case-study/${project.nextId || 'voyagera'}`} className="cs-next-link" id="cs-next-link">
                <span>Next Case Study</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CaseStudy;
