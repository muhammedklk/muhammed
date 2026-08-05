import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const initialProjectsData = {
  voyagera: {
    title: "Voyagera",
    tagline: "World Expeditions & Luxury Havens Travel Platform",
    liveUrl: "https://voyageratravel.vercel.app/",
    category: "Travel & Hospitality",
    services: "UI/UX & Web Development",
    client: "Voyagera Group",
    year: "2026",
    heroImg: "assets/portfolio/gyogrea.png",
    showcaseImg: "assets/portfolio/gyogrea.png",
    mobileImg1: "assets/portfolio/3-greentrack.jpg",
    mobileImg2: "assets/portfolio/2-elve.jpg",
    bannerImg: "assets/portfolio/gyogrea.png",
    nextId: "styleora",
    description: [
      "Voyagera is a next-generation luxury travel expedition platform engineered to connect discerning global explorers with handpicked luxury retreats and sacred sanctuaries around the globe.",
      "Built with a strong focus on immersive visual storytelling, fluid interactive destination filtering, and frictionless reservation workflows, the application balances rich photography with crisp typography and modern component architecture.",
      "Every breakpoint and asset pipeline was tuned to ensure sub-second rendering, micro-animations, and fluid touch interactions across all mobile and desktop browsers."
    ],
    outcome: "Delivered a 99+ PageSpeed performance rating with 45% increase in user session duration and seamless booking conversion across mobile and desktop."
  },
  styleora: {
    title: "Styleora",
    tagline: "Modern Luxury E-Commerce & Retail Flagship",
    liveUrl: "https://styleorashop.vercel.app/",
    category: "E-Commerce & Fashion",
    services: "UI/UX & Frontend Development",
    client: "Styleora Studio",
    year: "2026",
    heroImg: "assets/portfolio/1-styleora.jpg",
    showcaseImg: "assets/portfolio/gyogrea.png",
    mobileImg1: "assets/portfolio/1-styleora.jpg",
    mobileImg2: "assets/portfolio/2-elve.jpg",
    bannerImg: "assets/portfolio/1-styleora.jpg",
    nextId: "elve",
    description: [
      "Styleora is an ultra-minimalist e-commerce digital flagship tailored for luxury apparel, haute couture, and premium fashion accessories.",
      "The system highlights an intuitive product gallery grid, instant multi-attribute filter drawers, seamless dark and light mode aesthetics, and an optimized single-step cart checkout experience designed for maximum conversion.",
      "Leveraging high-performance CSS grid architecture, hardware-accelerated transitions, and accessible UI patterns, Styleora delivers an unmatched digital retail journey."
    ],
    outcome: "Engineered a high-conversion digital boutique layout with refined typography, responsive product drawers, and ultra-fast page transitions."
  },
  elve: {
    title: "Elve",
    tagline: "Next-Gen Vehicle & Asset Rental Platform",
    liveUrl: "https://elve.vercel.app/",
    category: "Rental & Mobility",
    services: "UI/UX Design & Development",
    client: "Elve Mobility",
    year: "2025",
    heroImg: "assets/portfolio/2-elve.jpg",
    showcaseImg: "assets/portfolio/2-elve.jpg",
    mobileImg1: "assets/portfolio/2-elve.jpg",
    mobileImg2: "assets/portfolio/1-styleora.jpg",
    bannerImg: "assets/portfolio/2-elve.jpg",
    nextId: "greentrack",
    description: [
      "Elve is a sleek mobility rental platform engineered for effortless online fleet discovery, real-time availability checks, and instant vehicle reservations.",
      "Featuring interactive specification cards, custom date selection calendars, and category filtering, Elve simplifies complex rental logistics into an intuitive user journey.",
      "Crafted with a sleek dark-mode design system, high-contrast typography, and sub-second component states for maximum user delight."
    ],
    outcome: "Simplified multi-step reservation flows into a frictionless single-page booking experience with instant visual feedback."
  },
  greentrack: {
    title: "Green Track",
    tagline: "Eco-Tracking & Sustainability Analytics Dashboard",
    liveUrl: "https://greentrack-ten.vercel.app/",
    category: "SaaS & Analytics",
    services: "UI/UX Design & Development",
    client: "GreenTrack Eco",
    year: "2025",
    heroImg: "assets/portfolio/3-greentrack.jpg",
    showcaseImg: "assets/portfolio/3-greentrack.jpg",
    mobileImg1: "assets/portfolio/3-greentrack.jpg",
    mobileImg2: "assets/portfolio/gyogrea.png",
    bannerImg: "assets/portfolio/3-greentrack.jpg",
    nextId: "travelgallery",
    description: [
      "Green Track is an advanced environmental analytics dashboard created to help enterprises and individuals track carbon footprints and sustainability metrics in real time.",
      "Through visual chart widgets, color-coded status badges, and interactive progress timelines, complex environmental datasets are converted into clear, actionable insights.",
      "Designed with accessibility standards, dark UI hierarchy, and responsive grid flex layout across all device viewports."
    ],
    outcome: "Transformed complex sustainability metrics into clean, beautiful dashboard visualizations for quick decision-making."
  }
};

const CaseStudy = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || 'voyagera';
  const [project, setProject] = useState(initialProjectsData[id] || initialProjectsData['voyagera']);

  useEffect(() => {
    document.body.classList.add('case-study-page');

    const fetchLiveProject = async () => {
      try {
        const res = await api.get('/projects');
        if (res.data && res.data.length > 0) {
          const found = res.data.find((p) => p.slug === id || p._id === id);
          if (found) {
            // Merge with localStorage image store for reliability
            let imgOverride = {};
            try {
              const imgStore = JSON.parse(localStorage.getItem('project_images_store') || '{}');
              imgOverride = imgStore[found._id] || {};
            } catch (_) {}

            setProject({
              title: found.title || 'Project Case Study',
              tagline: found.tagline || 'UI/UX Design & Web Development',
              liveUrl: found.liveUrl || 'https://voyageratravel.vercel.app/',
              category: found.category || 'UI/UX Frontend',
              services: found.services || 'UI/UX & Web Development',
              client: found.client || 'Client Studio',
              year: found.year || '2026',
              heroImg: imgOverride.heroImg || found.heroImg || 'assets/portfolio/gyogrea.png',
              showcaseImg: imgOverride.showcaseImg || found.showcaseImg || found.heroImg || 'assets/portfolio/gyogrea.png',
              mobileImg1: imgOverride.mobileImg1 || found.mobileImg1 || 'assets/portfolio/3-greentrack.jpg',
              mobileImg2: imgOverride.mobileImg2 || found.mobileImg2 || 'assets/portfolio/2-elve.jpg',
              bannerImg: imgOverride.bannerImg || found.bannerImg || found.heroImg || 'assets/portfolio/gyogrea.png',
              nextId: 'styleora',
              description: found.description && found.description.length > 0 ? found.description : [found.tagline],
              outcome: found.outcome || 'Delivered a high-conversion digital experience.',
              techTags: found.techTags || 'Figma, HTML5/SCSS, JavaScript, GSAP, Vercel',
              color1Hex: found.color1Hex || '#d2ea26',
              color1Name: found.color1Name || 'Accent Lime',
              color2Hex: found.color2Hex || '#849a00',
              color2Name: found.color2Name || 'Dark Lime Accent',
              color3Hex: found.color3Hex || '#0f172a',
              color3Name: found.color3Name || 'Dark Surface',
              color4Hex: found.color4Hex || '#f8fafc',
              color4Name: found.color4Name || 'Light Background',
              headingFont: found.headingFont || 'Plus Jakarta Sans',
              bodyFont: found.bodyFont || 'Inter / System Sans',
            });
          }
        }
      } catch (err) {
        console.error('Error fetching live case study:', err);
      }
    };

    fetchLiveProject();

    return () => {
      document.body.classList.remove('case-study-page');
    };
  }, [id]);


  return (
    <main className="case-study-main grid-lines-bg">
      <div className="container">
        <div className="cs-content-wrapper">

          {/* Top Brand / Project Title */}
          <div className="cs-top-title-wrapper text-start mb-4">
            <h1 className="cs-brand-title" id="cs-title">
              {project.title}
            </h1>
          </div>

          {/* Hero Showcase Container (Laptop Screen Frame) */}
          <div className="cs-hero-frame mb-5">
            <div className="cs-mockup-wrapper">
              <div className="cs-laptop-container">
                <img src={project.heroImg} alt={project.title} id="cs-hero-img" className="cs-mockup-img" />
              </div>
            </div>
          </div>

          {/* Project Overview & Meta Specifications Section */}
          <div className="cs-meta-section mb-5">
            <div className="row align-items-start g-4">
              
              {/* Left Column: Headline & Live CTA Button */}
              <div className="col-lg-5 col-md-12">
                <div className="cs-left-sticky">
                  <h2 className="cs-headline-text" id="cs-tagline">
                    {project.tagline}
                  </h2>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="cs-live-btn"
                      className="btn-purple-glow mt-3"
                    >
                      <span>Visit website</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Meta Specs Bar & Overview Paragraphs */}
              <div className="col-lg-7 col-md-12">
                {/* Meta Stats Grid */}
                <div className="cs-specs-grid mb-4">
                  <div className="cs-spec-item">
                    <span className="cs-spec-label">Category</span>
                    <span className="cs-spec-value" id="cs-category">
                      {project.category}
                    </span>
                  </div>
                  <div className="cs-spec-item">
                    <span className="cs-spec-label">Services</span>
                    <span className="cs-spec-value" id="cs-services">
                      {project.services}
                    </span>
                  </div>
                  <div className="cs-spec-item">
                    <span className="cs-spec-label">Client</span>
                    <span className="cs-spec-value" id="cs-client">
                      {project.client}
                    </span>
                  </div>
                  <div className="cs-spec-item">
                    <span className="cs-spec-label">Year</span>
                    <span className="cs-spec-value" id="cs-year">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Story / Overview Content */}
                <div className="cs-story-block">
                  <h3 className="cs-section-label">OVERVIEW</h3>
                  <div className="cs-body-paragraphs" id="cs-description">
                    {project.description.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design System & Tech Specs Section */}
          <div className="cs-design-system-section py-5 my-3">
            <div className="row g-4">
              {/* Tech Stack Used */}
              <div className="col-lg-4 col-md-12">
                <div className="cs-system-card h-100">
                  <span className="cs-sub-heading text-uppercase">TECH STACK</span>
                  <h3 className="cs-system-card-title mb-3">Technologies Used</h3>
                  <div className="cs-tech-tags-flex" id="cs-tech-stack-tags">
                    {(project.techTags || 'Figma, HTML5/SCSS, JavaScript, GSAP, Vercel').split(',').map((tag, i) => (
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
                      { hex: project.color1Hex || '#d2ea26', name: project.color1Name || 'Accent Lime' },
                      { hex: project.color2Hex || '#849a00', name: project.color2Name || 'Dark Lime Accent' },
                      { hex: project.color3Hex || '#0f172a', name: project.color3Name || 'Dark Surface' },
                      { hex: project.color4Hex || '#f8fafc', name: project.color4Name || 'Light Background' },
                    ].map((swatch, i) => (
                      <div key={i} className="cs-swatch-item">
                        <span className="cs-swatch-box" style={{ background: swatch.hex, border: swatch.hex === '#f8fafc' || swatch.hex === '#F8FAFC' ? '1px solid #cbd5e1' : 'none' }}></span>
                        <div className="cs-swatch-info">
                          <span className="cs-swatch-name">{swatch.name}</span>
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

          {/* Secondary Full Showcase Frame */}
          <div className="cs-showcase-frame mb-5">
            <div className="cs-laptop-container">
              <img src={project.showcaseImg} alt="Secondary Showcase View" id="cs-showcase-img" className="cs-mockup-img" />
            </div>
          </div>

          {/* Mobile Experience Section */}
          <div className="cs-mobile-section py-5 my-3">
            <div className="text-center mb-5">
              <span className="cs-sub-heading text-uppercase">RESPONSIVE DESIGN</span>
              <h2 className="cs-main-heading">MOBILE EXPERIENCE</h2>
            </div>

            <div className="row g-4 justify-content-center cs-mobile-grid">
              {/* Mobile Screen 1 Mockup Card */}
              <div className="col-lg-5 col-md-6 col-sm-12">
                <div className="cs-phone-card">
                  <img src={project.mobileImg1} alt="Mobile Experience Mockup View 1" id="cs-mobile-img-1" className="cs-phone-img" />
                </div>
              </div>
              {/* Mobile Screen 2 Mockup Card */}
              <div className="col-lg-5 col-md-6 col-sm-12">
                <div className="cs-phone-card">
                  <img src={project.mobileImg2} alt="Mobile Experience Mockup View 2" id="cs-phone-img" className="cs-phone-img" />
                </div>
              </div>
            </div>
          </div>

          {/* Highlights & Outcome Section */}
          <div className="cs-outcome-section py-4 mb-5">
            <div className="row align-items-start g-4">
              <div className="col-lg-4 col-md-12">
                <h3 className="cs-section-label">THE OUTCOME</h3>
              </div>
              <div className="col-lg-8 col-md-12">
                <p className="cs-outcome-text" id="cs-outcome-desc">
                  {project.outcome}
                </p>
              </div>
            </div>

            <div className="cs-banner-frame mt-5">
              <img src={project.bannerImg} alt="Final Feature Banner Showcase" id="cs-banner-img" className="cs-banner-img" />
            </div>
          </div>

          {/* Bottom Project Navigation Bar */}
          <div className="cs-bottom-nav py-5 text-center">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 cs-nav-flex">
              <Link to="/works" className="cs-back-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>All Projects</span>
              </Link>

              <Link to="/contact" className="btn-purple-glow">
                <span>Start Your Project</span>
              </Link>

              <Link to={`/case-study?id=${project.nextId || 'styleora'}`} className="cs-next-link" id="cs-next-link">
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
