import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolio } from '../../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

const defaultServicesList = [
  { title: 'Full Stack Web Engineering', tags: ['React', 'Node.js', 'MongoDB'] },
  { title: 'UI/UX & Design Systems', tags: ['Figma', 'UI/UX', 'SCSS'] },
  { title: 'Mobile App Design', tags: ['iOS UI', 'Android', 'Prototyping'] }
];

const AboutTeaser = () => {
  const headlineRef = useRef(null);
  const { about, services } = usePortfolio();

  const titleText = about?.title || "Helping brands achieve digital mastery of creative innovation and strategic planning";

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const words = titleText.split(' ');
    el.innerHTML = words.map(w => `<span class="reveal-word">${w}</span>`).join(' ');
    const spans = el.querySelectorAll('.reveal-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        {
          color: 'rgba(0, 0, 0, 0.15)',
          opacity: 0.25
        },
        {
          color: '#000000',
          opacity: 1,
          stagger: 0.08,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.8
          }
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [titleText]);

  let displayServices = Array.isArray(services) && services.length > 0 ? [...services] : defaultServicesList;
  if (displayServices.length < 3) {
    displayServices = [...displayServices, ...defaultServicesList.slice(displayServices.length, 3)];
  }
  displayServices = displayServices.slice(0, 3);

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
                  <g transform="translate(68, 64) scale(1.1)">
                    <path d="M4 0 L18 0 L18 10 L8 10 L8 16 L16 16 L16 26 L4 26 Z" fill="currentColor" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Column: Big Display Headline & CTA Buttons */}
            <div className="col-lg-9 col-md-8 col-sm-12">
              <h2 className="about-main-headline" ref={headlineRef}>
                {titleText}
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

          {/* Middle Row: Services Cards Grid (3 Cards Always) */}
          <div className="row g-4 services-cards-row">
            {displayServices.map((service, idx) => (
              <div key={service._id || idx} className="col-lg-4 col-md-6 col-sm-12">
                <div className="service-card">
                  <div className="service-card-top">
                    <div className={`service-3d-icon-box icon-${idx === 0 ? 'uiux' : idx === 1 ? 'web' : 'mobile'}`}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {idx === 0 && (
                          <>
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                          </>
                        )}
                        {idx === 1 && (
                          <>
                            <path d="M16 18l6-6-6-6"></path>
                            <path d="M8 6l-6 6 6 6"></path>
                            <path d="M14 4l-4 16"></path>
                          </>
                        )}
                        {idx >= 2 && (
                          <>
                            <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                            <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"></line>
                          </>
                        )}
                      </svg>
                    </div>
                    <span className="service-card-tag">Specialized Service</span>
                  </div>

                  <h3 className="service-card-title">{service.title}</h3>

                  <div className="service-card-footer">
                    <div className="service-card-pills">
                      {(service.tags || []).slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="service-pill">{tag}</span>
                      ))}
                    </div>
                    <span className="service-card-num">0{idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTeaser;
