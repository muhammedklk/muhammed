import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Palette, Code2, Globe, Download, MapPin, PenTool, Monitor, MessageCircle } from 'lucide-react';
import ArrowIcon from '../components/ArrowIcon';
import HeroThreeSphere from '../components/HeroThreeSphere';
import ProjectCard from '../components/ProjectCard';

import { usePortfolio } from '../context/PortfolioContext';
import '../styles/hero.css';
import '../styles/projects.css';
import '../styles/faq.css';
import './home.css';

// Custom animated +/× icon
function FaqToggleIcon({ isOpen }) {
  return (
    <span className={`faq-icon ${isOpen ? 'faq-icon--open' : ''}`} aria-hidden="true">
      <span className="faq-icon__line faq-icon__line--h" />
      <span className="faq-icon__line faq-icon__line--v" />
    </span>
  );
}

// FAQ Accordion Item
function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-ref-item ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="faq-ref-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${item.id}-collapse`}
        id={`${item.id}-trigger`}
      >
        <span className="faq-ref-question">{item.question}</span>
        <div className="faq-ref-bubble" aria-hidden="true">
          <FaqToggleIcon isOpen={isOpen} />
        </div>
      </button>
      <div
        id={`${item.id}-collapse`}
        className="faq-ref-collapse"
        role="region"
        aria-labelledby={`${item.id}-trigger`}
      >
        <div className="faq-ref-inner">
          <p className="faq-ref-answer">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

// Scroll-reveal text: letters animate with a buttery soft gradient from gray → dark as section scrolls into view
function ScrollRevealText({ text, className }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.90;
      const end = -windowH * 0.15;
      const current = rect.top;
      const p = Math.min(1, Math.max(0, (start - current) / (start - end)));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalChars = text.length;
  const spread = 24;
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <h2 className={className} ref={ref} aria-label={text}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const wordStartIndex = charCounter;
        charCounter += word.length + 1;

        return (
          <span
            key={wordIndex}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              marginRight: '0.28em',
            }}
          >
            {wordChars.map((char, charLocalIndex) => {
              const globalIndex = wordStartIndex + charLocalIndex;
              const activePos = progress * (totalChars + spread);
              const rawProgress = Math.min(1, Math.max(0, (activePos - globalIndex) / spread));
              const smoothProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);

              const gray = 180;
              const dark = 12;
              const val = Math.round(gray - (gray - dark) * smoothProgress);
              const color = `rgb(${val},${val},${val})`;

              return (
                <span
                  key={charLocalIndex}
                  style={{
                    color,
                    transition: 'color 0.16s ease-out',
                    display: 'inline',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
}

// Editorial statement with inline image chips embedded between text segments
function InlineImageStatement({ aboutSnippet }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.90;
      const end = -windowH * 0.15;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Build segments dynamically from aboutSnippet CMS data
  const s = aboutSnippet || {};
  const segments = [
    { type: 'text', content: s.text1 || "Design isn't just what I do —" },
    { type: 'image', src: s.chip1 || '/assets/portrait-burgundy.png', alt: 'Portrait', label: 'Designer' },
    { type: 'text', content: s.text2 || "it's how I think. I'm" },
    { type: 'image', src: s.chip2 || '/assets/mockup-nadvora-monitor.png', alt: 'Nadvora project', label: 'Work' },
    { type: 'text', content: s.text3 || "Muhammed K, a product designer & front-end developer who believes" },
    { type: 'image', src: s.chip3 || '/assets/mockup-styleora.jpg', alt: 'Styleora project', label: 'Work' },
    { type: 'text', content: s.text4 || "great products start with" },
    { type: 'image', src: s.chip4 || '/assets/mockup-mahora-mobile.png', alt: 'Mahora project', label: 'Work' },
    { type: 'text', content: s.text5 || "understanding people, not pixels." },
  ];

  function RevealWord({ word, globalIndex, totalChars, spread, progress }) {
    const activePos = progress * (totalChars + spread);
    const rawProgress = Math.min(1, Math.max(0, (activePos - globalIndex) / spread));
    const smoothProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);
    const gray = 180;
    const dark = 12;
    const val = Math.round(gray - (gray - dark) * smoothProgress);
    return (
      <span style={{ color: `rgb(${val},${val},${val})`, transition: 'color 0.16s ease-out', display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.28em' }}>
        {word}
      </span>
    );
  }

  const fullText = segments.filter(s => s.type === 'text').map(s => s.content).join(' ');
  const totalChars = fullText.length;
  const spread = 24;
  let charCounter = 0;

  return (
    <h2 className="about-editorial-statement" ref={ref}>
      {segments.map((seg, segIdx) => {
        if (seg.type === 'image') {
          return (
            <span key={`img-${segIdx}`} className="about-inline-img-chip" aria-hidden="true">
              <img src={seg.src} alt={seg.alt} className="about-inline-chip-img" />
            </span>
          );
        }
        // text segment
        const words = seg.content.split(' ');
        return (
          <span key={`txt-${segIdx}`}>
            {words.map((word, wi) => {
              const idx = charCounter;
              charCounter += word.length + 1;
              return <RevealWord key={wi} word={word} globalIndex={idx} totalChars={totalChars} spread={spread} progress={progress} />;
            })}
          </span>
        );
      })}
    </h2>
  );
}

export default function HomePage() {
  const { personalInfo, projects, faqItems, homeContent } = usePortfolio();
  const featuredList = (projects || []).filter(p => p.featured);
  const featuredProjects = featuredList.length > 0 ? featuredList : (projects || []).slice(0, 4);

  const hero = homeContent?.hero || {};
  const aboutSnip = homeContent?.aboutSnippet || {};
  const servSec = homeContent?.servicesSection || {};
  const worksSec = homeContent?.worksSection || {};
  const faqSec = homeContent?.faqSection || {};

  return (
    <>
      {/* SEO Meta Update via document.title */}
      {(() => { document.title = 'MUHAMMED K — UI/UX Designer & Front-End Developer Portfolio'; return null; })()}

      {/* ============================
          HERO SECTION
      ============================ */}
      <section className="hero-wrapper" aria-label="Hero">
        <div className="hero-stage-card">
          {/* Floating 3D Sphere — Center of Stage */}
          <div className="hero-canvas-container">
            <Suspense fallback={<div style={{ width: 340, height: 340 }} />}>
              <HeroThreeSphere />
            </Suspense>
          </div>

          {/* Content Grid: Left + Right panels */}
          <div className="hero-content-grid">
            <div className="container">
              <div className="row align-items-end justify-content-between hero-bottom-row">
                {/* Bottom-Left: Main Headline */}
                <div className="col-lg-6 col-md-6 col-12 hero-pointer-enable">
                  <div className="hero-left-col reveal-up">
                    <h1 className="hero-main-title">
                      {(() => {
                        const raw = hero.headline || 'Design That Feels.\nExperiences That Resonate.';
                        let lines = raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
                        if (lines.length <= 1 && raw.includes('. ')) {
                          const parts = raw.split('. ');
                          if (parts.length === 2) {
                            lines = [parts[0] + '.', parts[1]];
                          }
                        }
                        return lines.map((line, idx) => (
                          <span key={idx} className="title-line">{line}</span>
                        ));
                      })()}
                    </h1>
                    <p className="hero-description">
                      {hero.subtext || 'I blend human-centered design, modern front-end engineering, and aesthetic precision to create digital experiences that people connect with — seamlessly across every screen.'}
                    </p>
                    <div className="hero-cta-wrap">
                      <Link to="/contact" className="hero-talk-btn" id="hero-cta-btn">
                        <span>{hero.ctaText || "LET'S TALK"}</span>
                        <ArrowIcon size={18} className="hero-talk-arrow" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Bottom-Right: Side Statement + Service Pills */}
                <div className="col-lg-5 col-md-6 col-12 hero-pointer-enable">
                  <div className="hero-right-col reveal-up reveal-delay-2">
                    <p className="hero-side-statement">
                      {hero.sideStatement || "Whether through intuitive user interfaces, responsive web systems, or clean front-end code, I craft digital products that people don't just use — they feel."}
                    </p>
                    <div className="hero-service-pills">
                      {(hero.pills || ['UI/UX', 'WEB DESIGN', 'FRONT-END DEV']).map((pill, i) => (
                        <span key={i} className="service-pill-btn">{pill}</span>
                      ))}
                      <span className="service-pill-btn plus-btn">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================
          ABOUT SECTION — SIMPLE EDITORIAL (Matches Reference)
      ============================ */}
      <section className="about-editorial-section" id="about-preview" aria-label="About Muhammed K">
        <div className="container">
          <div className="about-editorial-wrap text-center reveal-up">
            <span className="about-editorial-eyebrow">{aboutSnip.tag || '( ABOUT )'}</span>
            <InlineImageStatement aboutSnippet={aboutSnip} />
            <div className="about-editorial-actions">
              <Link to="/about" className="btn-talk-dark" id="about-read-story-btn">
                <span>{aboutSnip.readStoryText || 'Read Full Story'}</span>
                <ArrowIcon size={14} />
              </Link>
              <a
                href={personalInfo.cvPath}
                download="MuhammedK-CV.pdf"
                className="about-btn-resume"
                id="about-download-cv-btn"
              >
                <Download size={15} />
                <span>{aboutSnip.downloadCvText || 'DOWNLOAD CV'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SERVICES SECTION — BESPOKE REDESIGN
      ============================ */}
      <section className="services-section" id="services" aria-label="How Can I Assist You">
        <div className="container">
          <div className="services-header text-center reveal-up">
            <span className="section-tag-editorial">{servSec.tag || '( SERVICES )'}</span>
            <h2 className="services-main-headline">
              {(() => {
                const hl = servSec.headline || 'Crafting Intuitive Products Across Every Dimension.';
                if (hl.includes('Every Dimension')) {
                  const prefix = hl.replace(/\.?\s*Every Dimension\.?/i, '').trim();
                  return (
                    <>
                      {prefix}{' '}
                      <span className="services-headline-accent">Every Dimension</span>.
                    </>
                  );
                }
                return hl;
              })()}
            </h2>
            <p className="services-main-desc">
              {servSec.subtitle || 'I create intuitive digital experiences through human-centered UI/UX design, modern web development, and front-end engineering solutions.'}
            </p>
          </div>

          <div className="row g-4 reveal-stagger">
            {((servSec.cards && servSec.cards.length > 0) ? servSec.cards : [
              {
                number: "01",
                theme: "theme-violet",
                category: "Interface & Systems",
                title: "UI/UX Design",
                tags: ["Figma Systems", "User Research", "Interactive Prototypes", "Design Handoff"],
                linkText: "EXPLORE DESIGN WORKS",
                linkUrl: "/works"
              },
              {
                number: "02",
                theme: "theme-blue",
                category: "Visual & Responsive",
                title: "Web Design",
                tags: ["Responsive Layouts", "Micro-Animations", "Design Tokens", "Brand Direction"],
                linkText: "EXPLORE WEB PROJECTS",
                linkUrl: "/works"
              },
              {
                number: "03",
                theme: "theme-emerald",
                category: "Code & 3D Engineering",
                title: "Frontend Development",
                tags: ["React.js Apps", "Three.js / WebGL", "Modern CSS3", "Performance & SEO"],
                linkText: "START A PROJECT",
                linkUrl: "/contact"
              }
            ]).map((card, idx) => {
              const icons = [PenTool, Monitor, Code2];
              const Icon = icons[idx % icons.length] || PenTool;
              return (
                <div key={idx} className="col-lg-4 col-md-6 col-12">
                  <div className={`service-bento-card ${card.theme || 'theme-violet'}`}>
                    <div className="service-bento-top">
                      <div className="service-glyph-box">
                        <Icon size={22} />
                      </div>
                      <span className="service-badge-pill">{card.number}</span>
                    </div>
                    <div className="service-bento-content">
                      <span className="service-category-tag">{card.category}</span>
                      <h3 className="service-bento-title">{card.title}</h3>
                    </div>
                    <div className="service-bento-tags">
                      {(card.tags || []).map((tag, ti) => (
                        <span key={ti} className="service-subtag">{tag}</span>
                      ))}
                    </div>
                    <div className="service-bento-footer">
                      <Link to={card.linkUrl || '/works'} className="service-bento-link">
                        <span>{card.linkText || 'EXPLORE'}</span>
                        <ArrowIcon size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ============================
          FEATURED WORKS — BESPOKE REDESIGN
      ============================ */}
      <section className="featured-works-section" id="works-preview" aria-label="Selected Works">
        <div className="container">
          <div className="row align-items-end works-header-row reveal-up">
            <div className="col-lg-9 col-md-12">
              <span className="section-tag-editorial">{worksSec.tag || '( SELECTED WORKS )'}</span>
              <h2 className="works-headline">
                {(worksSec.headline || 'Selected Works & Case Studies.').replace('Case Studies', '')}
                <span className="works-headline-accent">Case Studies</span>.
              </h2>
              <p className="works-sub-description">
                {worksSec.subtitle || 'A curated collection of commercial UI/UX designs and digital systems.'}
              </p>
            </div>
            <div className="col-lg-3 col-md-12 d-flex justify-content-lg-end align-items-end mt-4 mt-lg-0">
              <Link to="/works" className="works-all-btn" id="all-works-link">
                <span>{worksSec.buttonText || 'EXPLORE ALL WORKS'}</span>
                <ArrowIcon size={18} className="works-btn-arrow" />
              </Link>
            </div>
          </div>

          {/* 2-Column Showcase Grid Matching Reference Design */}
          <div className="row g-4 works-gallery-grid reveal-stagger">
            {featuredProjects.map((project, idx) => (
              <div key={project.id} className="col-lg-6 col-12">
                <ProjectCard project={project} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          FAQ SECTION — Reference Design
      ============================ */}
      {(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [openId, setOpenId] = useState(null);
        const toggle = (id) => setOpenId(prev => prev === id ? null : id);
        return (
          <section className="faq-ref-section" id="faq" aria-label="Frequently asked questions">
            <div className="container">
              {/* Centered Header */}
              <div className="faq-ref-header reveal-up">
                <span className="section-tag-editorial">{faqSec.tag || '( FAQ )'}</span>
                <h2 className="faq-ref-headline">{faqSec.headline || 'Frequently Asked Questions.'}</h2>
                <p className="faq-ref-sub">{faqSec.subtitle || 'Everything you need to know before kicking off a project together.'}</p>
              </div>

              {/* Accordion List — full-width, centered */}
              <div className="faq-ref-list reveal-stagger">
                {faqItems.map(item => (
                  <FAQItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => toggle(item.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })()}
    </>
  );
}



