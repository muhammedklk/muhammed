import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseStudiesDataMap, caseStudiesData } from '../data/caseStudiesData';
import { usePortfolio } from '../context/PortfolioContext';
import Maintenance from './Maintenance';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Share2,
  Check,
  Copy,
  Sparkles,
  Monitor,
  Smartphone,
  Palette,
  Type,
  Layers,
  Zap,
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle2
} from 'lucide-react';

const CaseStudy = () => {
  const { id: paramId } = useParams();
  const { getProjectBySlug, settings, projects } = usePortfolio();

  const [copiedHex, setCopiedHex] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

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
    title: dynamicProject?.title || staticProject?.title || 'Case Study',
    tagline: dynamicProject?.caseStudy?.tagline || staticProject?.tagline || 'World Expeditions & Luxury Havens Platform',
    liveUrl: dynamicProject?.liveUrl || staticProject?.liveUrl,
    category: dynamicProject?.category || staticProject?.category || 'Web Application',
    services: dynamicProject?.services || staticProject?.services || 'UI/UX & Full Stack Development',
    client: dynamicProject?.client || staticProject?.client || 'Client Studio',
    year: dynamicProject?.year || staticProject?.year || '2026',
    heroImg,
    showcaseImg,
    mobileImg1,
    mobileImg2,
    bannerImg,
    techTags: dynamicProject?.caseStudy?.techTags || staticProject?.techTags || 'React, SCSS, Motion, Node.js, Vercel',
    color1Hex: dynamicProject?.caseStudy?.color1Hex || staticProject?.color1Hex || '#d2ea26',
    color1Name: dynamicProject?.caseStudy?.color1Name || staticProject?.color1Name || 'Accent Lime',
    color2Hex: dynamicProject?.caseStudy?.color2Hex || staticProject?.color2Hex || '#849a00',
    color2Name: dynamicProject?.caseStudy?.color2Name || staticProject?.color2Name || 'Dark Lime',
    color3Hex: dynamicProject?.caseStudy?.color3Hex || staticProject?.color3Hex || '#0f172a',
    color3Name: dynamicProject?.caseStudy?.color3Name || staticProject?.color3Name || 'Dark Surface',
    color4Hex: dynamicProject?.caseStudy?.color4Hex || staticProject?.color4Hex || '#f8fafc',
    color4Name: dynamicProject?.caseStudy?.color4Name || staticProject?.color4Name || 'Light Background',
    headingFont: dynamicProject?.caseStudy?.headingFont || staticProject?.headingFont || 'Plus Jakarta Sans',
    bodyFont: dynamicProject?.caseStudy?.bodyFont || staticProject?.bodyFont || 'Inter / System Sans',
    metrics: dynamicProject?.caseStudy?.metrics || staticProject?.metrics || [
      { label: "PageSpeed Score", value: "99+" },
      { label: "Session Time", value: "+45%" },
      { label: "Direct Bookings", value: "2.4x" },
      { label: "Load Speed", value: "< 0.4s" }
    ],
    description: dynamicProject?.caseStudy?.description?.length
      ? dynamicProject.caseStudy.description
      : (dynamicProject?.description
          ? (Array.isArray(dynamicProject.description) ? dynamicProject.description : [dynamicProject.description])
          : (staticProject?.description || [])),
    outcome: dynamicProject?.caseStudy?.outcome || staticProject?.outcome || 'Delivered an exceptional digital experience with high performance and seamless conversion.',
  };

  // Next project calculation
  const allProjectsList = (projects && projects.length > 0) ? projects : caseStudiesData;
  const currentIdx = allProjectsList.findIndex(p => {
    const pid = String(p.id || p.slug || p._id || '').toLowerCase();
    return pid === rawId || pid.includes(rawId) || rawId.includes(pid);
  });

  let nextProject = null;
  if (currentIdx !== -1 && allProjectsList.length > 1) {
    nextProject = allProjectsList[(currentIdx + 1) % allProjectsList.length];
  } else if (project.nextId && caseStudiesDataMap[project.nextId]) {
    nextProject = caseStudiesDataMap[project.nextId];
  } else {
    nextProject = caseStudiesData[0];
  }

  const nextSlug = nextProject?.slug || nextProject?.id || 'voyagera';
  const nextTitle = nextProject?.title || 'Next Project';
  const nextCategory = nextProject?.category || 'Case Study';
  const nextImg = pickImg(nextProject?.heroImg, nextProject?.caseStudy?.heroImg, nextProject?.image, '/assets/portfolio/gyogrea.png');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rawId]);

  const handleCopyColor = (hex) => {
    if (!hex) return;
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const techList = typeof project.techTags === 'string'
    ? project.techTags.split(',').map(t => t.trim()).filter(Boolean)
    : (Array.isArray(project.techTags) ? project.techTags : ['React', 'SCSS', 'GSAP', 'Figma', 'Vercel']);

  const swatches = [
    { hex: project.color1Hex, name: project.color1Name },
    { hex: project.color2Hex, name: project.color2Name },
    { hex: project.color3Hex, name: project.color3Name },
    { hex: project.color4Hex, name: project.color4Name },
  ].filter(s => s.hex && typeof s.hex === 'string' && s.hex.trim() !== '');

  const metricIcons = [Zap, TrendingUp, ShieldCheck, Clock];

  return (
    <main className="case-study-main cs-redesign-wrapper grid-lines-bg">
      <div className="container">
        <div className="cs-redesign-container">

          {/* Top Bar: Floating Navigation & Actions */}
          <div className="cs-top-nav-bar">
            <Link to="/works" className="cs-back-link-btn">
              <ArrowLeft size={18} />
              <span>Back to All Works</span>
            </Link>

            <div className="cs-top-nav-center">
              <span className="cs-pill-badge">
                <Sparkles size={13} className="cs-sparkle-glow" />
                {project.category} • {project.year}
              </span>
            </div>

            <div className="cs-top-nav-right">
              <button 
                onClick={handleShare} 
                className="cs-icon-btn" 
                title="Share Project URL"
                aria-label="Share Project URL"
              >
                {copiedUrl ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
              </button>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-btn-visit-site"
                >
                  <span>Visit Website</span>
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          {/* 1. Hero Header Title & Subtitle */}
          <header className="cs-hero-header">
            <h1 className="cs-hero-title-text" id="cs-title">
              {project.title}
            </h1>
            <p className="cs-hero-tagline-text" id="cs-tagline">
              {project.tagline}
            </p>
          </header>

          {/* 2. Desktop Browser Frame Mockup Showcase */}
          <div className="cs-browser-frame">
            <div className="cs-browser-header-bar">
              <div className="cs-browser-dots">
                <span className="cs-dot dot-red"></span>
                <span className="cs-dot dot-yellow"></span>
                <span className="cs-dot dot-green"></span>
              </div>
              <div className="cs-browser-address-bar">
                <span className="cs-lock-icon">🔒</span>
                <span className="cs-address-text">
                  https://{project.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                </span>
              </div>
              <div className="cs-browser-action-icon">
                <Monitor size={16} />
              </div>
            </div>

            <div className="cs-browser-content">
              <img
                src={project.heroImg}
                alt={project.title}
                id="cs-hero-img"
                className="cs-hero-img-full"
              />
            </div>
          </div>

          {/* 3. High Impact Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="cs-metrics-strip">
              {project.metrics.map((metric, index) => {
                const IconComponent = metricIcons[index % metricIcons.length];
                return (
                  <div key={index} className="cs-metric-card">
                    <div className="cs-metric-icon-box">
                      <IconComponent size={20} />
                    </div>
                    <div className="cs-metric-info">
                      <span className="cs-metric-val">{metric.value}</span>
                      <span className="cs-metric-lbl">{metric.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. Overview Split Section: Project Story + Metadata Cards */}
          <div className="cs-overview-split-grid">
            <div className="cs-story-card">
              <div className="cs-section-header-tag">
                <Layers size={14} />
                <span>PROJECT OVERVIEW</span>
              </div>
              <h2 className="cs-story-heading">Architecting digital excellence for {project.client}</h2>
              <div className="cs-narrative-paragraphs" id="cs-description">
                {project.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {project.liveUrl && (
                <div className="mt-4 pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-btn-visit-site cs-btn-large"
                  >
                    <span>Launch Live Application</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>

            <div className="cs-metadata-column">
              <div className="cs-meta-card">
                <span className="cs-meta-lbl">Client / Company</span>
                <span className="cs-meta-val" id="cs-client">{project.client}</span>
              </div>

              <div className="cs-meta-card">
                <span className="cs-meta-lbl">Services & Role</span>
                <span className="cs-meta-val" id="cs-services">{project.services}</span>
              </div>

              <div className="cs-meta-card">
                <span className="cs-meta-lbl">Industry Category</span>
                <span className="cs-meta-val" id="cs-category">{project.category}</span>
              </div>

              <div className="cs-meta-card">
                <span className="cs-meta-lbl">Release Year</span>
                <span className="cs-meta-val" id="cs-year">{project.year}</span>
              </div>

              <div className="cs-meta-card cs-meta-card-highlight">
                <span className="cs-meta-lbl">Project Status</span>
                <span className="cs-meta-val text-lime">
                  <span className="cs-live-pulse-dot"></span> Live in Production
                </span>
              </div>
            </div>
          </div>

          {/* 5. Secondary Desktop Showcase Image Frame */}
          {project.showcaseImg && (
            <div className="cs-showcase-frame mb-5">
              <div className="cs-frame-label-bar">
                <Monitor size={15} />
                <span>DESKTOP INTERFACE DISPLAY</span>
              </div>
              <img
                src={project.showcaseImg}
                alt="Desktop Interface Display"
                className="cs-showcase-img"
              />
            </div>
          )}

          {/* 6. Mobile Experience Section with Smartphone Device Frames */}
          {(project.mobileImg1 || project.mobileImg2) && (
            <section className="cs-mobile-section">
              <div className="cs-mobile-header-block">
                <span className="cs-sub-tag">
                  <Smartphone size={14} />
                  RESPONSIVE ENGINEERING
                </span>
                <h2 className="cs-mobile-main-title">Mobile Experience</h2>
                <p className="cs-mobile-subtitle">Pixel-perfect layout and touch ergonomics crafted for all modern iOS & Android screen dimensions.</p>
              </div>

              <div className="cs-smartphone-grid">
                {project.mobileImg1 && (
                  <div className="cs-smartphone-mockup">
                    <div className="cs-phone-camera-notch"></div>
                    <div className="cs-phone-screen">
                      <img src={project.mobileImg1} alt="Mobile Screen Showcase 1" />
                    </div>
                  </div>
                )}

                {project.mobileImg2 && (
                  <div className="cs-smartphone-mockup">
                    <div className="cs-phone-camera-notch"></div>
                    <div className="cs-phone-screen">
                      <img src={project.mobileImg2} alt="Mobile Screen Showcase 2" />
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 7. Design System & Technical Specifications Grid */}
          <section className="cs-specs-section">
            <div className="cs-section-header-tag mb-4">
              <Sparkles size={14} />
              <span>DESIGN SYSTEM & TECH SPECS</span>
            </div>

            <div className="cs-specs-cards-grid">
              {/* Tech Stack Card */}
              <div className="cs-spec-card">
                <div className="cs-spec-card-head">
                  <Layers size={18} className="cs-spec-icon" />
                  <h3 className="cs-spec-title">Tech Stack</h3>
                </div>
                <p className="cs-spec-desc">Modern libraries and tools used to build high-performance user interfaces.</p>
                <div className="cs-tech-pills-wrap">
                  {techList.map((tag, i) => (
                    <span key={i} className="cs-tech-pill">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Color Swatches Card */}
              <div className="cs-spec-card">
                <div className="cs-spec-card-head">
                  <Palette size={18} className="cs-spec-icon" />
                  <h3 className="cs-spec-title">Color Palette</h3>
                </div>
                <p className="cs-spec-desc">Curated color palette defining brand identity. Click swatch to copy Hex code.</p>
                <div className="cs-swatches-grid">
                  {swatches.map((swatch, i) => (
                    <div
                      key={i}
                      className="cs-swatch-item"
                      onClick={() => handleCopyColor(swatch.hex)}
                      title={`Click to copy ${swatch.hex}`}
                    >
                      <span
                        className="cs-swatch-circle"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {copiedHex === swatch.hex && (
                          <span className="cs-swatch-check">
                            <Check size={14} color={swatch.hex === '#ffffff' || swatch.hex === '#f8fafc' ? '#000' : '#fff'} />
                          </span>
                        )}
                      </span>
                      <div className="cs-swatch-info">
                        <span className="cs-swatch-name">{swatch.name || swatch.hex}</span>
                        <span className="cs-swatch-hex">{swatch.hex.toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography Card */}
              <div className="cs-spec-card">
                <div className="cs-spec-card-head">
                  <Type size={18} className="cs-spec-icon" />
                  <h3 className="cs-spec-title">Typography System</h3>
                </div>
                <p className="cs-spec-desc">Hierarchy of Google fonts selected for extreme legibility and aesthetic balance.</p>
                <div className="cs-typo-list">
                  <div className="cs-typo-item">
                    <span className="cs-typo-family">{project.headingFont}</span>
                    <span className="cs-typo-role">Headings & Titles</span>
                    <div className="cs-typo-preview heading-preview">Aa Bb Cc 123</div>
                  </div>
                  <div className="cs-typo-item">
                    <span className="cs-typo-family">{project.bodyFont}</span>
                    <span className="cs-typo-role">Body & Metadata</span>
                    <div className="cs-typo-preview body-preview">The quick brown fox jumps...</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Project Key Outcome Section */}
          {project.outcome && (
            <div className="cs-outcome-card">
              <div className="cs-outcome-badge">
                <CheckCircle2 size={20} />
                <span>KEY OUTCOME & IMPACT</span>
              </div>
              <p id="cs-outcome-desc" className="cs-outcome-text">
                "{project.outcome}"
              </p>
            </div>
          )}

          {/* 9. Final Full-Width Banner Image */}
          {project.bannerImg && (
            <div className="cs-banner-frame">
              <img src={project.bannerImg} alt="Final Showcase Banner" className="cs-banner-img" />
            </div>
          )}

          {/* 10. Next Project Navigation Card */}
          {nextProject && (
            <div className="cs-next-project-banner">
              <div className="cs-next-content">
                <span className="cs-next-subtitle">UP NEXT</span>
                <h3 className="cs-next-title">{nextTitle}</h3>
                <span className="cs-next-cat">{nextCategory}</span>
                <div className="mt-3">
                  <Link to={`/case-study/${nextSlug}`} className="cs-next-btn">
                    <span>View Next Case Study</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {nextImg && (
                <div className="cs-next-thumb-wrapper">
                  <Link to={`/case-study/${nextSlug}`}>
                    <img src={nextImg} alt={nextTitle} className="cs-next-thumb-img" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* 11. Bottom Nav Links */}
          <div className="cs-bottom-nav">
            <Link to="/works" className="cs-back-link-btn">
              <ArrowLeft size={18} />
              <span>Back to All Works</span>
            </Link>

            <Link to="/contact" className="cs-btn-visit-site">
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
