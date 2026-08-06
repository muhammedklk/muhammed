import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

const Hero = () => {
  const { hero, settings } = usePortfolio();

  const titlePrefix = hero?.titlePrefix || 'Bringing ideas';
  const highlightText = hero?.highlightText || 'to life';
  const titleSuffix = hero?.titleSuffix || 'through design';
  const subtitle = hero?.subtitle || 'Multidisciplinary UI/UX Designer & Front-End Developer crafting high-performance, pixel-perfect web products.';
  const primaryBtnText = hero?.primaryBtnText || 'View Works';
  const primaryBtnLink = hero?.primaryBtnLink || '/works';
  const secondaryBtnText = hero?.secondaryBtnText || 'About me';
  const secondaryBtnLink = hero?.secondaryBtnLink || '/about';
  const badge = hero?.badge || 'AVAILABLE FOR PROJECTS';
  const orbitName = hero?.orbitName || settings?.logoText || 'Muhammed';
  const orbitRole = hero?.orbitRole || 'UI/UX & FRONTEND CRAFT';

  return (
    <section className="hero-section">
      {/* Authentic Bfolio Ambient Glow & Fine Mesh Texture */}
      <div className="hero-ambient-glow"></div>
      <div className="hero-mesh-texture"></div>

      <div className="container">
        <h1 className="hero-heading">
          <span className="heading-subtle hero-line-1">{titlePrefix}</span>{' '}
          <span className="heading-highlight hero-line-2">{highlightText}</span>{' '}
          <span className="heading-highlight hero-line-3">{titleSuffix}</span>
        </h1>

        {/* Content Row Below Heading */}
        <div className="row hero-bottom-row align-items-end">
          {/* Left Column: Paragraph & CTA Buttons */}
          <div className="col-lg-6 col-md-12">
            <div className="hero-subcontent">
              <p className="hero-description">
                {subtitle}
              </p>

              <div className="hero-cta-group">
                <Link to={primaryBtnLink} className="btn-primary-pill">
                  {primaryBtnText}
                </Link>
                <Link to={secondaryBtnLink} className="btn-secondary-pill">
                  {secondaryBtnText}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Orbiting Tech Stack System */}
          <div className="col-lg-6 col-md-12">
            <div className="hero-orbit-stage" id="hero-orbit-stage">
              {/* Ambient Red Crimson Glow Spotlight behind Orbit */}
              <div className="orbit-glow-spotlight"></div>

              {/* Concentric Orbit Track Lines */}
              <div className="orbit-track track-outer"></div>
              <div className="orbit-track track-inner"></div>

              {/* CENTRAL STUDIO CORE BADGE */}
              <div className="orbit-core-glass">
                <div className="core-avatar-ring">
                  <span className="core-sparkle">✦</span>
                </div>
                <h3 className="core-name">{orbitName}</h3>
                <span className="core-role">{orbitRole}</span>
                <div className="core-availability-pill">
                  <span className="pulse-green-dot"></span>
                  <span>{badge.toUpperCase()}</span>
                </div>
              </div>

              {/* FLOATING ORBITING SKILL NODES (INNER RING ROTATION) */}
              <div className="orbit-rotator rotator-inner">
                <div className="orbit-node node-figma">
                  <div className="node-content">
                    <span className="node-icon">❖</span>
                    <span className="node-text">Figma Master</span>
                  </div>
                </div>
                <div className="orbit-node node-uiux">
                  <div className="node-content">
                    <span className="node-icon">🎨</span>
                    <span className="node-text">UI/UX Design</span>
                  </div>
                </div>
                <div className="orbit-node node-code">
                  <div className="node-content">
                    <span className="node-icon">⚡</span>
                    <span className="node-text">HTML5 & CSS3</span>
                  </div>
                </div>
              </div>

              {/* FLOATING ORBITING SKILL NODES (OUTER RING ROTATION - OPPOSITE DIRECTION) */}
              <div className="orbit-rotator rotator-outer">
                <div className="orbit-node node-js">
                  <div className="node-content">
                    <span className="node-icon">💻</span>
                    <span className="node-text">JavaScript</span>
                  </div>
                </div>
                <div className="orbit-node node-speed">
                  <div className="node-content">
                    <span className="node-icon">🚀</span>
                    <span className="node-text">PageSpeed 99+</span>
                  </div>
                </div>
                <div className="orbit-node node-anim">
                  <div className="node-content">
                    <span className="node-icon">✨</span>
                    <span className="node-text">Animations</span>
                  </div>
                </div>
                <div className="orbit-node node-responsive">
                  <div className="node-content">
                    <span className="node-icon">📱</span>
                    <span className="node-text">Responsive UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
