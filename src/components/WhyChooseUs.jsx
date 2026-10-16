import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, LayoutGrid } from 'lucide-react';
import '../styles/why-choose-us.css';

export default function WhyChooseUs() {
  return (
    <section className="why-choose-section" id="why-choose-us" aria-label="Why brands choose us">
      <div className="container">
        {/* Section Header */}
        <div className="why-choose-header">
          <h2 className="why-choose-title">Why brands choose us</h2>
          <p className="why-choose-subtitle">
            We combine strategy, design, and development to create websites that look premium, load fast, and turn visitors into real business opportunities.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="row g-4 why-choose-grid">
          {/* ====================================================
              LEFT TALL CARD: Modern website design + particle wave
              ==================================================== */}
          <div className="col-lg-5 col-12">
            <div className="bento-tall-card">
              {/* Top Browser Bar */}
              <div className="bento-browser-bar">
                <div className="bento-url-pill">
                  <span className="bento-url-dot" />
                  <span className="bento-url-text">muhammedk.design</span>
                </div>
                <button className="bento-grid-icon-btn" aria-label="Menu grid">
                  <LayoutGrid size={15} />
                </button>
              </div>

              {/* Main Content */}
              <div className="bento-tall-content">
                <div className="bento-tag-pill">
                  <span>Creative Team</span>
                  <span className="bento-tag-orb">✦</span>
                </div>

                <h3 className="bento-tall-heading">
                  Modern website design
                </h3>

                <p className="bento-tall-sub">
                  We create modern, responsive, and <strong>conversion-focused</strong> websites.
                </p>

                {/* Simulated Search Bar */}
                <div className="bento-search-pill">
                  <span className="bento-search-text">Website design agency near|</span>
                  <div className="bento-search-btn">
                    <Search size={14} />
                  </div>
                </div>
              </div>

              {/* Visual Wave Background & Client Marquee */}
              <div className="bento-tall-visual-area">
                <img
                  src="/assets/bento-particle-wave.jpg"
                  alt="Undulating 3D particle terrain visualization"
                  className="bento-wave-img"
                  loading="lazy"
                />
                <div className="bento-wave-overlay" />

                {/* Bottom Client Logos Strip */}
                <div className="bento-logos-strip">
                  <div className="bento-logos-marquee">
                    <span className="bento-logo-item">Broadridge</span>
                    <span className="bento-logo-item">● Celanese</span>
                    <span className="bento-logo-item">● COTERRA</span>
                    <span className="bento-logo-item">● Kenvue</span>
                    <span className="bento-logo-item">● Vanguard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
              RIGHT COLUMN: 2 Top Cards + 1 Bottom Wide Card
              ==================================================== */}
          <div className="col-lg-7 col-12">
            <div className="row g-4">
              {/* 1. Website Design Card */}
              <div className="col-md-6 col-12">
                <div className="bento-card bento-website-card">
                  <div className="bento-card-header">
                    <h3 className="bento-card-title">Website design</h3>
                    <p className="bento-card-desc">
                      Explore custom website solutions tailored to your brand, business goals, and customer journey.
                    </p>
                  </div>

                  {/* Tablet Wireframe Sketch Image */}
                  <div className="bento-sketch-frame">
                    <img
                      src="/assets/bento-sketching-hand.jpg"
                      alt="Designer sketching wireframe layouts on tablet"
                      className="bento-sketch-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Pills Strip */}
                  <div className="bento-pills-row">
                    <span className="bento-pill-chip">E-commerce</span>
                    <span className="bento-pill-chip">Booking Websites</span>
                    <span className="bento-pill-chip">Landing Pages</span>
                    <span className="bento-pill-chip">Business Sites</span>
                  </div>
                </div>
              </div>

              {/* 2. Creative Strategy Card */}
              <div className="col-md-6 col-12">
                <div className="bento-card bento-strategy-card">
                  <div className="bento-card-header">
                    <h3 className="bento-card-title">Creative strategy</h3>
                    <p className="bento-card-desc">
                      We combine design, content, and user experience to create websites that are built to convert.
                    </p>
                  </div>

                  {/* Node Tree Diagram */}
                  <div className="bento-tree-diagram">
                    {/* Center Top Root Node */}
                    <div className="tree-root-node" title="Creative Core Strategy">
                      <Sparkles size={18} />
                    </div>

                    {/* SVG Connector Curved Lines */}
                    <svg className="tree-connectors-svg" viewBox="0 0 260 90" fill="none">
                      {/* Leftmost curve */}
                      <path d="M 130 10 C 130 45, 35 40, 35 80" stroke="#d6d6e0" strokeWidth="1.5" strokeDasharray="3 3" />
                      {/* Center-left curve */}
                      <path d="M 130 10 C 130 45, 95 40, 95 80" stroke="#d6d6e0" strokeWidth="1.5" />
                      {/* Center-right curve */}
                      <path d="M 130 10 C 130 45, 165 40, 165 80" stroke="#d6d6e0" strokeWidth="1.5" />
                      {/* Rightmost curve */}
                      <path d="M 130 10 C 130 45, 225 40, 225 80" stroke="#d6d6e0" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>

                    {/* Bottom App Nodes */}
                    <div className="tree-nodes-row">
                      {/* OpenAI / AI */}
                      <div className="tree-node-item node-ai" title="AI Acceleration">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="12" cy="12" r="4" />
                          <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M19.07 4.93l-4.24 4.24M9.17 14.83l-4.24 4.24" />
                        </svg>
                      </div>

                      {/* Framer / Next.js */}
                      <div className="tree-node-item node-framer" title="Framer & Next.js">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 2h16v7h-8zM4 9h8l8 7H4zM4 16h8v7z" />
                        </svg>
                      </div>

                      {/* Figma */}
                      <div className="tree-node-item node-figma" title="Figma Product Design">
                        <svg width="18" height="18" viewBox="0 0 38 57" fill="none">
                          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
                          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
                          <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
                          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
                          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
                        </svg>
                      </div>

                      {/* Webflow / Web Standards */}
                      <div className="tree-node-item node-webflow" title="Webflow & Production Code">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.47 7.22c-1.32.06-2.45.69-3.23 1.62-.73-1.01-1.92-1.68-3.32-1.68-2.3 0-4.17 1.87-4.17 4.17s1.87 4.17 4.17 4.17c1.4 0 2.59-.67 3.32-1.68.78.93 1.91 1.56 3.23 1.62V7.22z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Bottom Wide Card: Premium websites for growing brands */}
              <div className="col-12">
                <div className="bento-card bento-wide-card">
                  <div className="row align-items-center">
                    {/* Left Copy & Buttons */}
                    <div className="col-lg-6 col-12">
                      <h3 className="bento-wide-title">
                        Premium websites for growing brands
                      </h3>
                      <p className="bento-wide-desc">
                        Your website should do more than look good. We design clean, fast, and strategic websites that help your business attract leads, showcase your value, and increase conversions.
                      </p>
                      <div className="bento-wide-actions">
                        <Link to="/contact" className="bento-btn-outline" id="bento-book-call-btn">
                          Book a Call
                        </Link>
                        <Link to="/works" className="bento-btn-purple" id="bento-view-projects-btn">
                          <span>View Projects</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right 3D Monitor Mockup */}
                    <div className="col-lg-6 col-12 mt-4 mt-lg-0 text-center">
                      <div className="bento-monitor-wrapper">
                        <img
                          src="/assets/bento-monitor-pillars.jpg"
                          alt="Pillars of website stability 3D studio monitor mockup"
                          className="bento-monitor-img"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
