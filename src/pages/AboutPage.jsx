import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, 
  Code2, 
  Lightbulb, 
  Download, 
  ArrowRight, 
  Zap 
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import './about.css';

export default function AboutPage() {
  const { personalInfo, aboutContent } = usePortfolio();
  document.title = 'About Muhammed K — UI/UX Designer & Front-End Developer';

  return (
    <div className="simple-about-page">
      <div className="container">
        
        {/* ============================================================
            TOP SECTION: PORTRAIT & BIO
        ============================================================ */}
        <section className="about-intro-section" aria-label="About Muhammed K">
          <div className="about-intro-grid">
            
            {/* Left: Portrait Card */}
            <div className="about-photo-col">
              <div className="about-photo-card">
                
                {/* Top-Left Pill Badge */}
                <div className="about-photo-badge-top">
                  <Zap size={13} className="about-badge-icon-zap" />
                  <span>{aboutContent?.badgeTop || 'UI/UX & Web Dev'}</span>
                </div>

                {/* Portrait Cutout Frame */}
                <div className="about-photo-frame">
                  <div className="about-photo-glow" />
                  <img
                    src={aboutContent?.photoUrl || '/assets/a_clean_cutout_isolated_portrait_image_on_a_transp.png'}
                    alt="Muhammed K — UI/UX Designer & Front-End Developer"
                    className="about-photo-img"
                    loading="eager"
                  />
                </div>

                {/* Bottom-Right Status Badge */}
                <div className="about-photo-badge-bottom">
                  <span className="about-status-dot-green" />
                  <span>{aboutContent?.badgeBottom || 'Available for Hire'}</span>
                </div>

              </div>
            </div>

            {/* Right: Narrative & Quick Info */}
            <div className="about-info-col">
              
              {/* Eyebrow Pill */}
              <span className="section-tag-editorial">{aboutContent?.tag || '( ABOUT MY CRAFT )'}</span>

              {/* Main Greeting */}
              <h1 className="about-greeting-title">
                {aboutContent?.greeting || "Hi, I'm Muhammed"} <span className="about-hand-wave">👋</span>
              </h1>

              {/* Bold Lead Statement */}
              <p className="about-lead-statement">
                {aboutContent?.leadStatement || 'Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.'}
              </p>

              {/* Body Paragraph */}
              <p className="about-bio-body">
                {aboutContent?.bioBody || 'I bridge the gap between creative visual artistry and technical front-end engineering. My goal is to build digital products that not only look breathtaking, but perform flawlessly across every screen size. My approach combines rigorous user research with meticulous typographic hierarchies, smooth micro-interactions, and resilient code to ensure every project leaves a lasting impact.'}
              </p>

              {/* Key-Value Details */}
              <div className="about-meta-list">
                <div className="about-meta-row">
                  <span className="about-meta-label">LOCATION</span>
                  <span className="about-meta-value">{personalInfo?.location || 'Kerala / Remote'}</span>
                </div>
                <div className="about-meta-row">
                  <span className="about-meta-label">SPECIALIZATION</span>
                  <span className="about-meta-value">{aboutContent?.specialization || 'Web Design, Development'}</span>
                </div>
                <div className="about-meta-row">
                  <span className="about-meta-label">EMAIL</span>
                  <a href={`mailto:${personalInfo?.email}`} className="about-meta-value email-highlight">
                    {personalInfo?.email}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="about-actions-row">
                <a
                  href={personalInfo?.cvPath || '/assets/muhammedk-cv.pdf'}
                  download="MuhammedK-CV.pdf"
                  className="about-btn-download"
                  id="about-download-cv"
                >
                  <Download size={16} />
                  <span>DOWNLOAD MY CV</span>
                </a>

                <Link
                  to="/contact"
                  className="about-btn-touch"
                  id="about-get-in-touch"
                >
                  <span>Get In Touch</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

            </div>

          </div>
        </section>


        {/* ============================================================
            BOTTOM SECTION: SKILLS & EXPERTISE MATRIX
        ============================================================ */}
        <section className="about-skills-matrix-section" aria-label="Skills & Expertise Matrix">
          
          <div className="text-center mb-5">
            <span className="section-tag-editorial">( TECHNICAL CAPABILITIES )</span>
            <h2 className="about-skills-main-title">
              Skills & Expertise Matrix.
            </h2>
          </div>

          <div className="about-skills-cards-grid">
            
            {/* Card 01: Design & UI/UX */}
            <div className="about-matrix-card">
              <div className="about-card-window-header">
                <div className="about-window-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="about-window-tag tag-design">01 / DESIGN</span>
              </div>

              <div className="about-card-header-inner">
                <div className="about-card-icon-bubble bubble-design">
                  <Palette size={20} />
                </div>
                <h3 className="about-card-heading">Design & UI/UX</h3>
              </div>

              <div className="about-card-pills-wrap">
                {[
                  'Figma',
                  'Adobe Photoshop',
                  'Wireframing & Prototyping',
                  'Design Systems',
                  'Mobile & Web Interface Design',
                  'UI Animation & Interaction'
                ].map((skill, sIdx) => (
                  <span key={sIdx} className="about-matrix-pill">
                    <span className="matrix-pill-dot dot-green" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>

              <div className="about-card-footer-caption">
                Figma, Photoshop, Interface Systems
              </div>
            </div>

            {/* Card 02: Frontend Development */}
            <div className="about-matrix-card">
              <div className="about-card-window-header">
                <div className="about-window-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="about-window-tag tag-frontend">02 / FRONTEND</span>
              </div>

              <div className="about-card-header-inner">
                <div className="about-card-icon-bubble bubble-frontend">
                  <Code2 size={20} />
                </div>
                <h3 className="about-card-heading">Frontend Development</h3>
              </div>

              <div className="about-card-pills-wrap">
                {[
                  'HTML5',
                  'CSS3',
                  'JavaScript',
                  'Bootstrap',
                  'GSAP',
                  'Responsive Design',
                  'GitHub'
                ].map((skill, sIdx) => (
                  <span key={sIdx} className="about-matrix-pill">
                    <span className="matrix-pill-dot dot-blue" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>

              <div className="about-card-footer-caption">
                HTML5, CSS3, JS, React, GSAP, GitHub
              </div>
            </div>

            {/* Card 03: Soft Skills & Mindset */}
            <div className="about-matrix-card">
              <div className="about-card-window-header">
                <div className="about-window-dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <span className="about-window-tag tag-soft">03 / SOFT SKILLS</span>
              </div>

              <div className="about-card-header-inner">
                <div className="about-card-icon-bubble bubble-soft">
                  <Lightbulb size={20} />
                </div>
                <h3 className="about-card-heading">Soft Skills & Mindset</h3>
              </div>

              <div className="about-card-pills-wrap">
                {[
                  'Creative Thinking',
                  'Communication',
                  'Problem Solving',
                  'Collaboration',
                  'Cross-Cultural Teamwork'
                ].map((skill, sIdx) => (
                  <span key={sIdx} className="about-matrix-pill">
                    <span className="matrix-pill-dot dot-violet" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>

              <div className="about-card-footer-caption">
                Collaboration, Problem Solving & Strategy
              </div>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
