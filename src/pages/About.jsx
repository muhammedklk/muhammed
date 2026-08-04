import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      {/* Personal Profile Photo & Identity Section */}
      <section className="about-portrait-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* Profile Photo Card (Left) */}
            <div className="col-lg-5 col-md-12">
              <div className="about-portrait-card">
                <div className="portrait-image-wrapper">
                  <img
                    src="assets/profile_photo.jpg"
                    alt="Muhammed - UI/UX Designer & Developer"
                    className="about-portrait-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />

                  {/* Styled Avatar Fallback Render */}
                  <div className="portrait-avatar-fallback">
                    <div className="avatar-circle-inner">
                      <span className="avatar-initials">M</span>
                    </div>
                    <span className="avatar-hint-text">
                      Add your photo: <code>assets/profile_photo.jpg</code>
                    </span>
                  </div>

                  <div className="portrait-badges-layer">
                    <div className="portrait-floating-badge badge-role">
                      <span className="badge-icon">⚡</span>
                      <span>UI/UX & Web Dev</span>
                    </div>
                    <div className="portrait-floating-badge badge-avail">
                      <span className="badge-pulse"></span>
                      <span>Available for Hire</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intro Statement & Quick Info (Right) */}
            <div className="col-lg-7 col-md-12">
              <div className="portrait-intro-block">
                <span className="page-badge">ABOUT MY CRAFT</span>
                <h2 className="portrait-intro-name">Hi, I'm Muhammed 👋</h2>
                <h3 className="portrait-intro-role">
                  Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.
                </h3>
                <p className="portrait-intro-text">
                  I bridge the gap between creative visual artistry and technical front-end engineering. My goal is to build digital products that not only look breathtaking, but perform flawlessly across every screen size.
                </p>

                <div className="portrait-quick-details">
                  <div className="quick-detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-val">Kerala, India (Remote Worldwide)</span>
                  </div>
                  <div className="quick-detail-item">
                    <span className="detail-label">Specialization</span>
                    <span className="detail-val">Web Design, Development</span>
                  </div>
                  <div className="quick-detail-item">
                    <span className="detail-label">Email</span>
                    <a href="mailto:muhammedklkm@gmail.com" className="detail-val text-link">
                      muhammedklkm@gmail.com
                    </a>
                  </div>
                </div>

                {/* Download CV Prominent CTA Buttons */}
                <div className="portrait-actions-row">
                  <a
                    href="assets/cv/Muhammed_K_Resume.pdf"
                    target="_blank"
                    download="Muhammed_K_Resume.pdf"
                    className="btn-download-cv-lg"
                  >
                    <span>Download My CV</span>
                  </a>
                  <Link to="/contact" className="btn-contact-outline-lg">
                    <span>Get in Touch</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story & Philosophy Section */}
      <section className="about-story-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="story-content-block">
                <h2 className="section-heading-sm">HUMAN-CENTERED PHILOSOPHY</h2>
                <h3 className="story-title">
                  Design isn't just how things look — it's how smoothly humans interact with them.
                </h3>
                <p className="story-desc">
                  With hands-on experience spanning product design, front-end architecture, and visual identity, I specialize in transforming complex business problems into clean, scalable interfaces.
                </p>
                <p className="story-desc">
                  My approach combines rigorous user research with meticulous typographic hierarchies, smooth micro-interactions, and resilient code to ensure every project leaves a lasting impact.
                </p>

                <div className="about-stats-grid">
                  <div className="stat-card">
                    <span className="stat-value">40+</span>
                    <span className="stat-name">Projects Delivered</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">99%</span>
                    <span className="stat-name">Client Satisfaction</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">100%</span>
                    <span className="stat-name">Human Crafted</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="tech-stack-card">
                <div className="tech-card-header">
                  <div className="tech-card-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="tech-card-title">Technical Mastery & Stack</span>
                </div>
                <div className="tech-stack-tags">
                  <span className="stack-tag"><i className="tag-dot"></i> UI/UX Architecture</span>
                  <span className="stack-tag"><i className="tag-dot"></i> Design Systems</span>
                  <span className="stack-tag"><i className="tag-dot"></i> Figma & Prototyping</span>
                  <span className="stack-tag"><i className="tag-dot"></i> HTML5 & CSS3</span>
                  <span className="stack-tag"><i className="tag-dot"></i> JavaScript (ES6+)</span>
                  <span className="stack-tag"><i className="tag-dot"></i> React & Vite</span>
                  <span className="stack-tag"><i className="tag-dot"></i> Responsive Web Design</span>
                  <span className="stack-tag"><i className="tag-dot"></i> Micro-Animations</span>
                  <span className="stack-tag"><i className="tag-dot"></i> Performance Optimization</span>
                </div>

                <div className="philosophy-quote-box">
                  <p>"Simplicity is about subtracting the obvious and adding the meaningful."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Design Process */}
      <section className="process-section">
        <div className="container">
          <div className="mb-5">
            <span className="page-badge">WORKFLOW</span>
            <h2 className="section-headline">My Proven Design Process</h2>
            <p className="section-subtext">
              A structured, iterative workflow designed to move projects seamlessly from concept to launch.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="process-card">
                <span className="process-num">01</span>
                <h3 className="process-title">Discovery & Strategy</h3>
                <p className="process-desc">
                  Deep diving into your brand goals, target audience needs, and competitive landscape to establish a solid foundation.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="process-card">
                <span className="process-num">02</span>
                <h3 className="process-title">UX Wireframing</h3>
                <p className="process-desc">
                  Mapping out user journeys, wireframes, and interactive prototypes to refine usability before committing to visual styling.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="process-card">
                <span className="process-num">03</span>
                <h3 className="process-title">Visual UI Design</h3>
                <p className="process-desc">
                  Crafting premium, responsive visual designs with custom design tokens, typographic harmony, and vibrant color palettes.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="process-card">
                <span className="process-num">04</span>
                <h3 className="process-title">Clean Code & Launch</h3>
                <p className="process-desc">
                  Building accessible, high-performance front-end code with smooth micro-animations and cross-device testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
