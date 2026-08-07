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
        <div className="prem-cs-wrapper">

          {/* Top Bar Nav */}
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

          {/* Bold Clean Top Hero Title */}
          <h1 className="prem-cs-hero-title" id="cs-title">
            {project.title}
          </h1>

          {/* Main Desktop Hero Showcase Mockup */}
          <div className="prem-cs-hero-frame">
            <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="prem-cs-hero-img" />
          </div>

          {/* Minimal 4-Item Horizontal Metadata Bar */}
          <div className="prem-cs-meta-bar">
            <div className="prem-cs-meta-item">
              <span className="prem-cs-meta-lbl">COMPANY / CLIENT</span>
              <span className="prem-cs-meta-val" id="cs-client">{project.client || 'Client Studio'}</span>
            </div>
            <div className="prem-cs-meta-item">
              <span className="prem-cs-meta-lbl">SERVICES</span>
              <span className="prem-cs-meta-val" id="cs-services">{project.services || 'UI/UX + Frontend'}</span>
            </div>
            <div className="prem-cs-meta-item">
              <span className="prem-cs-meta-lbl">CATEGORY</span>
              <span className="prem-cs-meta-val" id="cs-category">{project.category || 'Digital Platform'}</span>
            </div>
            <div className="prem-cs-meta-item">
              <span className="prem-cs-meta-lbl">YEAR</span>
              <span className="prem-cs-meta-val" id="cs-year">{project.year || '2026'}</span>
            </div>
          </div>

          {/* Split Intro: Tagline & Live Button (Left) vs Project Overview Narrative (Right) */}
          <div className="prem-cs-intro-grid">
            {/* Left Box */}
            <div>
              <p className="prem-cs-tagline-text" id="cs-tagline">
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

            {/* Right Box */}
            <div>
              <span className="prem-cs-sublabel">PROJECT OVERVIEW</span>
              <div id="cs-description">
                {project.description.map((paragraph, index) => (
                  <p key={index} className="prem-cs-body-text">
                    {paragraph}
                  </p>
                ))}
              </div>

              {project.outcome && (
                <div className="prem-cs-quote-box">
                  <span className="prem-cs-quote-title">KEY OUTCOME</span>
                  <p className="prem-cs-quote-content" id="cs-outcome-desc">
                    {project.outcome}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Full Desktop Showcase Banner Image */}
          {project.showcaseImg && (
            <div className="prem-cs-showcase-img">
              <img src={project.showcaseImg} alt={`${project.title} Full Showcase`} className="w-100 d-block" style={{ maxHeight: '600px', objectFit: 'cover' }} />
            </div>
          )}

          {/* Minimal Mobile Experience Section */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <div className="mb-5">
              <div className="prem-cs-section-header">
                <span className="prem-cs-sublabel">MINIMAL & HIGH-PERFORMING</span>
                <h2 className="prem-cs-sectitle">MOBILE EXPERIENCE</h2>
              </div>

              <div className="prem-cs-mobile-grid">
                {project.mobileImg1 && (
                  <div className="prem-cs-mobile-frame">
                    <img src={project.mobileImg1} alt="Mobile View 1" className="prem-cs-mobile-img" />
                  </div>
                )}
                {project.mobileImg2 && (
                  <div className="prem-cs-mobile-frame">
                    <img src={project.mobileImg2} alt="Mobile View 2" className="prem-cs-mobile-img" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tech Stack & Design System Pills */}
          <div className="p-4 rounded-4 mb-5" style={{ background: '#f8fafc', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="row g-4">
              {/* Tech Stack */}
              <div className="col-md-6">
                <span className="prem-cs-sublabel">TECH STACK</span>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                    <span key={i} className="service-pill" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', fontWeight: '600', color: '#334155' }}>{tag.trim()}</span>
                  ))}
                </div>
              </div>

              {/* Color Palette Theme */}
              <div className="col-md-6">
                <span className="prem-cs-sublabel">COLOR PALETTE</span>
                <div className="d-flex flex-wrap gap-3 mt-2">
                  {[
                    { hex: project.color1Hex, name: project.color1Name },
                    { hex: project.color2Hex, name: project.color2Name },
                    { hex: project.color3Hex, name: project.color3Name },
                    { hex: project.color4Hex, name: project.color4Name },
                  ].filter(swatch => swatch.hex && typeof swatch.hex === 'string' && swatch.hex.trim() !== '').map((swatch, i) => (
                    <div key={i} className="d-flex align-items-center gap-2">
                      <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: swatch.hex, display: 'inline-block', border: '1px solid rgba(0,0,0,0.15)' }}></span>
                      <div>
                        <span className="d-block fw-bold" style={{ fontSize: '11.5px', color: '#0f172a' }}>{swatch.name || swatch.hex}</span>
                        <span className="d-block text-muted" style={{ fontSize: '10.5px' }}>{swatch.hex.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Banner Showcase */}
          {project.bannerImg && (
            <div className="prem-cs-showcase-img">
              <img src={project.bannerImg} alt="Secondary Desktop View" className="w-100 d-block" style={{ maxHeight: '600px', objectFit: 'cover' }} />
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
