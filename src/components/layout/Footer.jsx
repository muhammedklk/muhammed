import React, { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialFooterData = {
  footerEmail: 'muhammedklkm@gmail.com',
  footerPhone: '+91 9656216086',
  footerLocation: 'Kerala, India',
  footerLocationSub: 'Remote Worldwide',
  instagramUrl: 'https://www.instagram.com/___muhammedk/',
  linkedinUrl: 'https://www.linkedin.com/in/muhammed-klkm/',
  githubUrl: 'https://github.com/muhammedklk',
  copyrightText: '© 2026 Muhammed. All rights reserved.'
};

const Footer = () => {
  const [data, setData] = useState(initialFooterData);

  useEffect(() => {
    const fetchFooterConfig = async () => {
      try {
        const res = await api.get('/profile');
        if (res.data) {
          setData((prev) => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.error('Error loading footer config:', err);
      }
    };

    fetchFooterConfig();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Info 4 Columns Row */}
        <div className="row footer-top-row">
          {/* Column 1: Stay Connected & Large Email */}
          <div className="col-lg-5 col-md-12 col-sm-12 footer-col mb-4 mb-lg-0">
            <span className="footer-label">Stay connected</span>
            <a href={`mailto:${data.footerEmail || 'muhammedklkm@gmail.com'}`} className="footer-email-large">
              {data.footerEmail || 'muhammedklkm@gmail.com'}
            </a>
          </div>

          {/* Column 2: Location */}
          <div className="col-lg-2 col-md-4 col-sm-6 footer-col mb-4 mb-lg-0">
            <h4 className="footer-col-heading">Location</h4>
            <p className="footer-text">{data.footerLocation || 'Kerala, India'}</p>
            <p className="footer-text">{data.footerLocationSub || 'Remote Worldwide'}</p>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col-lg-3 col-md-4 col-sm-6 footer-col mb-4 mb-lg-0">
            <h4 className="footer-col-heading">Contact</h4>
            <p className="footer-text">
              <a href={`https://wa.me/${(data.footerPhone || '919656216086').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                {data.footerPhone || '+91 9656216086'}
              </a>
            </p>
            <p className="footer-text">
              <a href={`mailto:${data.footerEmail || 'muhammedklkm@gmail.com'}`}>{data.footerEmail || 'muhammedklkm@gmail.com'}</a>
            </p>
          </div>

          {/* Column 4: Social Media Icons */}
          <div className="col-lg-2 col-md-4 col-sm-12 footer-col">
            <h4 className="footer-col-heading">Social media</h4>
            <div className="footer-social-icons">
              <a
                href={data.instagramUrl || 'https://www.instagram.com/___muhammedk/'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href={data.linkedinUrl || 'https://www.linkedin.com/in/muhammed-klkm/'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href={data.githubUrl || 'https://github.com/muhammedklk'}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="GitHub"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Giant Brand Logo Typography */}
        <div className="footer-giant-brand">
          <span className="giant-brand-text">
            Muhammed<span className="giant-brand-at">@</span>
          </span>
        </div>

        {/* Bottom Copyright, Admin Link & Scroll To Top Bar */}
        <div className="footer-bottom-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p className="footer-copyright" style={{ margin: 0 }}>
            {data.copyrightText || '© 2026 Muhammed. All rights reserved.'}
          </p>
          <button
            type="button"
            className="scroll-top-btn"
            id="scroll-to-top"
            aria-label="Scroll to top"
            onClick={scrollToTop}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
