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
      <div className="container py-3 py-md-5">
        <div className="cs-content-wrapper" style={{ maxWidth: '1000px', margin: '0 auto' }}>

          {/* Top Back Nav & Category Pill */}
          <div className="d-flex align-items-center justify-content-between w-100 mb-4 pb-2">
            <Link to="/works" className="cs-back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Back to Projects</span>
            </Link>

            <span className="service-pill mb-0" style={{ background: 'rgba(210, 234, 38, 0.15)', color: '#0f172a', fontWeight: '700', border: '1px solid rgba(210, 234, 38, 0.4)' }}>
              {project.category} • {project.year}
            </span>
          </div>

          {/* Clean Main Header Title Block */}
          <div className="text-start mb-4 mb-md-5">
            <h1 className="cs-brand-title mb-3" id="cs-title" style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: '800', letterSpacing: '-0.03em' }}>
              {project.title}
            </h1>
            <p className="cs-headline-text text-muted mb-4" id="cs-tagline" style={{ maxWidth: '800px', fontSize: '20px', lineHeight: '1.5' }}>
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
                <span>Visit Live Website</span>
              </a>
            )}
          </div>

          {/* Ultra-Clean 4-Column Metadata Specs Row */}
          <div className="row g-3 py-4 mb-4 mb-md-5" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="col-6 col-md-3">
              <span className="cs-spec-label" style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>CLIENT</span>
              <span className="cs-spec-value" id="cs-client" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{project.client || 'Client Studio'}</span>
            </div>
            <div className="col-6 col-md-3">
              <span className="cs-spec-label" style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>SERVICES</span>
              <span className="cs-spec-value" id="cs-services" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{project.services || 'UI/UX & Engineering'}</span>
            </div>
            <div className="col-6 col-md-3">
              <span className="cs-spec-label" style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>CATEGORY</span>
              <span className="cs-spec-value" id="cs-category" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{project.category || 'Digital Experience'}</span>
            </div>
            <div className="col-6 col-md-3">
              <span className="cs-spec-label" style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>YEAR</span>
              <span className="cs-spec-value" id="cs-year" style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{project.year || '2026'}</span>
            </div>
          </div>

          {/* Clean Edge Hero Showcase Mockup */}
          <div className="mb-5">
            <div className="cs-laptop-container" style={{ borderRadius: '24px', border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
              <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="w-100 d-block" style={{ maxHeight: '600px', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Story Narrative & Executive Overview */}
          <div className="mb-5">
            <h3 className="cs-section-label mb-3" style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.12em', color: '#849a00' }}>OVERVIEW</h3>
            <div className="cs-body-paragraphs mb-4" id="cs-description">
              {project.description.map((paragraph, index) => (
                <p key={index} className="cs-paragraph lead mb-3" style={{ fontSize: '17px', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Simple Left-Border Outcome Quote */}
            {project.outcome && (
              <div className="p-4 rounded-4" style={{ background: 'rgba(210, 234, 38, 0.08)', borderLeft: '4px solid #849a00', border: '1px solid rgba(0,0,0,0.06)', borderLeftWidth: '4px' }}>
                <span className="cs-sub-heading text-uppercase" style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', color: '#849a00', display: 'block', marginBottom: '6px' }}>PROJECT OUTCOME</span>
                <p className="cs-outcome-text mb-0" id="cs-outcome-desc" style={{ fontSize: '16px', lineHeight: '1.6', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {project.outcome}
                </p>
              </div>
            )}
          </div>

          {/* Design System & Tech Specs */}
          <div className="mb-5">
            <h3 className="cs-section-label mb-3" style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.12em', color: '#849a00' }}>DESIGN SYSTEM & TECH SPECS</h3>
            <div className="row g-4">
              {/* Tech Stack */}
              <div className="col-lg-4 col-md-12">
                <div className="p-4 rounded-4 h-100" style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="cs-sub-heading text-uppercase" style={{ fontSize: '11px', fontWeight: '800', color: '#849a00', display: 'block', marginBottom: '6px' }}>TECH STACK</span>
                  <h4 className="fw-extrabold mb-3" style={{ fontSize: '17px', color: '#0f172a' }}>Technologies Used</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                      <span key={i} className="service-pill" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', fontWeight: '600', color: '#334155' }}>{tag.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div className="col-lg-4 col-md-12">
                <div className="p-4 rounded-4 h-100" style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="cs-sub-heading text-uppercase" style={{ fontSize: '11px', fontWeight: '800', color: '#849a00', display: 'block', marginBottom: '6px' }}>COLOR PALETTE</span>
                  <h4 className="fw-extrabold mb-3" style={{ fontSize: '17px', color: '#0f172a' }}>Theme Swatches</h4>
                  <div className="d-flex flex-wrap gap-3">
                    {[
                      { hex: project.color1Hex, name: project.color1Name },
                      { hex: project.color2Hex, name: project.color2Name },
                      { hex: project.color3Hex, name: project.color3Name },
                      { hex: project.color4Hex, name: project.color4Name },
                    ].filter(swatch => swatch.hex && typeof swatch.hex === 'string' && swatch.hex.trim() !== '').map((swatch, i) => (
                      <div key={i} className="d-flex align-items-center gap-2">
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: swatch.hex, display: 'inline-block', border: '1px solid rgba(0,0,0,0.1)' }}></span>
                        <div>
                          <span className="d-block fw-bold" style={{ fontSize: '12px', color: '#0f172a' }}>{swatch.name || swatch.hex}</span>
                          <span className="d-block text-muted" style={{ fontSize: '11px' }}>{swatch.hex.toUpperCase()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="col-lg-4 col-md-12">
                <div className="p-4 rounded-4 h-100" style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="cs-sub-heading text-uppercase" style={{ fontSize: '11px', fontWeight: '800', color: '#849a00', display: 'block', marginBottom: '6px' }}>TYPOGRAPHY</span>
                  <h4 className="fw-extrabold mb-3" style={{ fontSize: '17px', color: '#0f172a' }}>Font Families</h4>
                  <div className="d-flex flex-column gap-2">
                    <div>
                      <span className="fw-bold d-block" style={{ fontSize: '14px', color: '#0f172a' }}>{project.headingFont || 'Plus Jakarta Sans'}</span>
                      <span className="text-muted" style={{ fontSize: '12px' }}>Headings & Titles</span>
                    </div>
                    <div>
                      <span className="fw-bold d-block" style={{ fontSize: '14px', color: '#0f172a' }}>{project.bodyFont || 'Inter / System Sans'}</span>
                      <span className="text-muted" style={{ fontSize: '12px' }}>Body & Specifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Showcase Cards */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <div className="mb-5">
              <h3 className="cs-section-label mb-3" style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.12em', color: '#849a00' }}>MOBILE EXPERIENCE</h3>
              <div className="row g-4">
                {project.mobileImg1 && (
                  <div className="col-md-6">
                    <div className="rounded-4 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                      <img src={project.mobileImg1} alt="Mobile View 1" className="w-100 d-block" style={{ maxHeight: '450px', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}
                {project.mobileImg2 && (
                  <div className="col-md-6">
                    <div className="rounded-4 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                      <img src={project.mobileImg2} alt="Mobile View 2" className="w-100 d-block" style={{ maxHeight: '450px', objectFit: 'cover' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Secondary Full Showcase Frame */}
          {project.bannerImg && (
            <div className="mb-5">
              <div className="rounded-4 overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                <img src={project.bannerImg} alt="Secondary Showcase View" className="w-100 d-block" style={{ maxHeight: '550px', objectFit: 'cover' }} />
              </div>
            </div>
          )}

          {/* Simple Bottom Navigation */}
          <div className="pt-4 border-top">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <Link to="/works" className="cs-back-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
