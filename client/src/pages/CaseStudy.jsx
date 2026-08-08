import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseStudiesDataMap, caseStudiesData } from '../data/caseStudiesData';
import { usePortfolio } from '../context/PortfolioContext';
import Maintenance from './Maintenance';

const CaseStudy = () => {
  const { id: paramId } = useParams();
  const { getProjectBySlug, settings, projects: apiProjects = [] } = usePortfolio();

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
  const staticProject = caseStudiesDataMap[rawId] || null;

  const pickImg = (...imgs) => imgs.find(img => img && typeof img === 'string' && img.trim() !== '') || '';

  const heroImg = pickImg(
    dynamicProject?.caseStudy?.heroImg,
    dynamicProject?.heroImg,
    dynamicProject?.image,
    dynamicProject?.caseStudy?.showcaseImg,
    dynamicProject?.showcaseImg,
    staticProject?.heroImg
  );
  const showcaseImg = pickImg(
    dynamicProject?.caseStudy?.showcaseImg,
    dynamicProject?.showcaseImg,
    dynamicProject?.caseStudy?.heroImg,
    dynamicProject?.heroImg,
    dynamicProject?.image,
    staticProject?.showcaseImg,
    heroImg
  );
  const mobileImg1 = pickImg(
    dynamicProject?.caseStudy?.mobileImg1,
    dynamicProject?.mobileImg1,
    staticProject?.mobileImg1
  );
  const mobileImg2 = pickImg(
    dynamicProject?.caseStudy?.mobileImg2,
    dynamicProject?.mobileImg2,
    staticProject?.mobileImg2
  );
  const bannerImg = pickImg(
    dynamicProject?.caseStudy?.bannerImg,
    dynamicProject?.bannerImg,
    staticProject?.bannerImg,
    showcaseImg
  );

  const project = {
    ...staticProject,
    ...(dynamicProject || {}),
    ...(dynamicProject?.caseStudy || {}),
    title: dynamicProject?.title || staticProject?.title,
    tagline: dynamicProject?.caseStudy?.tagline || staticProject?.tagline,
    liveUrl: dynamicProject?.liveUrl || staticProject?.liveUrl,
    showCaseStudyBtn: dynamicProject?.showCaseStudyBtn !== undefined ? dynamicProject.showCaseStudyBtn : (staticProject?.showCaseStudyBtn !== undefined ? staticProject.showCaseStudyBtn : true),
    showLiveUrlBtn: dynamicProject?.showLiveUrlBtn !== undefined ? dynamicProject.showLiveUrlBtn : (staticProject?.showLiveUrlBtn !== undefined ? staticProject.showLiveUrlBtn : true),
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

  // Combine API projects and static case studies into a single list
  const combinedProjects = [];
  if (Array.isArray(apiProjects) && apiProjects.length > 0) {
    apiProjects.forEach(p => {
      combinedProjects.push({
        id: p.slug || p._id || p.id,
        title: p.title,
        showCaseStudyBtn: p.showCaseStudyBtn !== undefined ? p.showCaseStudyBtn : true
      });
    });
  }

  if (Array.isArray(caseStudiesData)) {
    caseStudiesData.forEach(staticProj => {
      const sId = (staticProj.id || staticProj.slug || '').toLowerCase();
      const exists = combinedProjects.some(p => 
        (p.id && String(p.id).toLowerCase() === sId) ||
        (p.title && p.title.toLowerCase() === (staticProj.title || '').toLowerCase())
      );
      if (!exists) {
        combinedProjects.push({
          id: staticProj.id,
          title: staticProj.title,
          showCaseStudyBtn: staticProj.showCaseStudyBtn !== undefined ? staticProj.showCaseStudyBtn : true
        });
      }
    });
  }

  // FILTER: Only include projects where showCaseStudyBtn !== false
  const enabledCaseStudyProjects = combinedProjects.filter(p => p.showCaseStudyBtn !== false);

  const currentFilteredIndex = enabledCaseStudyProjects.findIndex(p => {
    const pId = String(p.id || '').toLowerCase();
    return pId === rawId || (p.title && p.title.toLowerCase() === (project.title || '').toLowerCase());
  });

  let prevProj = null;
  let nextProj = null;

  if (enabledCaseStudyProjects.length > 1) {
    const total = enabledCaseStudyProjects.length;
    const baseIdx = currentFilteredIndex !== -1 ? currentFilteredIndex : 0;

    const prevItem = enabledCaseStudyProjects[(baseIdx - 1 + total) % total];
    const nextItem = enabledCaseStudyProjects[(baseIdx + 1) % total];

    if (prevItem && String(prevItem.id).toLowerCase() !== String(rawId).toLowerCase()) {
      prevProj = {
        id: prevItem.id,
        title: prevItem.title
      };
    }

    if (nextItem && String(nextItem.id).toLowerCase() !== String(rawId).toLowerCase()) {
      nextProj = {
        id: nextItem.id,
        title: nextItem.title
      };
    }
  }

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

          {/* 2. Top Hero Showcase Frame */}
          <div className="nexo-hero-frame">
            <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="nexo-hero-img" />
          </div>

          {/* 3. Metadata Strip with Indigo/Purple Pill Button (Left) & Meta Items (Right) */}
          <div className="nexo-meta-strip">
            <div>
              {project.showLiveUrlBtn !== false && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cs-live-btn"
                  className="nexo-indigo-btn"
                >
                  <span>Visit Website</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              )}
            </div>

            <div className="nexo-meta-group">
              <div className="nexo-meta-item">
                <span className="nexo-meta-lbl">Services</span>
                <span className="nexo-meta-txt" id="cs-services">{project.services || "Web Design"}</span>
              </div>
              <div className="nexo-meta-item">
                <span className="nexo-meta-lbl">Industry</span>
                <span className="nexo-meta-txt" id="cs-category">{project.category || "Interior Studio"}</span>
              </div>
              <div className="nexo-meta-item">
                <span className="nexo-meta-lbl">Year</span>
                <span className="nexo-meta-txt" id="cs-year">{project.year || "2026"}</span>
              </div>
            </div>
          </div>

          {/* 4. Side-by-Side Story Columns: THE BRIEF & THE APPROACH */}
          <div className="nexo-story-split">
            <div>
              <div className="nexo-column-tag">THE BRIEF</div>
              <p>
                {project.tagline || (project.description && project.description[0]) || `${project.title} approached us to redesign the way their brand presents itself online — a site that could carry the same warmth and precision as the experiences they create.`}
              </p>
              <p>
                {(project.description && project.description[1]) || "The result is a calm, image-led experience that lets each project breathe, with layouts that quietly get out of the way of the work."}
              </p>
            </div>
            <div>
              <div className="nexo-column-tag">THE APPROACH</div>
              <p>
                {(project.description && project.description[2]) || "We built the whole system around restraint: a single display type, one accent, and generous space around every photograph. Nothing competes with the work itself."}
              </p>
              <p id="cs-outcome-desc">
                {project.outcome || "From the homepage grid to individual project pages, the same rhythm of full-bleed imagery and short, considered copy carries through — on desktop and on every phone in someone's pocket."}
              </p>
            </div>
          </div>

          {/* 5. Secondary Full-Width Showcase Card */}
          {project.showcaseImg && (
            <div className="nexo-showcase-card">
              <img src={project.showcaseImg} alt="Showcase Frame" className="nexo-showcase-img" />
            </div>
          )}

          {/* 6. Mobile Experience Section ("Designed for every screen") */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <div className="nexo-mobile-section">
              <div className="nexo-mobile-header">
                <span className="nexo-mobile-tag">MOBILE EXPERIENCE</span>
                <h2 className="nexo-serif-title">Designed for every screen</h2>
              </div>

              <div className="nexo-mobile-grid">
                {project.mobileImg1 && (
                  <div className="nexo-phone-card">
                    <img src={project.mobileImg1} alt="Mobile Screen 1" className="nexo-phone-img" />
                  </div>
                )}
                {project.mobileImg2 && (
                  <div className="nexo-phone-card">
                    <img src={project.mobileImg2} alt="Mobile Screen 2" className="nexo-phone-img" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 7. Bottom Showcase Banner Image */}
          {project.bannerImg && (
            <div className="nexo-banner-block">
              <div className="nexo-banner-card">
                <img src={project.bannerImg} alt={`${project.title} Showcase Banner`} className="nexo-banner-img" />
              </div>
            </div>
          )}

          {/* 8. Bottom Navigation Pager */}
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
