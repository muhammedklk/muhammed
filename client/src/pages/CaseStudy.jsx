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
      <div className="container py-2 py-md-4">
        <div className="nexo-cs-container">

          {/* Top Bar Navigation */}
          <div className="nexo-cs-top-bar">
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

          {/* 1. Giant Centered Brand Title */}
          <h1 className="nexo-cs-brand-title" id="cs-title">
            {project.title}
          </h1>

          {/* 2. Massive First Hero Image Card */}
          <div className="nexo-cs-image-card">
            <img src={project.heroImg} alt={project.title} id="cs-hero-img" />
          </div>

          {/* 3. Info Row (Left: Tagline + Visit Website Button, Right: 4 Metadata Columns) */}
          <div className="nexo-cs-info-row">
            <div>
              <p className="nexo-cs-tagline" id="cs-tagline">
                {project.tagline}
              </p>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cs-live-btn"
                  className="nexo-cs-visit-btn"
                >
                  <span>Visit Website</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              )}
            </div>

            <div className="nexo-cs-meta-grid">
              <div className="nexo-cs-meta-item">
                <label>Company</label>
                <span id="cs-client">{project.client || 'Studio'}</span>
              </div>
              <div className="nexo-cs-meta-item">
                <label>Services</label>
                <span id="cs-services">{project.services || 'UI/UX'}</span>
              </div>
              <div className="nexo-cs-meta-item">
                <label>Client</label>
                <span>——</span>
              </div>
              <div className="nexo-cs-meta-item">
                <label>Year</label>
                <span id="cs-year">{project.year || '2026'}</span>
              </div>
            </div>
          </div>

          {/* 4. Story Narrative Section (Left: Label, Right: Spacious Paragraphs) */}
          <div className="nexo-cs-section-row" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="nexo-cs-label">
              <span>THE CHALLENGE</span>
            </div>
            <div className="nexo-cs-body-text" id="cs-description">
              {project.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 5. Second Massive Showcase Laptop Image Card */}
          <div className="nexo-cs-image-card">
            <img src={project.showcaseImg || project.heroImg} alt={`${project.title} Showcase`} />
          </div>

          {/* 6. Centered Mobile Experience Section */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <div className="nexo-cs-mobile-section">
              <span className="nexo-cs-sub-label">HANDHELD DESIGN EXPERIENCE</span>
              <h2 className="nexo-cs-main-heading">MOBILE EXPERIENCE</h2>

              <div className="nexo-cs-mobile-grid">
                {project.mobileImg1 && (
                  <div className="nexo-cs-mobile-card">
                    <img src={project.mobileImg1} alt={`${project.title} Mobile Screen 1`} />
                  </div>
                )}
                {project.mobileImg2 && (
                  <div className="nexo-cs-mobile-card">
                    <img src={project.mobileImg2} alt={`${project.title} Mobile Screen 2`} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 7. Final Outcome Section (Left: Label, Right: Outcome Text) */}
          {project.outcome && (
            <div className="nexo-cs-section-row" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="nexo-cs-label">
                <span>FINAL OUTCOME</span>
              </div>
              <div className="nexo-cs-body-text" id="cs-outcome-desc">
                <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{project.outcome}</p>
              </div>
            </div>
          )}

          {/* 8. Third Massive Showcase Laptop Image Card */}
          {project.bannerImg && (
            <div className="nexo-cs-image-card">
              <img src={project.bannerImg} alt={`${project.title} Full View`} />
            </div>
          )}

          {/* 9. Bottom Footer Navigation */}
          <div className="pt-4 mt-5 border-top d-flex align-items-center justify-content-between flex-wrap gap-3">
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
