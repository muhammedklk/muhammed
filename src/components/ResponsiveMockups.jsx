import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Sparkles } from 'lucide-react';

export default function ResponsiveMockups({
  desktopImage,
  tabletImage,
  phoneImage,
  projectTitle = "Project"
}) {
  const [activeDevice, setActiveDevice] = useState('all');

  return (
    <section className="responsive-showcase-section" aria-labelledby="responsive-showcase-heading">
      <div className="section-header text-center" style={{ marginBottom: '32px' }}>
        <span className="section-tag-editorial">( CROSS-DEVICE ADAPTABILITY )</span>
        <h2 id="responsive-showcase-heading" className="section-title">
          Responsive Design Showcase
        </h2>
        <p className="section-description">
          Demonstrating pixel-perfect layout preservation and fluid usability across desktop monitors, tablets, and smartphones.
        </p>
      </div>

      {/* Device Toggle Tabs on Mobile / Tablet */}
      <div className="device-filter-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
        <button
          type="button"
          onClick={() => setActiveDevice('all')}
          className={`btn btn-sm ${activeDevice === 'all' ? 'btn-primary' : 'btn-subtle'}`}
        >
          All Viewports
        </button>
        <button
          type="button"
          onClick={() => setActiveDevice('desktop')}
          className={`btn btn-sm ${activeDevice === 'desktop' ? 'btn-primary' : 'btn-subtle'}`}
        >
          <Monitor size={14} aria-hidden="true" />
          <span>Desktop (1440px+)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveDevice('tablet')}
          className={`btn btn-sm ${activeDevice === 'tablet' ? 'btn-primary' : 'btn-subtle'}`}
        >
          <Tablet size={14} aria-hidden="true" />
          <span>Tablet (768px - 1024px)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveDevice('phone')}
          className={`btn btn-sm ${activeDevice === 'phone' ? 'btn-primary' : 'btn-subtle'}`}
        >
          <Smartphone size={14} aria-hidden="true" />
          <span>Mobile (375px - 430px)</span>
        </button>
      </div>

      <div className="device-showcase-container">
        {/* Desktop Monitor Mockup */}
        {(activeDevice === 'all' || activeDevice === 'desktop') && (
          <div className="mockup-block">
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span className="tech-tag" style={{ fontWeight: 500 }}>Desktop Viewport Showcase</span>
            </div>
            <div className="mockup-desktop-monitor">
              <div className="mockup-desktop-screen">
                <img
                  src={desktopImage}
                  alt={`${projectTitle} displayed on Desktop Monitor`}
                  loading="lazy"
                />
              </div>
              <div className="mockup-desktop-stand" aria-hidden="true" />
              <div className="mockup-desktop-base" aria-hidden="true" />
            </div>
          </div>
        )}

        {/* Tablet & Smartphone Duo Layout */}
        {(activeDevice === 'all' || activeDevice === 'tablet' || activeDevice === 'phone') && (
          <div className="row justify-content-center align-items-center g-4" style={{ marginTop: '16px' }}>
            {(activeDevice === 'all' || activeDevice === 'tablet') && (
              <div className={activeDevice === 'all' ? 'col-lg-7' : 'col-12'}>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <span className="tech-tag" style={{ fontWeight: 500 }}>Tablet Viewport (10.9-inch)</span>
                </div>
                <div className="mockup-tablet">
                  <div className="mockup-tablet-screen">
                    <img
                      src={tabletImage || desktopImage}
                      alt={`${projectTitle} displayed on Tablet screen`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}

            {(activeDevice === 'all' || activeDevice === 'phone') && (
              <div className={activeDevice === 'all' ? 'col-lg-5' : 'col-12'}>
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <span className="tech-tag" style={{ fontWeight: 500 }}>Smartphone Viewport (iOS &amp; Android)</span>
                </div>
                <div className="mockup-phone">
                  <div className="mockup-phone-notch" aria-hidden="true" />
                  <div className="mockup-phone-screen">
                    <img
                      src={phoneImage || desktopImage}
                      alt={`${projectTitle} displayed on Mobile phone`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
