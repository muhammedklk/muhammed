import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutTeaser = () => {
  const headlineRef = useRef(null);
  const headlineText = "Helping brand achieve digital mastery of creative innovation and strategic planning";

  useEffect(() => {
    if (!headlineRef.current) return;

    const chars = headlineRef.current.querySelectorAll('.reveal-char');
    if (!chars.length) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const targetColor = isDark ? '#ffffff' : '#000000';

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        color: targetColor,
        opacity: 1,
        stagger: 0.02,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 88%',
          end: 'bottom 40%',
          scrub: 0.4,
          invalidateOnRefresh: true,
        }
      });
    }, headlineRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const renderAnimatedText = () => {
    const words = headlineText.split(' ');
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="reveal-word">
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} className="reveal-char">
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && <span className="reveal-space">&nbsp;</span>}
      </span>
    ));
  };

  return (
    <>
      {/* Bottom Features Bar Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-divider"></div>
          <div className="row features-row">
            {/* Feature Item 1 */}
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v12M6 12h12"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <span className="feature-title">Human centered approach</span>
              </div>
            </div>

            {/* Feature Item 2 */}
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"></path>
                  </svg>
                </div>
                <span className="feature-title">Pixel perfect execution</span>
              </div>
            </div>

            {/* Feature Item 3 */}
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                  </svg>
                </div>
                <span className="feature-title">Problem solving mindset</span>
              </div>
            </div>
          </div>
          <div className="features-divider-2"></div>
        </div>
      </section>

      {/* About & Services Section */}
      <section className="about-services-section grid-lines-bg" id="about-section">
        <div className="container">
          {/* Top Row: Award Stamp Badge & Main Headline */}
          <div className="row align-items-start about-top-row">
            {/* Left Column: Circular Award Stamp Artwork */}
            <div className="col-lg-3 col-md-4 col-sm-12 text-center text-md-start mb-4 mb-md-0">
              <div className="award-stamp-wrapper">
                <svg className="award-stamp-svg" viewBox="0 0 160 160" width="140" height="140">
                  <path id="awardCirclePath" d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="none" />
                  <text className="stamp-text">
                    <textPath href="#awardCirclePath" startOffset="0%">
                      UI/UX Designer & Web Developer - SINCE 2026 -
                    </textPath>
                  </text>
                  {/* Center Logo Icon inside Stamp */}
                  <g transform="translate(68, 64) scale(1.1)">
                    <path d="M4 0 L18 0 L18 10 L8 10 L8 16 L16 16 L16 26 L4 26 Z" fill="currentColor" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Column: Big Display Headline & CTA Buttons */}
            <div className="col-lg-9 col-md-8 col-sm-12">
              <h2 className="about-main-headline" ref={headlineRef}>
                {renderAnimatedText()}
              </h2>

              <div className="about-cta-group">
                <Link to="/about" className="btn-about-dark">
                  About me
                </Link>
                <Link to="/works" className="btn-discover-outline">
                  Discover Our Work
                </Link>
              </div>
            </div>
          </div>

          {/* Middle Row: 3 Services Cards Grid */}
          <div className="row g-4 services-cards-row">
            {/* Service Card 1: UI/UX Design */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="service-card">
                <div className="service-card-top">
                  <div className="service-3d-icon-box icon-uiux">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <span className="service-card-tag">Specialized Service</span>
                </div>

                <h3 className="service-card-title">UI/UX Design</h3>

                <div className="service-card-footer">
                  <div className="service-card-pills">
                    <span className="service-pill">Figma</span>
                    <span className="service-pill">Design Systems</span>
                    <span className="service-pill">Wireframing</span>
                  </div>
                  <span className="service-card-num">01</span>
                </div>
              </div>
            </div>

            {/* Service Card 2: Web Development */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="service-card">
                <div className="service-card-top">
                  <div className="service-3d-icon-box icon-web">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                      <line x1="14" y1="4" x2="10" y2="20"></line>
                    </svg>
                  </div>
                  <span className="service-card-tag">High Performance</span>
                </div>

                <h3 className="service-card-title">Web Development</h3>

                <div className="service-card-footer">
                  <div className="service-card-pills">
                    <span className="service-pill">HTML / SCSS</span>
                    <span className="service-pill">React</span>
                    <span className="service-pill">GSAP</span>
                  </div>
                  <span className="service-card-num">02</span>
                </div>
              </div>
            </div>

            {/* Service Card 3: Mobile App Design */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="service-card">
                <div className="service-card-top">
                  <div className="service-3d-icon-box icon-mobile">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"></line>
                    </svg>
                  </div>
                  <span className="service-card-tag">iOS & Android</span>
                </div>

                <h3 className="service-card-title">Mobile App Design</h3>

                <div className="service-card-footer">
                  <div className="service-card-pills">
                    <span className="service-pill">iOS UI</span>
                    <span className="service-pill">Android</span>
                    <span className="service-pill">Prototyping</span>
                  </div>
                  <span className="service-card-num">03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTeaser;
