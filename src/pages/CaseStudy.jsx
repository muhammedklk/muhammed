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
  };

  // Calculate Previous and Next Project Keys for bottom pagination
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

          {/* 1. Top Centered Brand / Project Title */}
          <div className="nexo-cs-header">
            <h1 className="nexo-top-brand" id="cs-title">
              {project.title}
            </h1>
          </div>

          {/* 2. Top Hero Laptop Mockup Showcase Frame */}
          <div className="nexo-hero-frame">
            <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="nexo-hero-img" />
          </div>

          {/* 3. Overview Split Row: Tagline + Purple CTA (Left) & 4-Column Meta (Right) */}
          <div className="nexo-overview-row">
            <div>
              <p className="nexo-overview-desc" id="cs-tagline">
                {project.tagline || (project.description && project.description[0])}
              </p>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cs-live-btn"
                  className="nexo-purple-btn"
                >
                  <span>Visit Website</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>

            <div className="nexo-meta-4col">
              <div className="nexo-meta-field">
                <span className="nexo-meta-title">Company</span>
                <span className="nexo-meta-val" id="cs-client">{project.client || "NEXO's Architect"}</span>
              </div>
              <div className="nexo-meta-field">
                <span className="nexo-meta-title">Services</span>
                <span className="nexo-meta-val" id="cs-services">{project.services || "UI/UX + Frontend"}</span>
              </div>
              <div className="nexo-meta-field">
                <span className="nexo-meta-title">Place</span>
                <span className="nexo-meta-val" id="cs-category">{project.category || "------"}</span>
              </div>
              <div className="nexo-meta-field">
                <span className="nexo-meta-title">Year</span>
                <span className="nexo-meta-val" id="cs-year">{project.year || "2026"}</span>
              </div>
            </div>
          </div>

          {/* 4. Narrative Section: THE CHALLENGE */}
          <div className="nexo-story-row">
            <div className="nexo-story-tag">
              THE CHALLENGE
            </div>
            <div className="nexo-story-body" id="cs-description">
              {project.description && project.description.length > 0 ? (
                <>
                  <p>{project.description[0]}</p>
                  {project.description.length > 1 && (
                    <ul className="nexo-bullet-list">
                      {project.description.slice(1).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <p>
                    The primary challenge for the {project.title} project was designing a premium digital experience that reflects the quality and craftsmanship of modern design visuality.
                  </p>
                  <ul className="nexo-bullet-list">
                    <li>Presenting projects through a clean and immersive visual experience.</li>
                    <li>Building a clear user journey from exploration to consultation.</li>
                    <li>Creating a responsive, high-performance interface while maintaining luxury brand identity.</li>
                    <li>Balancing aesthetics, usability, and fast loading performance across all devices.</li>
                  </ul>
                  <p>
                    We focused on a minimal, project-first experience with strong visual hierarchy, intuitive navigation, and carefully crafted interactions.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 5. Secondary Desktop Showcase Image Frame */}
          <div className="nexo-showcase-frame">
            <img src={project.showcaseImg || project.heroImg} alt="Secondary Desktop Showcase" className="nexo-showcase-img" />
          </div>

          {/* 6. Mobile Experience Section */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <div className="nexo-mobile-section">
              <div className="nexo-mobile-head-block">
                <span className="nexo-mobile-subtag">RESPONSIVE DESIGN FOR</span>
                <h2 className="nexo-mobile-heading">MOBILE EXPERIENCE</h2>
              </div>

              <div className="nexo-mobile-grid">
                {project.mobileImg1 && (
                  <div className="nexo-mobile-card">
                    <img src={project.mobileImg1} alt="Mobile Experience 1" className="nexo-mobile-img" />
                  </div>
                )}
                {project.mobileImg2 && (
                  <div className="nexo-mobile-card">
                    <img src={project.mobileImg2} alt="Mobile Experience 2" className="nexo-mobile-img" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 7. Narrative Section: THE SOLUTION */}
          <div className="nexo-story-row">
            <div className="nexo-story-tag">
              THE SOLUTION
            </div>
            <div className="nexo-story-body">
              <p id="cs-outcome-desc">
                {project.outcome || `The final result was a guarantee responsive website that strongly increased the studio's online presence, showcased their portfolio with elegance, and delivered a fast, seamless user experience across all devices.`}
              </p>
            </div>
          </div>

          {/* 8. Final Full-Width Laptop Banner Frame */}
          {project.bannerImg && (
            <div className="nexo-showcase-frame">
              <img src={project.bannerImg} alt="Final Showcase Banner" className="nexo-showcase-img" />
            </div>
          )}

          {/* 9. Bottom Navigation Bar / Pager */}
          <div className="nexo-bottom-pager">
            {prevProj ? (
              <Link to={`/case-study/${prevProj.id}`} className="nexo-pager-btn">
                <span className="nexo-pager-sub">← Previous Project</span>
                <span className="nexo-pager-main">{prevProj.title}</span>
              </Link>
            ) : (
              <Link to="/works" className="nexo-pager-btn">
                <span className="nexo-pager-sub">← Back</span>
                <span className="nexo-pager-main">All Works</span>
              </Link>
            )}

            {nextProj ? (
              <Link to={`/case-study/${nextProj.id}`} className="nexo-pager-btn align-items-end text-end">
                <span className="nexo-pager-sub">Next Project →</span>
                <span className="nexo-pager-main">{nextProj.title}</span>
              </Link>
            ) : (
              <Link to="/contact" className="nexo-pager-btn align-items-end text-end">
                <span className="nexo-pager-sub">Contact →</span>
                <span className="nexo-pager-main">Let's Talk</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </main>
  );
};

export default CaseStudy;
