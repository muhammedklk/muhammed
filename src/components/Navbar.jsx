import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import ArrowIcon from './ArrowIcon';
import '../styles/navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Detect scroll for subtle shadow enhancement
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'HOME',    to: '/' },
    { label: 'ABOUT',   to: '/about' },
    { label: 'WORKS',   to: '/works' },
    { label: 'CONTACT', to: '/contact' },
  ];

  return (
    <>
      <header className="capsule-header">
        <div className="capsule-nav-container">
          <div className={`capsule-nav-bar ${scrolled ? 'scrolled' : ''}`}>

            {/* Logo: Modern MK Monogram Mark + Wordmark */}
            <Link to="/" className="capsule-logo" aria-label="Muhammed K — Home">
              <div className="capsule-logo-badge" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Letter M in crisp white */}
                  <path
                    d="M4 19.5V4.5L12 12.5L20 4.5V19.5"
                    stroke="#ffffff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Letter K accent branch in vibrant brand violet */}
                  <path
                    d="M12 12.5L20 20"
                    stroke="#7C5CE1"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="capsule-logo-text">MUHAMMEDK</span>
            </Link>

            {/* Nav Links */}
            <nav className="capsule-menu" aria-label="Primary Navigation">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`capsule-link ${location.pathname === to ? 'active' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right: Let's Talk CTA */}
            <div className="capsule-actions">
              <Link to="/contact" className="capsule-talk-btn" id="navbar-talk-btn">
                <span>LET'S TALK</span>
                <ArrowIcon size={18} />
              </Link>

              {/* Mobile hamburger */}
              <button
                className="capsule-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
              >
                <span className="capsule-bar" />
                <span className="capsule-bar" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <div
        className={`mobile-nav-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-nav-header">
          <Link to="/" className="capsule-logo" onClick={() => setMobileOpen(false)}>
            <div className="capsule-logo-badge" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 19.5V4.5L12 12.5L20 4.5V19.5"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12.5L20 20"
                  stroke="#7C5CE1"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="capsule-logo-text">MUHAMMEDK</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="mobile-close-btn"
            aria-label="Close menu"
          >
            <X size={20} color="var(--text-primary)" />
          </button>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map(({ label, to }, i) => (
            <li key={to}>
              <Link
                to={to}
                className="mobile-nav-link"
                onClick={() => setMobileOpen(false)}
              >
                <span>{label}</span>
                <span className="mobile-link-num">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mobile-nav-footer">
          <Link
            to="/contact"
            className="capsule-talk-btn"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMobileOpen(false)}
          >
            <span>Let's Talk</span>
            <ArrowIcon size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
