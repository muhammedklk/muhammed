import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import './casestudy.css';

// Project display titles matching bespoke editorial branding
const DISPLAY_TITLES = {
  'nadvora-expeditions': 'Nādvora',
  'styleora-luxury-store': 'Styleora',
  'green-track-logistics': 'Green Track',
  'mahora-travel-app': 'Mahora',
  'bizdot-erp-platform': 'BizDot ERP',
  'nova-cloud-suite': 'Nova Cloud',
  'ronarai-restaurant': 'Ronarai KSA',
  'gemini-music-awards': 'Gemini Music Award'
};

// Map high-fidelity studio mockups for each project
const getProjectMedia = (project) => {
  if (project.slug === 'nadvora-expeditions') {
    return {
      hero: '/assets/Nadvora Travel Website Monitor Mockup.png',
      laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
      mobile1: '/assets/mockup-mahora-mobile.png',
      mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
      perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
    };
  }

  if (project.slug === 'mahora-travel-app') {
    return {
      hero: '/assets/mockup-mahora-mobile.png',
      laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
      mobile1: '/assets/mockup-mahora-mobile.png',
      mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
      perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
    };
  }

  if (project.slug === 'styleora-luxury-store') {
    return {
      hero: '/assets/mockup-styleora.jpg',
      laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
      mobile1: '/assets/mockup-mahora-mobile.png',
      mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
      perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
    };
  }

  if (project.slug === 'green-track-logistics') {
    return {
      hero: '/assets/mockup-green-track.png',
      laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
      mobile1: '/assets/mockup-mahora-mobile.png',
      mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
      perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
    };
  }

  if (project.slug === 'ronarai-restaurant') {
    return {
      hero: '/assets/mockup-advanced-leap.jpg',
      laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
      mobile1: '/assets/mockup-mahora-mobile.png',
      mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
      perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
    };
  }

  if (project.slug === 'bizdot-erp-platform') {
    return {
      hero: '/assets/mockup-erp.jpg',
      laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
      mobile1: '/assets/mockup-mahora-mobile.png',
      mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
      perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
    };
  }

  if (project.slug === 'nova-cloud-suite') {
    return {
      hero: '/assets/mockup-nova.jpg',
      laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
      mobile1: '/assets/mockup-mahora-mobile.png',
      mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
      perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
    };
  }

  if (project.slug === 'gemini-music-awards') {
    return {
      hero: '/assets/mockup-gemini-music-award.jpg',
      laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
      mobile1: '/assets/mockup-mahora-mobile.png',
      mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
      perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
    };
  }

  // Fallback
  return {
    hero: project.coverImage,
    laptop: '/assets/ChatGPT Image Aug 7, 2026, 02_28_57 PM.png',
    mobile1: '/assets/mockup-mahora-mobile.png',
    mobile2: '/assets/Mahora Travel Smartphone Mockup-2.png',
    perspective: '/assets/ChatGPT Image Aug 7, 2026, 09_16_09 PM.png'
  };
};

export default function CaseStudyPage() {
  const { slug } = useParams();
  const { projects } = usePortfolio();
  const project = (projects || []).find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/works" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const displayTitle = DISPLAY_TITLES[project.slug] || project.shortTitle || project.title;
  const media = getProjectMedia(project);

  document.title = `${displayTitle} — Case Study · Muhammed K`;

  return (
    <article className="cs-editorial-page">
      <div className="cs-editorial-container">

        {/* ============================================================
            1. BIG CENTERED HEADLINE
        ============================================================ */}
        <header className="cs-editorial-header text-center">
          <h1 className="cs-hero-monumental-title">{displayTitle}</h1>
        </header>

        {/* ============================================================
            2. HERO PRIMARY STUDIO MOCKUP
        ============================================================ */}
        <section className="cs-hero-mockup-frame">
          <img
            src={media.hero}
            alt={`${project.title} Hero Display Mockup`}
            className="cs-mockup-full-img"
            loading="eager"
          />
        </section>

        {/* ============================================================
            3. ACTION & METADATA BAR
        ============================================================ */}
        <section className="cs-action-meta-bar">
          <div className="cs-action-left">
            <Link
              to="/contact"
              className="cs-view-site-pill-btn"
              id="cs-hero-cta-btn"
            >
              <span>VIEW LIVE SITE</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="cs-meta-columns">
            <div className="cs-meta-col">
              <span className="cs-meta-col-label">SERVICES</span>
              <span className="cs-meta-col-value">{project.role || 'UI/UX & Web Development'}</span>
            </div>
            <div className="cs-meta-col">
              <span className="cs-meta-col-label">INDUSTRY</span>
              <span className="cs-meta-col-value">{project.category || 'Digital Product'}</span>
            </div>
            <div className="cs-meta-col">
              <span className="cs-meta-col-label">YEAR</span>
              <span className="cs-meta-col-value">{project.year || '2026'}</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            4. TWO-COLUMN EDITORIAL OVERVIEW & CHALLENGE
        ============================================================ */}
        <section className="cs-editorial-narrative-section">
          <div className="row g-5">
            {/* Left Column: Overview */}
            <div className="col-lg-5 col-md-12">
              <div className="cs-narrative-block">
                <span className="section-tag-editorial">( OVERVIEW )</span>
                <h2 className="cs-narrative-subheading">
                  {project.shortTitle ? `A Bespoke ${project.shortTitle} Experience` : project.title}
                </h2>
                <p className="cs-narrative-body">
                  {project.overview}
                </p>
              </div>
            </div>

            {/* Right Column: The Challenge & Execution */}
            <div className="col-lg-7 col-md-12">
              <div className="cs-narrative-block">
                <span className="section-tag-editorial">( THE CHALLENGE & EXECUTION )</span>
                <p className="cs-narrative-body cs-narrative-lead-challenge">
                  {project.challenge}
                </p>
                <p className="cs-narrative-body">
                  To address this friction, the design system was crafted in Figma with atomic components,
                  clear type hierarchy, accessible contrast tokens, and intuitive micro-interactions. Every interaction
                  was engineered to maintain 60fps buttery smoothness and responsive fluidity across desktop, tablet,
                  and mobile devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. SECOND FULL-WIDTH STUDIO MOCKUP (LAPTOP ON DESK)
        ============================================================ */}
        <section className="cs-fullwidth-mockup-frame">
          <img
            src={media.laptop}
            alt={`${project.title} Laptop Studio Presentation`}
            className="cs-mockup-full-img"
            loading="lazy"
          />
        </section>

        {/* ============================================================
            6. "DESIGNED FOR EVERY SCREEN" (RESPONSIVE DUAL MOBILE MOCKUPS)
        ============================================================ */}
        <section className="cs-responsive-showcase-section text-center">
          <span className="section-tag-editorial">( DEVICE & EXPERIENCE )</span>
          <h2 className="cs-responsive-title">Designed For Every Screen.</h2>

          <div className="row g-4 cs-dual-phone-grid">
            <div className="col-md-6 col-12">
              <div className="cs-dual-phone-card">
                <img
                  src={media.mobile1}
                  alt={`${project.title} Mobile Screen 1`}
                  className="cs-phone-mockup-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="cs-dual-phone-card">
                <img
                  src={media.mobile2}
                  alt={`${project.title} Mobile Screen 2`}
                  className="cs-phone-mockup-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            7. THIRD PERSPECTIVE STUDIO MOCKUP
        ============================================================ */}
        <section className="cs-fullwidth-mockup-frame cs-mockup-last-frame">
          <img
            src={media.perspective}
            alt={`${project.title} Workspace Setup Mockup`}
            className="cs-mockup-full-img"
            loading="lazy"
          />
        </section>

        {/* ============================================================
            8. PREVIOUS & NEXT PROJECT FOOTER NAVIGATION
        ============================================================ */}
        <nav className="cs-prev-next-nav" aria-label="Adjacent Projects">
          <div className="cs-nav-link-item cs-nav-prev">
            <Link to={`/works/${prevProject.slug}`} className="cs-nav-anchor">
              <span className="cs-nav-direction">← PREVIOUS PROJECT</span>
              <span className="cs-nav-title">{DISPLAY_TITLES[prevProject.slug] || prevProject.title}</span>
            </Link>
          </div>

          <div className="cs-nav-link-item cs-nav-next text-end">
            <Link to={`/works/${nextProject.slug}`} className="cs-nav-anchor">
              <span className="cs-nav-direction">NEXT PROJECT →</span>
              <span className="cs-nav-title">{DISPLAY_TITLES[nextProject.slug] || nextProject.title}</span>
            </Link>
          </div>
        </nav>

      </div>
    </article>
  );
}
