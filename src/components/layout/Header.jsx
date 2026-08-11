import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ onToggleMobileMenu, onOpenLeadModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isCaseStudyPage = location.pathname.startsWith('/case-study');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-floating-pill">
        {/* Brand Logo */}
        <Link to="/" className="site-logo">
          <span className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="2.5" />
              <rect x="10" y="10" width="12" height="12" rx="3.5" fill="currentColor" />
            </svg>
          </span>
          <span className="logo-text">
            Muhammed<span className="logo-dot">.</span>
          </span>
        </Link>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Dynamic Header Action Pill: "BACK TO WORKS" on case study page, "BEGIN DISCOVERY" on other pages */}
          {isCaseStudyPage ? (
            <Link to="/works" className="btn-discovery">
              <span className="btn-discovery-text">← BACK TO WORKS</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={onOpenLeadModal}
              className="btn-discovery"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <span className="gold-dot"></span>
              <span className="btn-discovery-text">BEGIN DISCOVERY</span>
            </button>
          )}

          {/* Fullscreen Menu Trigger Button */}
          <button
            type="button"
            className="menu-trigger-btn"
            id="mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={onToggleMobileMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="17" x2="20" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
