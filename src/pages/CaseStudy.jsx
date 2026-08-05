import React, { useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';

const caseStudiesData = {
  voyagera: {
    id: "voyagera",
    title: "Voyagera",
    tagline: "World Expeditions & Luxury Havens Travel Platform",
    liveUrl: "https://voyageratravel.vercel.app/",
    category: "Travel & Hospitality",
    services: "UI/UX & Web Development",
    client: "Voyagera Group",
    year: "2026",
    heroImg: "/assets/portfolio/gyogrea.png",
    showcaseImg: "/assets/portfolio/gyogrea.png",
    mobileImg1: "/assets/portfolio/3-greentrack.jpg",
    mobileImg2: "/assets/portfolio/2-elve.jpg",
    bannerImg: "/assets/portfolio/gyogrea.png",
    nextId: "styleora-fashion-e-commerce",
    techTags: "Figma, React, SCSS, Motion, Vercel",
    color1Hex: "#d2ea26",
    color1Name: "Accent Lime",
    color2Hex: "#849a00",
    color2Name: "Dark Lime Accent",
    color3Hex: "#0f172a",
    color3Name: "Dark Surface",
    color4Hex: "#f8fafc",
    color4Name: "Light Background",
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter / System Sans",
    description: [
      "Voyagera is a next-generation luxury travel expedition platform engineered to connect discerning global explorers with handpicked luxury retreats and sacred sanctuaries around the globe.",
      "Built with a strong focus on immersive visual storytelling, fluid interactive destination filtering, and frictionless reservation workflows, the application balances rich photography with crisp typography and modern component architecture.",
      "Every breakpoint and asset pipeline was tuned to ensure sub-second rendering, micro-animations, and fluid touch interactions across all mobile and desktop browsers."
    ],
    outcome: "Delivered a 99+ PageSpeed performance rating with 45% increase in user session duration and seamless booking conversion across mobile and desktop."
  },
  "styleora-fashion-e-commerce": {
    id: "styleora-fashion-e-commerce",
    title: "StyleOra — Fashion E-Commerce",
    tagline: "Modern Luxury E-Commerce & Retail Flagship",
    liveUrl: "https://styleorashop.vercel.app/",
    category: "E-Commerce & Fashion",
    services: "UI/UX & Frontend Development",
    client: "StyleOra Studio",
    year: "2026",
    heroImg: "/assets/portfolio/1-styleora.jpg",
    showcaseImg: "/assets/portfolio/1-styleora.jpg",
    mobileImg1: "/assets/portfolio/1-styleora.jpg",
    mobileImg2: "/assets/portfolio/2-elve.jpg",
    bannerImg: "/assets/portfolio/1-styleora.jpg",
    nextId: "elve-creative-agency-portfolio",
    techTags: "Figma, React, SCSS, Motion, Vercel",
    color1Hex: "#e2e8f0",
    color1Name: "Platinum Light",
    color2Hex: "#1e293b",
    color2Name: "Charcoal Slate",
    color3Hex: "#09090b",
    color3Name: "Deep Obsidian",
    color4Hex: "#ffffff",
    color4Name: "Pure White",
    headingFont: "Syne / Plus Jakarta Sans",
    bodyFont: "Inter / System Sans",
    description: [
      "StyleOra is an ultra-minimalist e-commerce digital flagship tailored for luxury apparel, haute couture, and premium fashion accessories.",
      "The system highlights an intuitive product gallery grid, instant multi-attribute filter drawers, seamless dark and light mode aesthetics, and an optimized single-step cart checkout experience designed for maximum conversion.",
      "Leveraging high-performance CSS grid architecture, hardware-accelerated transitions, and accessible UI patterns, StyleOra delivers an unmatched digital retail journey."
    ],
    outcome: "Engineered a high-conversion digital boutique layout with refined typography, responsive product drawers, and ultra-fast page transitions."
  },
  "elve-creative-agency-portfolio": {
    id: "elve-creative-agency-portfolio",
    title: "Elve — Creative Agency Portfolio",
    tagline: "Next-Gen Vehicle & Asset Rental Platform",
    liveUrl: "https://elve.vercel.app/",
    category: "Rental & Mobility",
    services: "UI/UX Design & Development",
    client: "Elve Mobility",
    year: "2025",
    heroImg: "/assets/portfolio/2-elve.jpg",
    showcaseImg: "/assets/portfolio/2-elve.jpg",
    mobileImg1: "/assets/portfolio/2-elve.jpg",
    mobileImg2: "/assets/portfolio/1-styleora.jpg",
    bannerImg: "/assets/portfolio/2-elve.jpg",
    nextId: "greentrack-sustainability-dashboard",
    techTags: "React, GSAP, Lenis, SCSS",
    color1Hex: "#38bdf8",
    color1Name: "Cyan Glow",
    color2Hex: "#0284c7",
    color2Name: "Deep Ocean",
    color3Hex: "#0b0c10",
    color3Name: "Dark Background",
    color4Hex: "#f1f5f9",
    color4Name: "Soft Slate",
    headingFont: "Outfit / Plus Jakarta Sans",
    bodyFont: "Inter / System Sans",
    description: [
      "Elve is a sleek mobility rental platform engineered for effortless online fleet discovery, real-time availability checks, and instant vehicle reservations.",
      "Featuring interactive specification cards, custom date selection calendars, and category filtering, Elve simplifies complex rental logistics into an intuitive user journey.",
      "Crafted with a sleek dark-mode design system, high-contrast typography, and sub-second component states for maximum user delight."
    ],
    outcome: "Simplified multi-step reservation flows into a frictionless single-page booking experience with instant visual feedback."
  },
  "greentrack-sustainability-dashboard": {
    id: "greentrack-sustainability-dashboard",
    title: "GreenTrack — Sustainability Dashboard",
    tagline: "Eco-Tracking & Sustainability Analytics Dashboard",
    liveUrl: "https://greentrack-ten.vercel.app/",
    category: "SaaS & Analytics",
    services: "UI/UX Design & Development",
    client: "GreenTrack Eco",
    year: "2025",
    heroImg: "/assets/portfolio/3-greentrack.jpg",
    showcaseImg: "/assets/portfolio/3-greentrack.jpg",
    mobileImg1: "/assets/portfolio/3-greentrack.jpg",
    mobileImg2: "/assets/portfolio/gyogrea.png",
    bannerImg: "/assets/portfolio/3-greentrack.jpg",
    nextId: "travelgallery-curated-destinations",
    techTags: "React, Chart.js, Tailwind CSS, Vercel",
    color1Hex: "#22c55e",
    color1Name: "Emerald Green",
    color2Hex: "#15803d",
    color2Name: "Forest Accent",
    color3Hex: "#091e11",
    color3Name: "Eco Surface",
    color4Hex: "#f0fdf4",
    color4Name: "Mint Soft",
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter / System Sans",
    description: [
      "GreenTrack is an advanced environmental analytics dashboard created to help enterprises and individuals track carbon footprints and sustainability metrics in real time.",
      "Through visual chart widgets, color-coded status badges, and interactive progress timelines, complex environmental datasets are converted into clear, actionable insights.",
      "Designed with accessibility standards, dark UI hierarchy, and responsive grid flex layout across all device viewports."
    ],
    outcome: "Transformed complex sustainability metrics into clean, beautiful dashboard visualizations for quick decision-making."
  },
  "travelgallery-curated-destinations": {
    id: "travelgallery-curated-destinations",
    title: "TravelGallery — Curated Destinations",
    tagline: "Immersive Travel Discovery & Booking Portal",
    liveUrl: "https://travelgallery.vercel.app/",
    category: "Travel & Hospitality",
    services: "UI/UX & Mobile Design",
    client: "TravelGallery Inc",
    year: "2025",
    heroImg: "/assets/portfolio/4-travellgallery.jpg",
    showcaseImg: "/assets/portfolio/case-study/travel-gallery.jpg",
    mobileImg1: "/assets/portfolio/4-travellgallery.jpg",
    mobileImg2: "/assets/portfolio/4-travellgallery.jpg",
    bannerImg: "/assets/portfolio/4-travellgallery.jpg",
    nextId: "icone-luxury-hotel-booking",
    techTags: "Figma, React, Vite, SCSS",
    color1Hex: "#f97316",
    color1Name: "Sunset Orange",
    color2Hex: "#ea580c",
    color2Name: "Deep Amber",
    color3Hex: "#0f172a",
    color3Name: "Dark Slate",
    color4Hex: "#fff7ed",
    color4Name: "Warm Tint",
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter / System Sans",
    description: [
      "TravelGallery provides visual discovery of world-class travel destinations with seamless trip planning workflows.",
      "Featuring high-resolution editorial photography, interactive destination cards, and mobile-optimized itinerary planning tools.",
      "Optimized for ultra-fast rendering speeds across mobile and desktop devices."
    ],
    outcome: "Achieved 98+ Google Lighthouse performance score with enhanced trip conversion rates."
  },
  "icone-luxury-hotel-booking": {
    id: "icone-luxury-hotel-booking",
    title: "Icone — Luxury Hotel Booking",
    tagline: "Premium Boutique Hotel Reservation System",
    liveUrl: "https://icone-hotel.vercel.app/",
    category: "Hospitality & Retail",
    services: "UI/UX & Frontend Development",
    client: "Icone Hospitality",
    year: "2025",
    heroImg: "/assets/portfolio/5-icone-hotel-booking.jpg",
    showcaseImg: "/assets/portfolio/case-study/icon-hotel.jpg",
    mobileImg1: "/assets/portfolio/5-icone-hotel-booking.jpg",
    mobileImg2: "/assets/portfolio/5-icone-hotel-booking.jpg",
    bannerImg: "/assets/portfolio/5-icone-hotel-booking.jpg",
    nextId: "chrona-ai-time-management-app",
    techTags: "React, CSS Modules, Framer Motion",
    color1Hex: "#eab308",
    color1Name: "Gold Luxury Accent",
    color2Hex: "#a16207",
    color2Name: "Deep Bronze",
    color3Hex: "#121212",
    color3Name: "Dark Luxury Surface",
    color4Hex: "#fefce8",
    color4Name: "Cream Pearl",
    headingFont: "Cinzel / Plus Jakarta Sans",
    bodyFont: "Inter / System Sans",
    description: [
      "Icone Hotel offers high-end hospitality booking with fluid transitions, room customization, and instant reservation confirmation.",
      "Crafted with an elegantly designed dark glassmorphic design system tailored for luxury boutique hotels.",
      "Streamlined reservation flow with multi-currency pricing and room visualizer tools."
    ],
    outcome: "Elevated direct guest bookings by 50% through refined visual presentation."
  },
  "chrona-ai-time-management-app": {
    id: "chrona-ai-time-management-app",
    title: "Chrona — AI Time Management App",
    tagline: "Smart Schedule Optimizer & Productivity Assistant",
    liveUrl: "https://chrona.vercel.app/",
    category: "SaaS & Mobile App",
    services: "Mobile UI/UX & Web App Design",
    client: "Chrona Labs",
    year: "2025",
    heroImg: "/assets/portfolio/6-chrona.jpg",
    showcaseImg: "/assets/portfolio/6-chrona.jpg",
    mobileImg1: "/assets/portfolio/6-chrona.jpg",
    mobileImg2: "/assets/portfolio/6-chrona.jpg",
    bannerImg: "/assets/portfolio/6-chrona.jpg",
    nextId: "modernbrand-identity-system",
    techTags: "Figma, React Native, React, Vercel",
    color1Hex: "#a855f7",
    color1Name: "Vibrant Violet",
    color2Hex: "#7e22ce",
    color2Name: "Deep Purple",
    color3Hex: "#090514",
    color3Name: "Dark Space",
    color4Hex: "#faf5ff",
    color4Name: "Soft Purple Tint",
    headingFont: "Outfit / Plus Jakarta Sans",
    bodyFont: "Inter / System Sans",
    description: [
      "Chrona helps remote teams and creators manage deep work sessions using AI workload prediction and automated schedule blocking.",
      "Modern, minimalist mobile UI layout with intuitive micro-interactions and haptic feedback.",
      "Empowers users to focus on high-impact tasks while minimizing cognitive friction."
    ],
    outcome: "Featured on Product Hunt Top 5 Apps of the week with 10k+ active users."
  },
  "modernbrand-identity-system": {
    id: "modernbrand-identity-system",
    title: "ModernBrand — Design System",
    tagline: "Comprehensive Visual Identity & Component Library",
    liveUrl: "https://modernbrand.vercel.app/",
    category: "Branding & Systems",
    services: "Branding & Design System",
    client: "ModernBrand Co",
    year: "2025",
    heroImg: "/assets/portfolio/7-modernbrand.jpg",
    showcaseImg: "/assets/portfolio/case-study/modernbrand.jpg",
    mobileImg1: "/assets/portfolio/7-modernbrand.jpg",
    mobileImg2: "/assets/portfolio/7-modernbrand.jpg",
    bannerImg: "/assets/portfolio/7-modernbrand.jpg",
    nextId: "styleora-fashion-e-commerce",
    techTags: "Figma, Design Tokens, React, Storybook",
    color1Hex: "#6366f1",
    color1Name: "Indigo Accent",
    color2Hex: "#4338ca",
    color2Name: "Deep Indigo",
    color3Hex: "#0f172a",
    color3Name: "Dark Canvas",
    color4Hex: "#eef2ff",
    color4Name: "Indigo Tint",
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Inter / System Sans",
    description: [
      "ModernBrand design system unifies digital brand identity across web, mobile, and marketing touchpoints.",
      "Includes accessible color palettes, custom iconography, and scalable UI guidelines.",
      "Provides reusable tokenized components for rapid product design and engineering handoff."
    ],
    outcome: "Adopted across 12 digital product teams to accelerate UI development by 60%."
  }
};

// Aliases mapping short keys (e.g. 'styleora') to full keys
const keyAliases = {
  styleora: "styleora-fashion-e-commerce",
  elve: "elve-creative-agency-portfolio",
  greentrack: "greentrack-sustainability-dashboard",
  travelgallery: "travelgallery-curated-destinations",
  icone: "icone-luxury-hotel-booking",
  chrona: "chrona-ai-time-management-app",
  modernbrand: "modernbrand-identity-system",
  voyagera: "voyagera"
};

const getProjectData = (requestedId) => {
  if (!requestedId) return caseStudiesData.voyagera;
  const canonicalId = keyAliases[requestedId] || requestedId;
  return caseStudiesData[canonicalId] || caseStudiesData.voyagera;
};

const CaseStudy = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  
  const rawId = params.id || searchParams.get('id') || 'voyagera';
  const project = getProjectData(rawId);

  useEffect(() => {
    document.body.classList.add('case-study-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('case-study-page');
    };
  }, [rawId]);

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
                      <span>Visit website ↗</span>
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
                      { hex: project.color1Hex || '#d2ea26', name: project.color1Name || 'Accent Lime' },
                      { hex: project.color2Hex || '#849a00', name: project.color2Name || 'Dark Lime Accent' },
                      { hex: project.color3Hex || '#0f172a', name: project.color3Name || 'Dark Surface' },
                      { hex: project.color4Hex || '#f8fafc', name: project.color4Name || 'Light Background' },
                    ].map((swatch, i) => (
                      <div key={i} className="cs-swatch-item">
                        <span className="cs-swatch-box" style={{ background: swatch.hex, border: swatch.hex === '#f8fafc' || swatch.hex === '#F8FAFC' || swatch.hex === '#ffffff' ? '1px solid #cbd5e1' : 'none' }}></span>
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
