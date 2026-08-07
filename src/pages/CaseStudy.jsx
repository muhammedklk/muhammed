import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseStudiesDataMap as caseStudiesData } from '../data/caseStudiesData';
import { usePortfolio } from '../context/PortfolioContext';
import Maintenance from './Maintenance';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  Palette,
  Type,
  Copy,
  Check,
  Share2,
  Zap,
  TrendingUp,
  BarChart3,
  X,
  Maximize2,
  Globe,
  Building,
  Wrench,
  Calendar,
  Tag,
  CheckCircle2
} from 'lucide-react';

const CaseStudy = () => {
  const { id: paramId } = useParams();
  const { getProjectBySlug, settings, projects } = usePortfolio();

  const [copiedHex, setCopiedHex] = useState(null);
  const [sharedToast, setSharedToast] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

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
    metrics: dynamicProject?.caseStudy?.metrics?.length ? dynamicProject.caseStudy.metrics : (staticProject?.metrics || [
      { label: "Performance Rating", value: "99+" },
      { label: "User Session Time", value: "+45%" },
      { label: "Conversion Lift", value: "2.4x" },
      { label: "Avg Page Load", value: "< 0.4s" }
    ]),
    description: Array.isArray(dynamicProject?.caseStudy?.description) && dynamicProject.caseStudy.description.length
      ? dynamicProject.caseStudy.description
      : (typeof dynamicProject?.description === 'string'
        ? [dynamicProject.description]
        : (staticProject?.description || ["A modern digital solution engineered with focus on design excellence and performance."])),
    outcome: dynamicProject?.caseStudy?.outcome || staticProject?.outcome,
  };

  // Next Project Resolution
  const allProjectsList = (projects && projects.length) ? projects : Object.values(caseStudiesData);
  const currentIndex = allProjectsList.findIndex(
    p => String(p.id || p.slug || '').toLowerCase() === rawId
  );
  const nextProjectObj = project.nextId
    ? (caseStudiesData[project.nextId] || allProjectsList[(currentIndex + 1) % allProjectsList.length])
    : allProjectsList[(currentIndex + 1) % allProjectsList.length];

  const brandGlowColor = project.color1Hex || project.color2Hex || '#d2ea26';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rawId]);

  const handleCopyColor = (hex) => {
    if (!hex) return;
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleShareProject = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2200);
    }
  };

  return (
    <main className="case-study-main grid-lines-bg position-relative">
      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="nexo-lightbox-backdrop" onClick={() => setLightboxImg(null)}>
          <div className="nexo-lightbox-modal" onClick={e => e.stopPropagation()}>
            <button className="nexo-lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close Lightbox">
              <X size={20} />
            </button>
            <img src={lightboxImg} alt="Enlarged View" className="nexo-lightbox-img" />
          </div>
        </div>
      )}

      <div className="container">
        <div className="nexo-cs-container">
          
          {/* Ambient Brand Colored Glow Background */}
          <div 
            className="nexo-brand-glow" 
            style={{ '--glow-color': brandGlowColor + '25' }}
          />

          {/* Top Bar Navigation & Actions */}
          <div className="nexo-top-nav">
            <Link to="/works" className="cs-back-link">
              <ArrowLeft size={16} />
              <span>Back to Works</span>
            </Link>

            <div className="d-flex align-items-center gap-3">
              <span className="nexo-pill-tag d-none d-md-inline-block">
                {project.category} • {project.year}
              </span>
              <button onClick={handleShareProject} className="nexo-share-btn">
                {sharedToast ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
                <span>{sharedToast ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* 1. Header & Brand Title */}
          <div className="nexo-cs-header">
            <div className="d-inline-flex align-items-center gap-2 mb-3">
              <span className="nexo-pill-tag text-uppercase tracking-wider fw-bold" style={{ fontSize: '11px', borderColor: '#d2ea26', color: 'var(--text-primary)' }}>
                <Sparkles size={12} className="me-1" style={{ color: '#849a00' }} />
                Featured Case Study
              </span>
            </div>

            <h1 className="nexo-cs-top-title" id="cs-title">
              {project.title}
            </h1>

            <div className="nexo-header-badges">
              <span className="text-muted fw-semibold" style={{ fontSize: '15px' }}>
                {project.tagline}
              </span>
            </div>
          </div>

          {/* 2. MacOS Browser Frame Showcase (Clickable to Lightbox) */}
          <div className="nexo-hero-frame">
            <div className="nexo-browser-bar">
              <div className="nexo-browser-dots">
                <span className="nexo-dot nexo-dot-red"></span>
                <span className="nexo-dot nexo-dot-yellow"></span>
                <span className="nexo-dot nexo-dot-green"></span>
              </div>
              <div className="nexo-address-bar">
                <Globe size={11} />
                <span>{project.liveUrl || `https://${(project.title || 'project').toLowerCase().replace(/\s+/g, '')}.com`}</span>
              </div>
            </div>
            
            <div className="nexo-hero-img-wrapper" onClick={() => setLightboxImg(project.heroImg)}>
              <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="nexo-hero-img" />
              <div className="nexo-zoom-overlay">
                <Maximize2 size={18} />
                <span>Click to Expand Showcase</span>
              </div>
            </div>
          </div>

          {/* 3. Performance Impact & Key Metrics Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="nexo-metrics-grid">
              {project.metrics.map((metric, idx) => {
                const icons = [<Sparkles size={18} />, <TrendingUp size={18} />, <BarChart3 size={18} />, <Zap size={18} />];
                return (
                  <div key={idx} className="nexo-metric-card">
                    <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                      <span className="nexo-metric-label">{metric.label}</span>
                      <span className="nexo-meta-icon">{icons[idx % icons.length]}</span>
                    </div>
                    <span className="nexo-metric-value">{metric.value}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. Overview Split Row: Tagline + CTAs (Left) & Meta Grid (Right) */}
          <div className="nexo-overview-row">
            <div>
              <p className="nexo-tagline-text" id="cs-tagline">
                {project.tagline}
              </p>

              <div className="nexo-actions-flex">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="cs-live-btn"
                    className="nexo-btn-website"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={15} />
                  </a>
                )}

                <Link to="/contact" className="nexo-btn-secondary">
                  <span>Start Similar Project</span>
                </Link>
              </div>
            </div>

            <div className="nexo-meta-grid">
              <div className="nexo-meta-item">
                <div className="nexo-meta-header">
                  <Building size={14} className="nexo-meta-icon" />
                  <span className="nexo-meta-label">Client / Studio</span>
                </div>
                <span className="nexo-meta-value" id="cs-client">{project.client || 'Client Studio'}</span>
              </div>

              <div className="nexo-meta-item">
                <div className="nexo-meta-header">
                  <Wrench size={14} className="nexo-meta-icon" />
                  <span className="nexo-meta-label">Services</span>
                </div>
                <span className="nexo-meta-value" id="cs-services">{project.services || 'UI/UX & Web Dev'}</span>
              </div>

              <div className="nexo-meta-item">
                <div className="nexo-meta-header">
                  <Tag size={14} className="nexo-meta-icon" />
                  <span className="nexo-meta-label">Category</span>
                </div>
                <span className="nexo-meta-value" id="cs-category">{project.category || 'Digital Experience'}</span>
              </div>

              <div className="nexo-meta-item">
                <div className="nexo-meta-header">
                  <Calendar size={14} className="nexo-meta-icon" />
                  <span className="nexo-meta-label">Year</span>
                </div>
                <span className="nexo-meta-value" id="cs-year">{project.year || '2026'}</span>
              </div>
            </div>
          </div>

          {/* 5. Narrative Story Section: Left Small Label + Right Paragraphs */}
          <div className="nexo-story-section">
            <div className="nexo-section-label">
              <Layers size={14} />
              <span>01. THE OVERVIEW</span>
            </div>
            <div className="nexo-story-content" id="cs-description">
              {project.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 6. Secondary Desktop Showcase Image Frame */}
          {project.showcaseImg && (
            <div className="nexo-showcase-frame" onClick={() => setLightboxImg(project.showcaseImg)}>
              <img src={project.showcaseImg} alt="Secondary Desktop Showcase" className="nexo-showcase-img" />
              <div className="nexo-zoom-overlay">
                <Maximize2 size={18} />
                <span>Expand Fullscreen Preview</span>
              </div>
            </div>
          )}

          {/* 7. Mobile Experience Section */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <div className="mb-5">
              <div className="nexo-mobile-title-block">
                <span className="nexo-mobile-sub">02. RESPONSIVE DESIGN</span>
                <h2 className="nexo-mobile-head">MOBILE EXPERIENCE</h2>
              </div>

              <div className="nexo-mobile-grid">
                {project.mobileImg1 && (
                  <div className="nexo-mobile-card" onClick={() => setLightboxImg(project.mobileImg1)}>
                    <div className="nexo-mobile-notch"></div>
                    <img src={project.mobileImg1} alt="Mobile Showcase 1" className="nexo-mobile-img" />
                    <div className="nexo-zoom-overlay">
                      <Maximize2 size={18} />
                      <span>Expand Mobile Screen</span>
                    </div>
                  </div>
                )}
                {project.mobileImg2 && (
                  <div className="nexo-mobile-card" onClick={() => setLightboxImg(project.mobileImg2)}>
                    <div className="nexo-mobile-notch"></div>
                    <img src={project.mobileImg2} alt="Mobile Showcase 2" className="nexo-mobile-img" />
                    <div className="nexo-zoom-overlay">
                      <Maximize2 size={18} />
                      <span>Expand Mobile Screen</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 8. Design System & Tech Specs (3 Clean Interactive Cards) */}
          <div className="nexo-specs-cards-grid">
            {/* Tech Stack Card */}
            <div className="nexo-spec-card">
              <div>
                <span className="nexo-section-label d-flex align-items-center gap-1 mb-2">
                  <Layers size={13} />
                  <span>TECH STACK</span>
                </span>
                <h3 className="fw-extrabold mb-3" style={{ fontSize: '18px' }}>Technologies Used</h3>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {(project.techTags || 'Figma, React, SCSS, Motion, Vercel').split(',').map((tag, i) => (
                  <span key={i} className="nexo-pill-tag">{tag.trim()}</span>
                ))}
              </div>
            </div>

            {/* Color Theme Swatches Card (Interactive Copy) */}
            <div className="nexo-spec-card">
              <div>
                <span className="nexo-section-label d-flex align-items-center gap-1 mb-2">
                  <Palette size={13} />
                  <span>COLOR PALETTE</span>
                </span>
                <h3 className="fw-extrabold mb-3" style={{ fontSize: '18px' }}>Theme Swatches</h3>
              </div>
              <div className="nexo-swatches-flex mt-3">
                {[
                  { hex: project.color1Hex, name: project.color1Name },
                  { hex: project.color2Hex, name: project.color2Name },
                  { hex: project.color3Hex, name: project.color3Name },
                  { hex: project.color4Hex, name: project.color4Name },
                ].filter(swatch => swatch.hex && typeof swatch.hex === 'string' && swatch.hex.trim() !== '').map((swatch, i) => (
                  <div
                    key={i}
                    className="nexo-swatch-box"
                    onClick={() => handleCopyColor(swatch.hex)}
                    title="Click to Copy Hex"
                  >
                    <span className="nexo-swatch-circle" style={{ background: swatch.hex }}></span>
                    <div>
                      <span className="d-block fw-bold text-truncate" style={{ fontSize: '12px', maxWidth: '90px' }}>{swatch.name || swatch.hex}</span>
                      <span className="d-block text-muted" style={{ fontSize: '10.5px' }}>{swatch.hex.toUpperCase()}</span>
                    </div>
                    {copiedHex === swatch.hex && (
                      <span className="nexo-swatch-copy-badge">Copied!</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Card */}
            <div className="nexo-spec-card">
              <div>
                <span className="nexo-section-label d-flex align-items-center gap-1 mb-2">
                  <Type size={13} />
                  <span>TYPOGRAPHY</span>
                </span>
                <h3 className="fw-extrabold mb-3" style={{ fontSize: '18px' }}>Font Families</h3>
              </div>
              <div className="d-flex flex-column gap-2 mt-3">
                <div className="p-2 rounded" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="fw-bold d-block" style={{ fontSize: '14px' }}>{project.headingFont || 'Plus Jakarta Sans'}</span>
                  <span className="text-muted" style={{ fontSize: '11.5px' }}>Headings & Titles</span>
                </div>
                <div className="p-2 rounded" style={{ background: 'rgba(0,0,0,0.03)' }}>
                  <span className="fw-bold d-block" style={{ fontSize: '14px' }}>{project.bodyFont || 'Inter / System Sans'}</span>
                  <span className="text-muted" style={{ fontSize: '11.5px' }}>Body Text & UI Copy</span>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Project Key Outcome Section */}
          {project.outcome && (
            <div className="nexo-story-section mb-5">
              <div className="nexo-section-label">
                <CheckCircle2 size={14} />
                <span>04. KEY OUTCOME</span>
              </div>
              <div className="nexo-story-content">
                <div style={{ background: 'rgba(210, 234, 38, 0.08)', borderLeft: '4px solid #849a00', padding: '28px 32px', borderRadius: '20px' }}>
                  <p id="cs-outcome-desc" style={{ fontSize: '18px', lineHeight: '1.65', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                    "{project.outcome}"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 10. Final Full Width Desktop Showcase Banner */}
          {project.bannerImg && (
            <div className="nexo-showcase-frame" onClick={() => setLightboxImg(project.bannerImg)}>
              <img src={project.bannerImg} alt="Final Showcase Banner" className="nexo-showcase-img" />
              <div className="nexo-zoom-overlay">
                <Maximize2 size={18} />
                <span>Expand Fullscreen Banner</span>
              </div>
            </div>
          )}

          {/* 11. Next Project Binge Card */}
          {nextProjectObj && (
            <Link to={`/case-study/${nextProjectObj.slug || nextProjectObj.id}`} className="nexo-next-project-card">
              <div className="d-flex align-items-center gap-4">
                <img 
                  src={nextProjectObj.heroImg || nextProjectObj.showcaseImg || '/assets/portfolio/1-styleora.jpg'} 
                  alt={nextProjectObj.title} 
                  className="nexo-next-thumb d-none d-sm-block" 
                />
                <div>
                  <span className="nexo-section-label mb-1" style={{ fontSize: '11px' }}>NEXT CASE STUDY</span>
                  <h3 className="fw-extrabold m-0" style={{ fontSize: '24px', color: 'var(--text-primary)' }}>
                    {nextProjectObj.title}
                  </h3>
                  <span className="text-muted fw-medium" style={{ fontSize: '13.5px' }}>
                    {nextProjectObj.category}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold d-none d-md-inline" style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                  Explore Project
                </span>
                <div className="nexo-next-arrow-btn">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          )}

          {/* 12. Bottom Navigation Bar */}
          <div className="nexo-bottom-nav">
            <Link to="/works" className="cs-back-link">
              <ArrowLeft size={16} />
              <span>Back to All Projects</span>
            </Link>

            <Link to="/contact" className="nexo-btn-website">
              <span>Start Your Project</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CaseStudy;

