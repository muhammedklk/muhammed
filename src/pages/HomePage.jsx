import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette, Code2, Globe, Download, MapPin, PenTool, Monitor, MessageCircle, Settings, ArrowUpRight } from 'lucide-react';
import ArrowIcon from '../components/ArrowIcon';
import ProjectCard from '../components/ProjectCard';
import TechMarquee, { TECH_ITEMS } from '../components/TechMarquee';

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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const windowH = window.innerHeight;
          const start = windowH * 0.90;
          const end = -windowH * 0.15;
          const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
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

const DEFAULT_ROTATING_WORDS = [
  'Resonate.',
  'Inspire.',
  'Convert.',
  'Connect.',
  'Elevate.',
];

const HERO_TECH_BADGES = [
  { id: 'figma', className: 'hero-squircle--left-1', rotate: -38, y: [0, -8, 0], duration: 5, delay: 0 },
  { id: 'reactjs', className: 'hero-squircle--left-2', rotate: -34, y: [0, 8, 0], duration: 5.8, delay: 0.4 },
  { id: 'bootstrap', className: 'hero-squircle--left-3', rotate: -42, y: [0, -7, 0], duration: 5.4, delay: 0.8 },
  { id: 'html5', className: 'hero-squircle--right-1', rotate: 36, y: [0, -8, 0], duration: 5.2, delay: 0.2 },
  { id: 'css3', className: 'hero-squircle--right-2', rotate: 38, y: [0, 9, 0], duration: 6, delay: 0.7 },
  { id: 'javascript', className: 'hero-squircle--right-3', rotate: 40, y: [0, -7, 0], duration: 5.5, delay: 1.1 },
];

const GREETING_PHRASES = [
  { prefix: 'Hai, Iam ', highlight: 'Muhammed K' },
  { prefix: 'Iam a ', highlight: 'UI/UX Designer' },
  { prefix: 'Iam a ', highlight: 'Front-End Developer' },
];

export default function HomePage() {
  const { personalInfo, projects, faqItems, homeContent } = usePortfolio();
  const featuredList = (projects || []).filter(p => p.featured);
  const featuredProjects = featuredList.length > 0 ? featuredList : (projects || []).slice(0, 4);

  const hero = homeContent?.hero || {};
  const aboutSnip = homeContent?.aboutSnippet || {};
  const servSec = homeContent?.servicesSection || {};
  const worksSec = homeContent?.worksSection || {};
  const faqSec = homeContent?.faqSection || {};

  const [rotatingWordIndex, setRotatingWordIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedCount, setTypedCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = GREETING_PHRASES[phraseIndex];
  const fullGreeting = currentPhrase.prefix + currentPhrase.highlight;

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingWordIndex((prev) => (prev + 1) % DEFAULT_ROTATING_WORDS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timeout;
    if (!isDeleting && typedCount < fullGreeting.length) {
      timeout = setTimeout(() => setTypedCount((c) => c + 1), 70);
    } else if (!isDeleting && typedCount === fullGreeting.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedCount > 0) {
      timeout = setTimeout(() => setTypedCount((c) => c - 1), 36);
    } else if (isDeleting && typedCount === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((idx) => (idx + 1) % GREETING_PHRASES.length);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [typedCount, isDeleting, fullGreeting.length]);

  const typedPrefix = fullGreeting.slice(0, Math.min(typedCount, currentPhrase.prefix.length));
  const typedName = typedCount > currentPhrase.prefix.length
    ? fullGreeting.slice(currentPhrase.prefix.length, typedCount)
    : '';

  return (
    <>
      {/* SEO Meta Update via document.title */}
      {(() => { document.title = 'MUHAMMED K — UI/UX Designer & Front-End Developer Portfolio'; return null; })()}

      {/* ============================
          HERO SECTION — CLEAN EDITORIAL WITH FLOATING DESIGN & CODE ICONS
      ============================ */}
      <section className="hero-wrapper" aria-label="Hero">
        {/* 6 Floating Tilted Squircle Official Brand Logos (3 Left, 3 Right) */}
        <div className="hero-floating-icons" aria-hidden="true">
          <div className="hero-floating-group hero-floating-group--left">
            {HERO_TECH_BADGES.slice(0, 3).map((badge) => {
              const tech = TECH_ITEMS.find((item) => item.id === badge.id);
              if (!tech) return null;
              return (
                <motion.div
                  key={badge.id}
                  className={`hero-squircle ${badge.className}`}
                  initial={{ rotate: badge.rotate }}
                  animate={{ y: badge.y, rotate: badge.rotate }}
                  transition={{
                    y: { duration: badge.duration, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
                    rotate: { duration: 0 }
                  }}
                  title={tech.name}
                >
                  <span
                    className="hero-squircle-inner"
                    style={{ transform: `rotate(${-badge.rotate}deg)` }}
                  >
                    {tech.icon}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="hero-floating-group hero-floating-group--right">
            {HERO_TECH_BADGES.slice(3, 6).map((badge) => {
              const tech = TECH_ITEMS.find((item) => item.id === badge.id);
              if (!tech) return null;
              return (
                <motion.div
                  key={badge.id}
                  className={`hero-squircle ${badge.className}`}
                  initial={{ rotate: badge.rotate }}
                  animate={{ y: badge.y, rotate: badge.rotate }}
                  transition={{
                    y: { duration: badge.duration, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
                    rotate: { duration: 0 }
                  }}
                  title={tech.name}
                >
                  <span
                    className="hero-squircle-inner"
                    style={{ transform: `rotate(${-badge.rotate}deg)` }}
                  >
                    {tech.icon}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="hero-stage-card">
          <div className="container">
            <div className="hero-simple-content reveal-blur">
              {/* Top Pill Badge */}
              <div className="hero-status-pill" aria-label={fullGreeting}>
                <span className="hero-status-icon-circle" aria-hidden="true">
                  <Settings size={14} strokeWidth={2} />
                </span>
                <span className="hero-status-text">
                  <span>{typedPrefix}</span>
                  <span className="hero-status-name">{typedName}</span>
                  <span className="hero-typing-cursor" aria-hidden="true" />
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="hero-main-title">
                <span className="title-line">Creating bold visual</span>
                <span className="title-line">narratives that inspire</span>
                <span className="title-line">
                  and <span className="hero-title-accent">engage.</span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="hero-description">
                {(hero.subtext && !hero.subtext.startsWith('I blend human-centered design'))
                  ? hero.subtext
                  : 'Transforming ideas into intuitive interfaces that elevate brands and engage users.'}
              </p>

              {/* Single Dark CTA Button */}
              <div className="hero-actions-group">
                <Link to="/contact" className="hero-talk-btn" id="hero-cta-btn">
                  <span>{hero.ctaText || "Let's Talk"}</span>
                  <ArrowUpRight size={17} strokeWidth={2} className="hero-talk-arrow" />
                </Link>
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
          <div className="about-editorial-wrap text-center reveal-blur">
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
          <div className="services-header text-center reveal-blur">
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
          TECH STACK MARQUEE (Right to Left)
      ============================ */}
      <TechMarquee />

      {/* ============================
          FEATURED WORKS — BESPOKE REDESIGN
      ============================ */}
      <section className="featured-works-section" id="works-preview" aria-label="Selected Works">
        <div className="container">
          <div className="row align-items-end works-header-row reveal-blur">
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
              <div className="faq-ref-header reveal-blur">
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



